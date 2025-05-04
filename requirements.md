# Functional Requirements for CodeCouncil

## User Authentication & Management
- [ ] A user must be able to **sign up** using an email and password.
- [ ] A user must be able to **log in** using their email and password.
- [ ] A user must be able to **log out** securely.
- [ ] A user must be able to **reset their password** via email.
- [ ] A user must be able to **update their profile information** (name, email, password).

## GitHub Integration
- [ ] A user must be able to **connect their GitHub account** to integrate repositories.
- [ ] The system must **store and manage the GitHub OAuth access token** securely.
- [ ] A user must be able to **see a list of their GitHub repositories** after integration.
- [ ] A user must be able to **select which repositories they want to integrate** with CodeCouncil.
- [ ] The system must **persist the selected repositories** for future analysis.
- [ ] A user must be able to **disconnect their GitHub account**, removing access but keeping historical data.

## Repository & Code Analysis
- [ ] A user must be able to **view all integrated repositories** in the system.
- [ ] A user must be able to **filter repositories** by name, integration status, or activity level.
- [ ] The system must **fetch commit history** from GitHub for each integrated repository.
- [ ] The system must **fetch pull request history** from GitHub for each integrated repository.
- [ ] The system must **track key development metrics** such as:
  - [ ] **Cycle Time** (time from first commit to merge).
  - [ ] **Refactor Rate** (percentage of commits dedicated to refactoring).
  - [ ] **Pull Request Lead Time** (time from PR open to PR merge).
  - [ ] **Merge Frequency** (how often PRs are merged).
  - [ ] **Commit Frequency** (how often commits are pushed).
  - [ ] **Issue Resolution Time** (if tracking GitHub issues).
- [ ] A user must be able to **view a dashboard** with all the above metrics.
- [ ] The system must automatically **update repository metrics daily**.
- [ ] A user must be able to **manually refresh repository data** at any time.

## Data Storage & Management
- [ ] The system must **store repository metadata** (name, description, private/public).
- [ ] The system must **store commit data** with timestamps, authors, and messages.
- [ ] The system must **store pull request data** with timestamps, authors, and status.
- [ ] The system must allow **exporting data** (CSV or JSON format).
- [ ] The system must support **soft deletion** for repositories (data remains hidden but recoverable).

## Dashboard & Insights
- [ ] A user must be able to **see a summary of their DevOps performance** on a dashboard.
- [ ] The dashboard must include:
  - [ ] **Total number of commits & pull requests per repository**.
  - [ ] **Time-based trends** (e.g., weekly commit activity).
  - [ ] **Team productivity comparisons** (if multiple users have access).
  - [ ] **Graphs and charts** for visualization.
- [ ] A user must be able to **compare metrics across different repositories**.
- [ ] A user must be able to **see a leaderboard of contributors** ranked by activity.

## Notifications & Reports
- [ ] A user must be able to **set up email notifications** for specific metrics (e.g., high refactor rate).
- [ ] The system must **send a weekly report** summarizing repository activity.
- [ ] A user must be able to **configure notification preferences**.

## Team & Collaboration Features (Future Scope)
- [ ] A user must be able to **invite other users** to view shared repositories.
- [ ] A team must be able to **collaborate on repository insights** (commenting, shared reports).
- [ ] A user must be able to **see organization-wide metrics** (if part of a GitHub org).

## Security & Access Control
- [ ] The system must use **OAuth 2.0** for GitHub authentication.
- [ ] The system must **encrypt stored GitHub access tokens**.
- [ ] A user must only be able to **access repositories they have explicitly integrated**.
- [ ] The system must log **all API access and user actions** for security auditing.

## Future Enhancements (Optional)
- [ ] Support for **other Git providers** (GitLab, Bitbucket, etc.).
- [ ] Integration with **JIRA or Trello** to correlate commits with tasks.
- [ ] Advanced AI-based insights on code quality & bottlenecks.

# Technologies & Libraries for CodeCouncil

## Backend (Node.js + TypeScript)
- **Framework:** NestJS (recommended) or Express.js
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** Passport.js (OAuth with GitHub)
- **HTTP Client:** `fetch` (native) or `undici`
- **Background Jobs (optional):** BullMQ (Redis-based)
- **Logging & Monitoring:** Pino (logs), Prometheus + Grafana (metrics)
- **Testing:** Jest (unit tests), Supertest (API testing)
- **Containerization:** Docker

## Frontend (React + TypeScript)
- **Framework:** React.js with Vite
- **State Management:** React Query (for API calls) or Redux Toolkit
- **UI Library:** Tailwind CSS or Chakra UI
- **Charting Library:** Recharts or Chart.js
- **Routing:** React Router

## Infrastructure & DevOps
- **Version Control:** GitHub
- **CI/CD:** GitHub Actions (build, test, deploy)
- **Hosting:** Vercel (Frontend), Railway/Fly.io/Heroku (Backend)
- **Secrets Management:** Dotenv + GitHub Secrets
- **API Documentation:** Swagger (OpenAPI)

## External Services
- **GitHub API:** For fetching repository data
- **Redis (optional):** Caching & rate-limiting API calls
- **Email Sending (optional):** Nodemailer with SMTP or SendGrid