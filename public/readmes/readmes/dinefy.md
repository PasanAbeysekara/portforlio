# DineFy: Restaurant Reservations & Time Allocation Platform

DineFy is a full-stack system for managing restaurants, table availability, and customer reservations. It comprises:

- **Frontend (Angular + Tailwind)** — Responsive web app for customers and operators.  
- **Backend (Spring Boot + MySQL + JWT)** — REST API managing organizations, properties (restaurants), menus, reservations, orders, promotions, contracts, availability windows, and system configuration.

> Repos:  
> Frontend — https://github.com/PasanAbeysekara/dinefy-frontend  
> Backend — https://github.com/PasanAbeysekara/dinefy-data-service

---

## Features (high level)

- **Auth**: JWT-based login/registration, route protection (frontend guards & API authorization).
- **Organizations & Properties**: CRUD for organizations and their restaurants (properties) with locations/states.
- **Menus & Choices**: Define menus and menu items.
- **Reservations**: Time-slot search, booking, cancellation, availability checks.
- **Orders**: Order creation and lifecycle tracking.
- **Promotions & Contracts**: Campaigns and partner agreements.
- **Availability & Scheduling**: Real-time or batch updates; scheduled jobs for maintenance.
- **System Config**: Tags, facilities, event types, seat types, etc.
- **Internationalization**: Message bundles in backend (e.g., `messages_en.properties`).
- **HATEOAS** (backend): Discoverable APIs via hypermedia links.

---

## Tech Stack

**Frontend**
- Angular
- Tailwind CSS
- E2E tests with Cucumber (see `/e2e`), Angular CLI-based dev tooling
- Deployment options shown: **AWS S3 + CloudFront** or **Netlify** (icons/notes in README)
  

**Backend**
- Java (Spring Boot, Spring MVC/Security, Spring HATEOAS, Spring Data JPA)
- MySQL
- JWT authentication
- Log4j2
- Dockerized build/deploy
- CI/CD via GitHub Actions (see `.github/workflows`)

---

## Monorepo Layout

This documentation covers both repositories. Typical local layout:

```

dinefy/
├─ dinefy-frontend/     # Angular app
└─ dinefy-data-service/ # Spring Boot API

````

---

## Quickstart (Local Dev)

### Prerequisites

- Node.js + Angular CLI (frontend)
- JDK 17 (or JDK version specified in `pom.xml`) & Maven (backend)
- MySQL 8.x

### 1) Backend

1. Create a database and user:
   ```sql
   CREATE DATABASE dinefy CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
   CREATE USER 'dinefy'@'%' IDENTIFIED BY 'dinefy_password';
   GRANT ALL PRIVILEGES ON dinefy.* TO 'dinefy'@'%';
   FLUSH PRIVILEGES;

2. Configure environment (e.g., via `application.yml` or env vars):

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/dinefy
   spring.datasource.username=dinefy
   spring.datasource.password=dinefy_password

   jwt.secret=<generate strong secret>
   jwt.expiration=3600000
   logging.level.root=INFO

3. Run:

   ```bash
   cd dinefy-data-service
   ./mvnw spring-boot:run
   # or
   mvn spring-boot:run

4. Verify API is up (default `http://localhost:8080` if unchanged).

> Backend has a `Dockerfile` and a `/database` directory for DB artifacts; CI/CD via GitHub Actions is present.

### 2) Frontend

1. Install dependencies:

   ```bash
   cd dinefy-frontend
   npm install
   ```

2. Set API base URL (e.g., in `environment.ts`):

   ```ts
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:8080' // backend URL
   };
   ```

3. Run:

   ```bash
   ng serve
   ```

   Visit `http://localhost:4200`.

> The frontend README shows the standard Angular workflow (`npm install`, `ng serve`) and links to Node/Angular CLI prerequisites.

---

## Docker (Backend)

Build and run:

```bash
cd dinefy-data-service
docker build -t dinefy/data-service:local .
docker run --rm -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/dinefy \
  -e SPRING_DATASOURCE_USERNAME=dinefy \
  -e SPRING_DATASOURCE_PASSWORD=dinefy_password \
  -e JWT_SECRET=change_me \
  dinefy/data-service:local
```

(Backend provides a `Dockerfile`.)

---

## Deployment (Frontend)

* **AWS S3 + CloudFront**: Build (`ng build --configuration production`), upload `dist/` to S3, serve via CloudFront.
* **Netlify**: Connect repo, build command `ng build --configuration production`, publish `dist/<project-name>`.

---

## Testing

* **Frontend E2E**: Cucumber-based E2E in `/e2e`; configure feature files and step definitions accordingly. 
* **Backend**: Standard Spring Boot testing stack (JUnit/MockMVC) via Maven (test phase). (Implied by Maven setup.)

---

## Security

* JWT Authorization headers for protected endpoints.
* Spring Security for role-based access control.
* Use HTTPS in production; store secrets (JWT, DB creds) in a secret manager/CI secrets.

---

## Roadmap (suggested)

* API pagination & filtering everywhere
* Rate limiting & audit logging
* Webhooks / Outbox for third-party integrations
* Background jobs for availability recomputation
* Observability: metrics, traces (OpenTelemetry), structured logs (Log4j2)

---

## License

See individual repos.
