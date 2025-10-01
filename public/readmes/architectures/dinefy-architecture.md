# DineFy Architecture

This document describes the system architecture spanning **Frontend (Angular)** and **Backend (Spring Boot)**, the core domain model, cross-cutting concerns, and deployment patterns observed in the repositories.

> Sources: Frontend repo (Angular + Tailwind, Cucumber E2E, S3/CloudFront/Netlify mentioned) and Backend repo (Spring Boot, MySQL, JWT, HATEOAS, Docker, GitHub Actions). :contentReference[oaicite:12]{index=12}

---

## 1. High-Level View
![Architecture Diagram](https://github.com/user-attachments/assets/38034a2c-55c7-43a5-b684-a402cb24bb50)


- **Frontend** renders views, handles session state (JWT), calls REST endpoints.
- **Backend** exposes RESTful APIs with HATEOAS links; manages business rules, persistence, and background tasks (scheduled / async).
- **MySQL** stores all persistent domain entities (organizations, properties/restaurants, locations/states, menus/choices, reservations, orders, promotions, contracts, availability, system config).

(Entities & features taken from backend README.) :contentReference[oaicite:13]{index=13}

---

## 2. Frontend Architecture (Angular)

**Key Pieces (repo evidence)**  
- Angular project with `tailwind.config.js`, `e2e` folder (Cucumber), standard Angular CLI config files. :contentReference[oaicite:14]{index=14}

**Recommended layering (matches Angular best practices)**
- **Core Module**: Auth service (login/refresh/JWT storage), HTTP interceptors (Authorization header, error handling), guards (AuthGuard).
- **Shared Module**: UI components, pipes, directives.
- **Feature Modules**:
  - **Auth**: Login/Register, profile management.
  - **Properties**: List/search restaurants, detail pages.
  - **Menus**: View menus & items.
  - **Reservations**: Time-slot search, booking flow, my reservations.
  - **Orders**: Create/manage orders.
  - **Promotions**: Display/eligibility.
  - **Admin**: CRUD for organizations/properties/menus/availability/promotions.
- **State**: Service-based state or a store (e.g., NGXS/NGRX) — if introduced, keep per-feature slices and effects for API calls.
- **Routing**: Lazy-loaded feature modules; role-protected routes via guards.

**E2E Testing**
- Cucumber feature specs + step definitions targeting critical user journeys (login, search, reserve, cancel). :contentReference[oaicite:15]{index=15}

**Deployment**
- **S3 + CloudFront** or **Netlify**, as noted in the frontend README. :contentReference[oaicite:16]{index=16}

---

## 3. Backend Architecture (Spring Boot)

**Tech & Concerns**
- Spring MVC (controllers), Spring Security (JWT), Spring Data JPA (repositories), Spring HATEOAS (linking), Log4j2, schedulers/async, Docker packaging, GitHub Actions CI/CD. :contentReference[oaicite:17]{index=17}

**Suggested Package Layout**
```

com.dinefy
├─ config/          # Security, CORS, Swagger/OpenAPI, Jackson, i18n
├─ security/        # JWT filters, token provider, auth endpoints
├─ api/             # Controllers (REST + HATEOAS)
├─ domain/          # Entities, Value Objects, Enums
├─ dto/             # API DTOs
├─ repo/            # Spring Data repositories
├─ service/         # Business services, transactions
├─ jobs/            # @Scheduled tasks (availability updates, etc.)
├─ async/           # @Async executors, messaging adapters
└─ i18n/            # message bundles

```

**Domain Model (from README)**
- **User** (authn/z, roles)
- **Organization** → **Property (Restaurant)** → **Location/State**
- **Menu** → **MenuItem (Choice)**
- **Reservation** (time slot, party size, status)
- **Order** (items, totals, status)
- **Promotion**
- **Contract**
- **Availability** (real-time/batch computed)
- **System Config** (tags, facilities, event types, seat types)

(Entities/features per backend README.) :contentReference[oaicite:18]{index=18}

**Key Flows**
- **Authentication**: `/auth/login` → JWT issued → client adds `Authorization: Bearer <token>` to subsequent API calls.
- **Reservations**:
  1. Client requests available slots for property/date/party size.
  2. Backend consults **Availability**; if needed, recompute (async or scheduled).
  3. Client books → reservation persisted → confirmation returned.
- **Orders**: Create and update order linked to reservation/property/menu.
- **Promotions**: Eligibility checks applied during reservation/order flow.

(Flow responsibilities reflect backend README’s features including availability management & scheduling.) :contentReference[oaicite:19]{index=19}

**Cross-Cutting**
- **Validation**: Bean Validation (JSR 380) on DTOs.
- **Error Handling**: `@ControllerAdvice` with standardized problem responses.
- **Security**: Spring Security + JWT; method-level `@PreAuthorize` for roles.
- **Observability**: Log4j2; (suggest adding metrics/traces).
- **i18n**: `messages_*.properties`.

**Data**
- MySQL schema managed via JPA/Hibernate; `/database` folder in repo for DB assets. :contentReference[oaicite:20]{index=20}

---

## 4. API Surface (Resource-Oriented)

> Concrete endpoints will follow the RESTful resources below; the backend README confirms the resource areas. Namespaces typically version under `/api/v1/…`.

- `/auth/*` – auth, token issue/refresh (JWT)  
- `/organizations`, `/properties`, `/locations`, `/states`  
- `/menus`, `/menu-items`  
- `/reservations` (search, create, cancel)  
- `/orders`  
- `/promotions`  
- `/contracts`  
- `/availability`  
- `/system-config/{tags, facilities, event-types, seat-types}`

(High-level resource list drawn from backend README’s feature list; exact paths may vary.) :contentReference[oaicite:21]{index=21}

---

## 5. Async & Scheduling

- **Async**: Executor(s) for non-blocking tasks (e.g., availability recompute, property updates).  
- **Scheduled**: Periodic jobs (e.g., event/availability updates, cleanup).  
(Explicitly called out in the backend README.) :contentReference[oaicite:22]{index=22}

---

## 6. CI/CD & Containerization

- **Backend**: Docker image via `Dockerfile`; **GitHub Actions** pipelines in `.github/workflows`. Deploy to your runtime (EC2/ECS/K8s). :contentReference[oaicite:23]{index=23}
- **Frontend**: Build artifacts deployed to **S3+CloudFront** or **Netlify** (per README visuals). :contentReference[oaicite:24]{index=24}

---

## 7. Environment Configuration

**Backend**
- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`, `JWT_EXPIRATION`
- `SPRING_PROFILES_ACTIVE=prod`

**Frontend**
- `environment.ts`/`environment.prod.ts`: `apiBaseUrl`, feature flags, build-time env via CI.

---

## 8. Security Posture

- Enforce HTTPS, secure cookies for any session storage where applicable.
- Short-lived JWT + refresh mechanism; rotate secrets.
- Role-based access on sensitive resources (reservations, orders, admin CRUD).
- Rate limiting and input validation to mitigate abuse.
- Audit logs for critical events (reservation/ordering updates).

---

## 9. Scalability Considerations

- **Stateless API** behind a load balancer; horizontal scale.
- **MySQL**: Read replicas for read-heavy operations; proper indexing on search (property/date/party size).
- **Caching**: Availability lookup caches; HTTP caching for static frontend.
- **Queues** (future): Offload heavy recomputation (availability, promo evaluation).

---

## 10. Observability

- **Logs**: Structured JSON via Log4j2 appenders.
- **Metrics/Tracing**: Add OpenTelemetry exporters (Jaeger/OTLP) in production.
- **Health**: `/actuator/health` and readiness/liveness probes.