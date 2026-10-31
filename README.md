# Ghazi Wazir — Personal Brand Website, Funnels & CEO Command Center

A high-performance, production-grade web application and enterprise command center built for **Ghazi Wazir**, CEO of:
1. **Bab Al-Khaleej** (Manama, Kingdom of Bahrain) — Commercial registration, investor & worker visa structuring, document consultancy, application tracking, and concierge corporate advisory.
2. **Back for Brand LLC** (Florida, USA) — Technology services for global enterprises: SEO, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), digital marketing, custom AI agents, automated workflow systems, and high-converting funnels.

> **Positioning:** *"Your business in Bahrain, powered by technology."*  
> **Brand Standard:** *"Two companies. One standard."*

---

## 1. Architecture & Tech Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Routing:** React Router v7 with clean URLs (`/`, `/companies`, `/start`, `/about`, `/contact`, `/book`, `/packages`, `/blog`, `/services/*`, `/funnels/*`, `/formation/*`, `/admin`).
- **Backend Server:** Node.js + Express + `tsx` with integrated server endpoints on port 3000:
  - Cryptographic password hashing with PBKDF2 (`crypto.pbkdf2Sync`, 100,000 iterations, 32-byte salt).
  - Rate limiting & anti-spam honeypot filtering on all public lead generation routes.
  - Interactive appointment booking engine with slot collision locks, past-date protection, and Asia/Bahrain business calendar constraints.
  - Append-only tamper-proof SHA-256 cryptographic hash-chained audit logging (`prevHash` + `timestamp` + `action` + `userId` + `payload`).
  - Strict Role-Based Access Control (RBAC): `CEO`, `ADMIN`, `SALES`, `SUPPORT`, `FINANCE`, `VIEWER`.
  - Multi-tier approval workflow with anti-self-approval enforcement and CEO-only gating for high-risk actions.
  - Centralized **Emergency Stop** system with one-click kill-switch for automated marketing and AI agents (resumable exclusively by the CEO).
  - Server-side Gemini AI Sales Agent powered by `@google/genai` (SDK model `gemini-3.8-flash`) with prompt-injection defense guardrails, knowledge base grounding, and live human escalation triggers.
- **Persistence & Cloud Deployability:** Firestore rules (`firestore.rules`) matching enterprise RBAC and audit immutability, backed locally by atomic JSON file storage in `/data/workspace.json`.

---

## 2. Directory Structure

```
├── /data/                  # Persistent database store (workspace.json, audit log)
├── /public/
│   ├── ghazi-wazir-photo.jpg # High-res official executive portrait
│   ├── robots.txt          # SEO crawl policy (disallow admin & funnels)
│   └── sitemap.xml         # Full sitemap of public pages & guides
├── /src/
│   ├── components/         # Reusable luxury UI components
│   │   ├── AIChatDrawer.tsx  # Server-side Gemini AI sales assistant drawer
│   │   ├── BookingWidget.tsx # Asia/Bahrain interactive calendar booking engine
│   │   ├── CookieBanner.tsx  # GDPR-compliant cookie consent manager
│   │   ├── Footer.tsx        # Enterprise footer with disclosures & team login
│   │   ├── LeadModal.tsx     # Honeypot-secured modal inquiry form
│   │   ├── Navbar.tsx        # Responsive header with services mega-dropdown
│   │   ├── ProgressBar.tsx   # Subtle gold scroll progress indicator
│   │   ├── SEOHead.tsx       # Dynamic JSON-LD, OpenGraph & meta controller
│   │   ├── SocialLinks.tsx   # Verified links across 20 professional platforms
│   │   └── WhatsAppButton.tsx# Pulsing WhatsApp float to +973 3562 8353
│   ├── pages/
│   │   ├── HomePage.tsx      # Flagship home (portrait, 2 companies, 12 services)
│   │   ├── CompaniesPage.tsx # Detailed dual-entity executive ecosystem
│   │   ├── StartPage.tsx     # 3-pathway personal brand funnel router
│   │   ├── AboutPage.tsx     # Executive biography & core principles
│   │   ├── ContactPage.tsx   # Verified contact channels & official inquiries
│   │   ├── BookPage.tsx      # Standalone booking portal
│   │   ├── PackagesPage.tsx  # Transparent packages with quote requests
│   │   ├── BlogPage.tsx      # Strategic guides directory
│   │   ├── GuideDetailPage.tsx   # Dynamic readers for all 6 strategic guides
│   │   ├── ServiceDetailPage.tsx # Dynamic views for all 12 services + FAQ
│   │   ├── NotFoundPage.tsx  # Luxury 404 error page
│   │   ├── ThankYouPage.tsx  # Post-opt-in confirmation & WhatsApp fast-track
│   │   ├── admin/
│   │   │   └── AdminConsole.tsx  # 25-module CEO Command Center
│   │   ├── formation/        # Russell Brunson 5-step Epiphany Bridge funnel
│   │   │   ├── FormationIndexPage.tsx     # Step 1: Opt-in squeeze
│   │   │   ├── FormationBridgePage.tsx    # Step 2: Epiphany Bridge story
│   │   │   ├── FormationBlueprintPage.tsx # Step 3: Interactive checklist
│   │   │   └── FormationOfferPage.tsx     # Step 4: Done-with-you offer
│   │   ├── funnels/
│   │   │   ├── FunnelsIndexPage.tsx       # 12 VSL funnels directory
│   │   │   └── VSLServicePage.tsx         # Individual VSL funnel template
│   │   └── legal/            # Privacy, Terms, Disclaimer & Cookie policy
│   ├── services/
│   │   └── api.ts            # Client API connector for frontend-to-backend
│   ├── types/
│   │   └── index.ts          # Comprehensive TypeScript domain types
│   ├── App.tsx               # Main React Router hub & layouts
│   ├── index.css             # Luxury dark design tokens & Tailwind config
│   └── main.tsx              # React DOM entry point
├── firestore.rules           # Production Cloud Firestore security rules
├── server.ts                 # Full-stack Node.js/Express application server
├── metadata.json             # AI Studio applet configuration & capabilities
└── package.json              # Dependencies and scripts
```

