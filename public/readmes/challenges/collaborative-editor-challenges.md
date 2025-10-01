# Technical Challenges Faced

Developing and deploying a distributed, real-time system from the ground up presented several significant technical challenges. This document outlines the key hurdles encountered and the solutions implemented to overcome them.

## 1. Concurrency Management in Real-time Editing

**Challenge:** The most fundamental problem in a collaborative editor is preventing data corruption when multiple users edit the same document simultaneously. If two users' operations arrive at nearly the same time, a naive implementation could lead to an inconsistent final state. A full **Operational Transformation (OT)** algorithm, which mathematically transforms conflicting operations, is notoriously complex to implement correctly due to the sheer number of edge cases.

**Solution:** A pragmatic and robust alternative was chosen: **version-based optimistic concurrency control**.
-   The server maintains a master version number for each document, which is incremented with every successful change.
-   Each operation sent by a client must include the document version it is based on.
-   The server strictly rejects any incoming operation whose version does not match the server's current version.
-   When an operation is rejected, the server responds with an `out_of_sync` message containing the latest document content and version. This forces the out-of-sync client to reset its state and re-apply any local, unconfirmed changes on top of the new state.
-   This approach, while not as seamless as true OT, completely prevents data corruption and provides a reliable foundation for collaboration.

## 2. CI/CD Pipeline Integration with Kubernetes

**Challenge:** Automating deployments to a Kubernetes cluster from a cloud-based CI/CD runner (GitHub Actions) introduced significant authentication and networking hurdles.

-   **Authentication (GitHub Actions to EKS):** The initial attempt to use a standard `kubeconfig` file in the CI/CD pipeline failed. This was because the `kubeconfig` contained references to local certificate files and a private IP address for the cluster, neither of which were accessible to the external GitHub Actions runner.

-   **Authorization (IAM to Kubernetes RBAC):** After solving authentication, the pipeline faced authorization errors. The IAM role assumed by GitHub Actions was a valid AWS identity, but the EKS cluster had no internal knowledge of this role or what permissions it should have.

**Solution:** A multi-step, production-grade security model was implemented.
-   **Authentication Solution:** The problem was solved by implementing the **OIDC (OpenID Connect)** standard. An OIDC identity provider was configured in AWS IAM to trust GitHub Actions. An IAM Role was then created with a trust policy that allowed principals from a specific GitHub repository to assume it. The CI/CD workflow was configured to use this role, receiving temporary, secure credentials without needing any long-lived secrets like a `kubeconfig`.
-   **Authorization Solution:** The bridge between AWS IAM and Kubernetes RBAC was created by editing the `aws-auth` ConfigMap in the `kube-system` namespace. An entry was added to map the `GitHubActionsDeployRole` ARN to the `system:masters` Kubernetes group, explicitly granting the CI/CD pipeline the administrative permissions it needed to apply manifests.

## 3. Kubernetes Networking and Service Discovery

**Challenge:** In a microservice architecture, services need to reliably communicate with each other. In Kubernetes, pods are ephemeral and their IP addresses can change. Furthermore, exposing the application to the outside world requires a robust routing mechanism.

-   **Inter-Service Communication:** Services could not rely on hardcoded pod IPs.
-   **External Access:** The cluster was, by default, only accessible internally.

**Solution:** Core Kubernetes networking concepts were leveraged.
-   **Services:** For each microservice, a Kubernetes `Service` object was created. This provides a stable, internal DNS name (e.g., `document-service`) that other pods can use to reliably connect, regardless of pod restarts or IP changes. This was used for the synchronous REST calls between the `realtime-service` and `document-service`.
-   **Ingress Controller:** The NGINX Ingress Controller was deployed to the cluster. An `Ingress` manifest was written to define traffic routing rules, directing external requests to the correct internal service based on the URL path (e.g., `/auth/*` -> `user-service`, `/ws/*` -> `realtime-service`).

## 4. Observability Stack Configuration in Kubernetes

**Challenge:** Deploying the observability stack (Prometheus, Loki, Grafana) using official Helm charts was not a "one-click" process. Connectivity issues arose between the components immediately after installation.

-   **Grafana-Loki Connection Failure:** The Grafana instance was unable to connect to the Loki service, despite both running in the same cluster.
-   **Helm Chart Validation:** The Helm charts had strict validation rules that caused installations to fail if certain configuration values, which were not always obvious for a local setup, were missing.

**Solution:** A methodical, in-cluster debugging approach was used.
-   **Connectivity Debugging:** `kubectl exec` was used to gain a shell inside the Grafana pod. From there, standard networking tools (`wget`, `curl`) were used to test DNS resolution and connectivity to the Loki service's internal DNS name and port. This definitively identified the correct service name, which had been misconfigured in the Grafana UI.
-   **Helm Configuration:** The Helm installation failures were resolved by carefully reading the error messages from the chart's validation templates and iteratively building a `loki-values.yaml` file that provided all the required keys (such as `storage.type` and `storage.bucketNames`), even if they were dummy values for a filesystem-based setup. This highlighted the importance of understanding the configuration surface of the tools being deployed.