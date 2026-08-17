<div align="center">

# FixItNow

### A full-stack home services booking platform built with Next.js 16

Connect customers with trusted technicians for any home repair or maintenance need — book, pay, and review, all in one place.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Roles & Permissions](#roles--permissions)
- [Pages & Routes](#pages--routes)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Overview

**FixItNow** is a home services marketplace where customers can browse services offered by technicians, book a slot based on real availability, pay online via Stripe, and leave a review once the job is done.

The platform supports three distinct user roles — **Customer**, **Technician**, and **Admin** — each with their own dedicated dashboard, protected routes, and tailored UI. The entire frontend is built as a **Next.js 16 App Router** application with server-side data fetching, ISR caching, and cookie-based JWT authentication managed through a custom Next.js middleware (`proxy.ts`).

---

## Features

### Customer
- Browse all available home services with category and location filters
- View detailed service and technician profile pages
- Book a service by selecting an available time slot
- Cancel a pending booking
- Pay for a confirmed booking via Stripe checkout
- View full payment history and individual payment details
- Leave a star rating and written review after a service is completed
- View and manage personal dashboard

### Technician
- Create, edit, and delete their own services
- Manage availability slots (date, start time, end time)
- View incoming bookings and update booking status (confirm, complete, etc.)
- Dedicated technician dashboard

### Admin
- View all users in the system, ban/unban or delete accounts
- View all bookings across the platform
- Create, update, and delete service categories
- Dedicated admin dashboard

### Platform-wide
- JWT authentication with automatic silent token refresh via middleware
- Role-based route protection (redirect to correct dashboard by role)
- Animated home page with marquee category strip, hero, and mobile app section
- Glassmorphic, scroll-aware sticky navbar
- Mobile-first responsive design — bottom nav bar on mobile for dashboards, hamburger Sheet drawer on public pages
- Dark/light theme support via `next-themes`
- Toast notifications via `sonner`
- OTP-based forgot password flow (send → verify → reset)
- Full skeleton loading states across all data-heavy pages
- Custom 404 and error pages

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) + Radix UI primitives |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Auth** | Cookie-based JWT (`accessToken` + `refreshToken`) |
| **Token Handling** | `jsonwebtoken` — decode & verify on server |
| **Middleware** | Custom Next.js `proxy.ts` — route protection + silent token refresh |
| **Theme** | `next-themes` — dark / light mode |
| **Notifications** | `sonner` — toast messages |
| **Package Manager** | pnpm |
| **Linting** | ESLint (eslint-config-next) |

---

## Project Structure

```
level-2-assignment-5/
│
├── app/
│   ├── (authGroup)/                  # Auth pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── _actions/authActions.ts   # Login, register, OTP, reset
│   │   └── _components/              # LoginForm, SignUpForm, ForgotPasswordForm
│   │
│   ├── (publicGroup)/                # Public-facing pages
│   │   ├── page.tsx                  # Home page
│   │   ├── services/                 # Service listing + [slug] detail page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── payment/                  # Stripe callback / payment result
│   │   ├── _actions/                 # bookingActions, publicActions, publicServiceActions
│   │   └── _components/              # ServiceCard, ServiceList, home sections
│   │
│   ├── (dashboardGroup)/             # All role-based dashboards (shared layout)
│   │   ├── dashboard/                # Customer dashboard
│   │   │   ├── my-bookings/
│   │   │   └── payments/
│   │   ├── technician-dashboard/     # Technician dashboard
│   │   │   ├── my-services/
│   │   │   ├── my-availabilities/
│   │   │   └── my-bookings/
│   │   ├── admin-dashboard/          # Admin dashboard
│   │   │   ├── all-users/
│   │   │   ├── all-bookings/
│   │   │   └── categories/
│   │   ├── profile/                  # Shared profile page
│   │   ├── _actions/                 # All dashboard server actions
│   │   ├── _components/              # DashboardSidebar, DashboardNavbar
│   │   └── _config/                  # sidebarItems config per role
│   │
│   ├── layout.tsx                    # Root layout
│   ├── globals.css
│   ├── error.tsx
│   ├── loading.tsx
│   └── not-found.tsx
│
├── components/
│   ├── shared/                       # Navbar, Footer, ThemeToggle
│   └── ui/                           # shadcn/ui component library
│
├── service/
│   ├── getMe.ts                      # GET /api/users/me
│   └── tokenRevalidation.ts          # POST /api/auth/refresh-token
│
├── lib/
│   ├── types.ts                      # All shared TypeScript types
│   └── utils.ts                      # cn() and other utilities
│
├── utils/
│   └── jwt.ts                        # JWT verify helper
│
├── hooks/                            # Custom React hooks
├── proxy.ts                          # Next.js middleware (auth guard + token refresh)
├── next.config.ts
├── package.json
├── .env.example
└── API_INTEGRATION.md                # Full API documentation
```

---

## Roles & Permissions

| Route Prefix | Required Role | Redirect if wrong role |
|---|---|---|
| `/dashboard/*` | `CUSTOMER` | → `/not-found` |
| `/technician-dashboard/*` | `TECHNICIAN` | → `/not-found` |
| `/admin-dashboard/*` | `ADMIN` | → `/not-found` |
| `/login`, `/signup`, `/forgot-password` | Unauthenticated | → role-based dashboard if already logged in |
| `/`, `/services`, `/about`, `/contact` | Anyone | — |
| Any other protected route | Authenticated | → `/login?redirectTo=...` if not logged in |

Role detection happens inside `proxy.ts` — the middleware decodes the JWT on every request, silently refreshes expired access tokens using the refresh token, and redirects accordingly. No client-side auth checks needed.

---

## Pages & Routes

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Home page — hero, category marquee, featured services, mobile app section |
| `/services` | Browse all services with filters |
| `/services/[slug]` | Individual service detail page with booking modal |
| `/about` | About the platform |
| `/contact` | Contact page |
| `/payment` | Stripe payment result / callback page |

### Auth Pages
| Route | Description |
|-------|-------------|
| `/login` | Login with email & password |
| `/signup` | Create a new account (Customer or Technician) |
| `/forgot-password` | 3-step OTP flow: enter email → verify OTP → set new password |

### Customer Dashboard
| Route | Description |
|-------|-------------|
| `/dashboard` | Customer dashboard overview |
| `/dashboard/my-bookings` | View, cancel, and review bookings |
| `/dashboard/payments` | Payment history list |
| `/dashboard/payments/[slug]` | Individual payment detail |

### Technician Dashboard
| Route | Description |
|-------|-------------|
| `/technician-dashboard` | Technician dashboard overview |
| `/technician-dashboard/my-services` | Create, edit, delete own services |
| `/technician-dashboard/my-availabilities` | Manage availability slots |
| `/technician-dashboard/my-bookings` | View and update booking statuses |

### Admin Dashboard
| Route | Description |
|-------|-------------|
| `/admin-dashboard` | Admin overview |
| `/admin-dashboard/all-users` | View, ban/unban, delete users |
| `/admin-dashboard/all-bookings` | View all platform bookings |
| `/admin-dashboard/categories` | Create, edit, delete categories |

### Shared
| Route | Description |
|-------|-------------|
| `/profile` | Edit profile — name, image, experience |

---

## API Integration

> Full details in [API_INTEGRATION.md](./API_INTEGRATION.md)

**36 total API calls** — all server-side, zero client-side fetching.

| Domain | # of APIs |
|--------|-----------|
| Auth | 6 |
| Users | 5 |
| Services | 6 |
| Bookings | 5 |
| Availabilities | 3 |
| Categories | 4 |
| Payments | 3 |
| Reviews | 1 |
| Technicians | 1 |
| **Total** | **36** |

Quick reference of key endpoints:

```
POST   /api/auth/login                    → Login
POST   /api/users/register                → Register
POST   /api/auth/send-otp                 → Send OTP
POST   /api/auth/verify-otp               → Verify OTP
POST   /api/auth/reset-password           → Reset Password
POST   /api/auth/refresh-token            → Silent token refresh

GET    /api/users/me                      → Current user
GET    /api/services                      → All services (public)
GET    /api/services/details/:id          → Single service
POST   /api/bookings/create               → Create booking
PATCH  /api/bookings/:id/cancel           → Cancel booking
POST   /api/payments/checkout             → Stripe checkout session
GET    /api/payments/history              → Payment history
POST   /api/reviews/create                → Submit review

GET    /api/availabilities/my             → Technician: own slots
POST   /api/availabilities/create         → Technician: add slot
PATCH  /api/bookings/technician           → Technician: update booking status

GET    /api/users                         → Admin: all users
PATCH  /api/users/:id                     → Admin: ban/unban user
DELETE /api/users/:id                     → Admin: delete user
GET    /api/bookings                      → Admin: all bookings
POST   /api/categories/create             → Admin: create category
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A running backend API server

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd fix-it-now-frontend

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Fill in the values in .env (see below)

# 4. Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the following:

```env
# URL of your backend REST API (no trailing slash)
BACKEND_API_URL=http://localhost:5000

# Secret used to sign/verify access tokens (must match backend)
JWT_ACCESS_SECRET=your_access_token_secret

# Secret used to sign/verify refresh tokens (must match backend)
JWT_REFRESH_SECRET=your_refresh_token_secret
```

> The `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values must match exactly what the backend uses to sign tokens, otherwise the middleware will reject all requests.

---

## Scripts

```bash
pnpm dev      # Start development server (http://localhost:3000)
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```