---

## 3. Getting Started & Local Development

### Prerequisites
- Node.js 20+ and npm

### Installation
```bash
npm install
```

### Running the Full-Stack Application
The application runs both the Express backend API and the Vite React frontend concurrently on port 3000:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the public application.

### Accessing the CEO Command Center
1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) (or click **Team Login** at the bottom right of the footer).
2. If first launch, complete the **CEO Initial Account Setup**:
   - Default Name: `Ghazi Wazir`
   - Default Email: `ghaziwazirndm@gmail.com`
   - Set a secure master password (minimum 8 characters).
3. Log in with your credentials. You have unrestricted access to all 25 modules, approval actions, user management, and the Emergency Stop switch.

---

## 4. Verification & Testing

### TypeScript Check & Linting
```bash
npm run lint
```

### Production Build
```bash
npm run build
```

---

## 5. Environment Variables Guide

Copy `.env.example` to `.env` and configure keys as needed:

```bash
# GEMINI_API_KEY: Injected automatically by AI Studio for Gemini 3.8 Flash AI Sales Agent
GEMINI_API_KEY="your-gemini-api-key"

# APP_URL: Public URL of the deployed application
APP_URL="http://localhost:3000"

# PORT: Server listening port
PORT=3000

# OPTIONAL THIRD-PARTY INTEGRATIONS (Marked "CONFIGURATION REQUIRED" until keys supplied)
STRIPE_SECRET_KEY=""
PAYMENT_WEBHOOK_SECRET=""
RESEND_API_KEY=""
NOTIFICATION_EMAIL="ghaziwazirndm@gmail.com"
GOOGLE_CALENDAR_CLIENT_ID=""
GOOGLE_CALENDAR_CLIENT_SECRET=""
```

---

## 6. Security & Compliance Disclosures

1. **Private Advisory Disclosure:** Bab Al-Khaleej and Back for Brand LLC are private commercial and technical consultancies. Neither firm is a government ministry or statutory authority. All company formation approvals, commercial registration renewals, and visa issuances are subject to sole statutory adjudication by the Ministry of Industry & Commerce (MOIC), Sijilat, and the Labour Market Regulatory Authority (LMRA) in the Kingdom of Bahrain.
2. **AI Sales Guardrails:** The integrated AI sales agent operates under binding system instructions prohibiting the generation of speculative timelines, fee guarantees, or legal promises.
3. **Audit Immutability:** Audit records are computed using SHA-256 hash chaining, preventing administrative manipulation of historical event logs.

---

## 7. SEO, GEO/AEO, LLMs.txt & Domain DNS (SPF & DMARC)

### A. Meta Description & SEO Compliance
- **Character Count:** Optimized to 143 characters (within search engine ideal threshold of 120–160 characters):
  `"Ghazi Wazir: CEO of Bab Al-Khaleej (Bahrain business setup & visas) and Back for Brand LLC (GEO, AEO, AI agents). Two companies, one standard."`
- **Schema.org Graph:** Rich JSON-LD `Person`, dual `Organization`, `FAQPage`, and `Article` entities embedded dynamically.

### B. LLM Readability & Semantic Fallback (Solving SPA Rendering Penalty)
- Standard Single Page Applications risk missing content during AI crawler indexing (Perplexity, ChatGPT, Claude, Gemini) when initial HTML is an empty `<div id="root"></div>`.
- This platform embeds **semantic pre-rendered HTML** inside `<div id="root">`, delivering immediate H1 headers, entity overviews, service scopes, and contacts in the raw response. React client hydration smoothly mounts on top without layout shift.

### C. `llms.txt` and `llms-full.txt` Standard
- `/llms.txt`: Concise Markdown specification for AI answer engines.
- `/llms-full.txt`: Full factual context corpus, entity details, service playbooks, and regulatory constraints.
- Declared in `robots.txt` and `<link rel="llms-txt" href="/llms.txt" />`.

### D. Google Analytics 4 (GA4)
- Embedded in `index.html` with anonymized IP tracking and privacy consent mode.

### E. Domain DNS, SPF & DMARC Deliverability
Publish the following DNS records in your domain's DNS manager (Cloudflare, Namecheap, Google Domains) for `@ghaziwazir.com`:

| Type | Host / Name | Value / Target | Purpose |
| :--- | :--- | :--- | :--- |
| **TXT** | `@` | `v=spf1 include:_spf.google.com include:resend.com ~all` | **SPF Record**: Authorizes Google Workspace & transactional servers |
| **TXT** | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@ghaziwazir.com; pct=100; adkim=r; aspf=r` | **DMARC Record**: Quarantines spoofed mail and reports deliverability |
| **CNAME**| `resend._domainkey` | `feedback-smtp.us-east-1.amazonses.com` | **DKIM Record**: Cryptographic signature validation |

