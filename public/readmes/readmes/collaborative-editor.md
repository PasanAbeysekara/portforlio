# Cloud-Native Collaborative Editor Backend

## Overview

This project is a backend system for a real-time, multi-user collaborative text editor, modeled after platforms like Google Docs. It is architected as a set of cloud-native microservices designed to run on a container orchestration platform. The system handles user authentication, document management, real-time operation broadcasting, and asynchronous notifications, demonstrating a complete, production-ready architecture.

For a detailed explanation of the system's design, components, and communication patterns, please see ARCHITECTURE.md.

## Core Features

*   **User Authentication:** Secure user registration and login via JWT-based authentication.
*   **Document Management:** Create, share, and manage permissions for documents.
*   **Real-time Collaboration:** WebSocket-based communication for broadcasting editing operations to multiple clients in real-time.
*   **Concurrency Control:** A version-based system to prevent data corruption from conflicting edits.
*   **Undo Functionality:** The server maintains an operation stack for each document session, allowing clients to undo changes.
*   **Asynchronous Notifications:** Event-driven communication via a message broker to decouple non-critical tasks like sending notifications.
*   **Automated Builds (CI):** A GitHub Actions CI pipeline automatically builds and pushes versioned container images to a registry on every commit to the main branch.

## Tech Stack

![Tech Stack](https://github.com/user-attachments/assets/be236822-23e9-4f0a-aae8-09d0c130f811)

## Prerequisites

To run this system locally, you must have the following tools installed:
*   [Go](https://golang.org/doc/install) (v1.22+)
*   [Docker](https://docs.docker.com/get-docker/)
*   [kubectl](https://kubernetes.io/docs/tasks/tools/)
*   [Minikube](https://minikube.sigs.k8s.io/docs/start/)
*   [Helm](https://helm.sh/docs/intro/install/)

## Local Deployment Guide

### 1. Clone Repository
```bash
git clone https://github.com/PasanAbeysekara/collaborative-editor-backend.git
cd collaborative-editor-backend
```

### 2. Configure Environment
Create a `.env` file in the project root. This file is ignored by Git and holds your local configuration.
```bash
cp .env.example .env
```
Review the `.env` file and ensure the `DATABASE_URL` and `JWT_SECRET` are set correctly. The default values for other services will work with the local Kubernetes setup.

### 3. Start Kubernetes Cluster
```bash
minikube start
minikube addons enable ingress
```

### 4. Build and Load Docker Images
The Kubernetes cluster needs access to the service images. The following commands build the images and load them directly into Minikube's internal Docker registry.
```bash
# Point your terminal to Minikube's Docker daemon
eval $(minikube -p minikube docker-env)

# Build all service images
docker build -t user-service:v1 -f ./cmd/user-service/Dockerfile .
docker build -t document-service:v1 -f ./cmd/document-service/Dockerfile .
docker build -t realtime-service:v1 -f ./cmd/realtime-service/Dockerfile .
docker build -t notification-service:v1 -f ./cmd/notification-service/Dockerfile .
```

### 5. Deploy Application to Kubernetes
Apply the Kubernetes manifests to deploy the application, its dependencies, and the necessary configurations.
```bash
# Create the secret first
kubectl apply -f k8s/secrets.yaml

# Deploy all other application components
kubectl apply -f k8s/
```
Verify all pods are running:
```bash
kubectl get pods
```

### 6. Deploy Observability Stack
Use Helm to deploy Prometheus for metrics, Loki for logging, and Grafana for visualization.
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install loki-stack grafana/loki-stack
helm install prometheus prometheus-community/prometheus
helm install grafana grafana/grafana
```

### 7. Accessing the Application
The application is exposed via the NGINX Ingress Controller. Find its IP address:
```bash
minikube ip
```
All API and WebSocket requests should be directed to this IP address on port 80.

## Project Structure

-   `cmd/`: Contains the `main.go` entry point and `Dockerfile` for each microservice.
-   `internal/`: Contains all the shared application logic (handlers, storage, auth, etc.).
-   `k8s/`: Contains all Kubernetes manifest files for deployment and configuration.
-   `.github/workflows/`: Contains the GitHub Actions CI/CD pipeline definitions.
