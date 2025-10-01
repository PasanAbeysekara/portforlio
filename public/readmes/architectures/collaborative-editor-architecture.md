# System Architecture

## Overview

This document provides a detailed overview of the technical architecture for the Cloud-Native Collaborative Editor backend. The system is designed as a distributed set of microservices, adhering to cloud-native principles to achieve scalability, resilience, and maintainability. The entire application is containerized with Docker and orchestrated with Kubernetes.

![Architecture Diagram](https://github.com/user-attachments/assets/6fb5b86f-3364-4eee-93bc-2f2a6e760415)

## Core Concepts

### 1. Microservice Architecture

The system is decomposed into four distinct services, each with a single responsibility:

*   **User Service:** Manages user identity. It provides REST endpoints for registration and login, and is the sole issuer of JSON Web Tokens (JWTs).
*   **Document Service:** The authoritative source for document metadata. It handles creation, ownership, and the access control list (permissions) for sharing. It exposes a REST API for these operations and publishes events to the message broker.
*   **Real-time Service:** The stateful core of the collaborative engine. It manages persistent WebSocket connections from clients. Each active document is managed by a `Hub` goroutine, which holds the live document state in memory, processes incoming operations, and broadcasts changes.
*   **Notification Service:** A decoupled, asynchronous worker. It subscribes to events from the message broker and processes them independently, simulating tasks like sending notification emails.

    ![Application Services](https://github.com/user-attachments/assets/aff5a57e-c1a2-44e1-9df4-ed84c44718b0)

### 2. Containerization & Orchestration

*   **Docker:** Each microservice is packaged into a lightweight, portable container image using a multi-stage Dockerfile to ensure small final image sizes.
*   **Kubernetes (Minikube):** The system is deployed on Kubernetes. We use declarative YAML manifests to define the desired state for each component:
    *   `Deployments`: Manage the lifecycle and replicas of each service's pods.
    *   `Services`: Provide stable internal networking and DNS resolution, allowing services to communicate with each other (e.g., `http://document-service:8080`).
    *   `Ingress`: Manages all external traffic, routing requests to the appropriate service based on URL paths.
    *   `Secrets`: Securely injects sensitive configuration (database URLs, JWT keys) into the containers at runtime.

    ![Kubernetes pods](https://github.com/user-attachments/assets/da8381aa-d214-4a1a-94c6-98021dbf0b66)

### 3. Persistence Strategy (Polyglot Persistence)

A polyglot persistence model was chosen to use the right tool for each job:

*   **PostgreSQL:** Used as the primary system of record for structured, relational data that requires strong consistency (users, document metadata, permissions). A remote, managed instance is used to reflect a production setup.
*   **Redis:** Used as a high-performance, in-memory key-value store for ephemeral and cache data.
    *   **Session Caching:** A Redis Hash stores the active state (content and version) of a document being edited, reducing read/write load on PostgreSQL.
    *   **Undo Stack:** A Redis List is used as a LIFO stack to store the history of operations for a given session, enabling the undo feature.

### 4. Communication Patterns

The system demonstrates both synchronous and asynchronous communication methods:

*   **Synchronous:**
    *   **REST (HTTP):** Used for standard client-server requests (e.g., login, create document) and for internal, direct inter-service communication where an immediate response is required (e.g., `realtime-service` calling `document-service` to check permissions).
    *   **WebSockets:** Used for persistent, low-latency, bidirectional communication between the client and the `realtime-service` to broadcast editing operations.

*   **Asynchronous (Event-Driven):**
    *   **RabbitMQ (AMQP):** Used as a message broker to decouple services. When a document is shared, the `document-service` publishes a `user.invited` event to a topic exchange. This allows the `document-service` to complete the request quickly without waiting for the notification to be sent. The `notification-service` subscribes to this exchange and processes the event independently, improving system resilience.



### 5. Concurrency Control

To handle simultaneous edits, the system uses an operations-based model with version-based optimistic concurrency control.

1.  The server maintains a version number for each document, incremented with each successful operation.
2.  Clients send editing operations (`insert`, `delete`) that include the document version they are based on.
3.  The server **rejects** any operation whose version does not match the current server version.
4.  Upon rejection, the server sends an `out_of_sync` message containing the latest content and version, forcing the client to resynchronize its state before retrying.

This model prevents data corruption from race conditions. It serves as the foundation upon which a more complex conflict-resolution algorithm like Operational Transformation (OT) could be built.

### 6. DevOps and Automation

*   **CI/CD Pipeline (GitHub Actions):** The project includes a full CI/CD pipeline.
    *   **Continuous Integration (CI):** On every push to the `main` branch, a workflow automatically builds Docker images for all four microservices and pushes them, tagged with the commit SHA, to a container registry.
    *   **Continuous Deployment (CD):** A subsequent workflow (not fully enabled for the local Minikube setup) is designed to take these versioned images and automatically deploy them to a Kubernetes cluster (e.g., Amazon EKS) by updating the image tags in the deployment manifests and running `kubectl apply`.

*   **Observability Stack:** The system is fully instrumented for observability using the "Three Pillars":
    *   **Metrics (Prometheus):** All Go services expose a `/metrics` endpoint with application and runtime metrics, which are scraped by a Prometheus server deployed in the cluster.
    *   **Logs (Loki):** All container logs (stdout/stderr) are automatically collected by Promtail and aggregated into a centralized, queryable Loki instance.
    *   **Visualization (Grafana):** Grafana is deployed and configured with Prometheus and Loki as data sources, providing a single pane of glass for visualizing metrics dashboards and exploring aggregated logs.