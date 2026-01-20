# Engineering Challenges & Decisions

This doc captures key trade-offs, risks, and “why” behind the current design, with actionable improvements.

---

## 1) Reservation Availability Computation

**Challenge**  
Accurately computing available time slots by property/date/party size while handling cancellations, no-shows, and overlapping reservations is non-trivial especially under load.

**Today**  
- Backend supports availability management (real-time/batch) and scheduled tasks.

**Risks**  
- Hot paths in peak times; DB lock contention.
- Complex business rules (buffers, seating policies).

**Improvements**  
- Precompute & cache availability windows by property/date; invalidate on writes.  
- Adopt **CQRS**: write model updates append events; read model maintains a denormalized availability table.  
- Add **idempotency keys** on booking endpoints to prevent double-bookings under retries.

---

## 2) Data Modeling & Search

**Challenge**  
Flexible filtering across properties, menus, promotions, tags, facilities, and locations without N+1 queries.

**Improvements**  
- Strategic indexing (property_id, date, timeslot, capacity).  
- Use query hints or projections for list endpoints.  
- Consider a search cache or secondary index (e.g., Elastic/OpenSearch) if requirements grow.

---

## 3) Security & Multi-Tenancy

**Challenge**  
Enforcing tenant isolation (organizations → properties) and role/permission boundaries.

**Today**  
- Spring Security + JWT (roles).

**Improvements**  
- Introduce tenant scoping in JWT claims and repository filters.  
- Add resource-level authorization checks (`@PreAuthorize`) with ownership assertions.  
- Rotate JWT secrets; support key rollover (kid headers).

---

## 4) Promotions, Contracts & Pricing Logic

**Challenge**  
Promotions/contract terms can be dynamic and cross-cutting during reservation/ordering.

**Improvements**  
- Rule engine or policy evaluation module (e.g., simple DSL) decoupled from core booking flow.  
- Cache computed eligibility per session + invalidate on state change.  
- Add A/B testing hooks for promo strategies.

---

## 5) Observability & SRE

**Challenge**  
Troubleshooting booking races, performance regressions, and failed jobs demands deep visibility.

**Today**  
- Log4j2 present.

**Improvements**  
- Adopt OpenTelemetry: traces for API calls (frontend → backend), DB spans, job spans.  
- SLOs for booking latency and API error rates; error budgets and alerts.

---

## 6) Testing Strategy

**Challenge**  
Ensuring reliability across auth, reservation flows, and admin CRUD.

**Today**  
- Frontend E2E with Cucumber.

**Improvements**  
- Contract tests (OpenAPI + Testcontainers) between FE/BE.  
- Backend: unit + slice tests for services/repos, integration tests with **Testcontainers MySQL**.  
- Synthetic monitoring of critical user journeys in prod.

---

## 7) Deployment & Config

**Challenge**  
Consistent release processes across environments.

**Today**  
- Backend Dockerfile & GitHub Actions directory; Frontend deploy targets include S3+CloudFront/Netlify. 

**Improvements**  
- Standardize CI: build, test, scan, image publish, infra deploy.  
- Externalize secrets (e.g., AWS Secrets Manager, GitHub Encrypted Secrets).  
- Blue/green or canary deploys for API and static site invalidations.

---

## 8) Internationalization & Localization

**Challenge**  
Backend message bundles exist; frontend i18n must align for full UX.

**Improvements**  
- Introduce Angular i18n or Transloco; language negotiation via headers.  
- Keep canonical enum/labels in backend; FE consumes a dictionary endpoint.

---

## 9) API Design Consistency

**Challenge**  
As resources expand, consistent versioning, pagination, and error models matter.

**Improvements**  
- Adopt `GET /resource?limit=&cursor=` pagination and RFC7807 Problem Details for errors.  
- Version path (`/api/v1`) + deprecation policy.
