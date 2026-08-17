# API Integration

> **Total APIs used: 36 fetch calls across 9 server action files**
> All API calls are server-side only (`"use server"`). Zero client-side fetching.
> Base URL: `process.env.BACKEND_API_URL`

---

## Summary Table

| # | Method | Endpoint | Action Function | Used In Component / Page | Purpose |
|---|--------|----------|-----------------|--------------------------|---------|
| 1 | POST | `/api/auth/login` | `loginAction` | `LoginForm` | Authenticate user, set cookies, redirect by role |
| 2 | POST | `/api/users/register` | `signUp` | `SignUpForm` | Register new user, redirect to `/login` |
| 3 | POST | `/api/auth/send-otp` | `sendOtpAction` | `ForgotPasswordForm` | Send OTP to email for password reset |
| 4 | POST | `/api/auth/verify-otp` | `verifyOtpAction` | `ForgotPasswordForm` | Verify OTP code entered by user |
| 5 | POST | `/api/auth/reset-password` | `resetPasswordAction` | `ForgotPasswordForm` | Reset password using email + OTP + new password |
| 6 | POST | `/api/auth/refresh-token` | `getNewAccessToken` | `middleware (proxy.ts)` | Exchange refresh token for new access token |
| 7 | GET | `/api/users/me` | `getMe` | `Navbar`, `DashboardSidebar`, `ServiceList`, `DashboardLayout` | Get currently authenticated user's profile |
| 8 | GET | `/api/users` | `getAllUsers` | `UsersList` (Admin) | Admin: fetch all registered users |
| 9 | PATCH | `/api/users/:userId` | `updateUserStatusAction` | `UpdateUserButton` (Admin) | Admin: ban or unban a user |
| 10 | DELETE | `/api/users/:userId` | `deleteUserAction` | `DeleteUserButton` (Admin) | Admin: delete a user account |
| 11 | PATCH | `/api/users/my-profile` | `updateMyProfileAction` | `ProfileForm` | Update current user's name, image, or experience |
| 12 | GET | `/api/services` | `getServices` | `ServiceList`, `HomePage` | Fetch public service listings with optional query filters |
| 13 | GET | `/api/services/details/:serviceId` | `getServiceDetails` | `ServiceDetailsPage` (`/services/[slug]`) | Fetch full details of a single service |
| 14 | GET | `/api/services/my-services` | `getMyServicesAction` | `ServicesList` (Technician Dashboard) | Fetch services created by the logged-in technician |
| 15 | POST | `/api/services/create` | `createServiceAction` | `CreateServiceButton` / `ServicesList` | Technician: create a new service |
| 16 | PATCH | `/api/services/:serviceId` | `updateServiceAction` | `EditServiceButton` | Technician: update an existing service |
| 17 | DELETE | `/api/services/:serviceId` | `deleteServiceAction` | `DeleteServiceButton` | Technician: delete a service |
| 18 | GET | `/api/technicians/:technicianId` | `getTechnicianDetails` | `ServiceDetailsPage` | Fetch public technician profile info |
| 19 | GET | `/api/availabilities` | `getAvailabilities` | `BookServiceButton`, `ServiceCard` | Fetch all public availability slots |
| 20 | GET | `/api/availabilities/my` | `getMyAvailabilitiesAction` | `AvailabilityList` (Technician Dashboard) | Fetch the technician's own availability slots |
| 21 | POST | `/api/availabilities/create` | `createAvailabilityAction` | `CreateAvailabilityButton` | Technician: create a new availability slot |
| 22 | GET | `/api/bookings/my-bookings` | `getMyBookings` | `CustomerBookingsList` (Customer Dashboard) | Customer: fetch their own bookings |
| 23 | POST | `/api/bookings/create` | `createBookingAction` | `BookServiceButton` | Customer: create a new booking |
| 24 | PATCH | `/api/bookings/:bookingId/cancel` | `cancelBookingAction` | `CustomerBookingsList` | Customer: cancel a booking |
| 25 | GET | `/api/bookings/my-bookings` | `getTechnicianBookingsAction` | `BookingList` (Technician Dashboard) | Technician: fetch bookings assigned to them |
| 26 | PATCH | `/api/bookings/technician` | `updateBookingStatusAction` | `BookingCard` (Technician Dashboard) | Technician: update booking status (CONFIRMED, COMPLETED, etc.) |
| 27 | GET | `/api/bookings` | `getAllBookingsAction` | `BookingList` (Admin Dashboard) | Admin: fetch all bookings in the system |
| 28 | GET | `/api/categories` | `getAllCategoriesAction` | `CategoryList` (Admin Dashboard) | Fetch all service categories |
| 29 | GET | `/api/categories` | `getCategoriesAction` | `CreateServiceButton` / service forms | Fetch categories for use in service create/edit forms |
| 30 | POST | `/api/categories/create` | `createCategoryAction` | `CreateCategoryButton` | Admin: create a new category |
| 31 | PATCH | `/api/categories/:categoryId` | `updateCategoryAction` | `EditCategoryButton` | Admin: update a category name |
| 32 | DELETE | `/api/categories/:categoryId` | `deleteCategoryAction` | `DeleteCategoryButton` | Admin: delete a category |
| 33 | POST | `/api/payments/checkout` | `createCheckoutSessionAction` | `PaymentCheckoutButton` | Create a Stripe checkout session for a booking |
| 34 | GET | `/api/payments/history` | `getPaymentHistory` | `PaymentHistoryList` | Fetch the user's full payment history |
| 35 | GET | `/api/payments/details/:paymentId` | `getPaymentDetails` | `PaymentDetailsView` | Fetch details for a specific payment |
| 36 | POST | `/api/reviews/create` | `createReviewAction` | `ReviewModal` / `CustomerBookingsList` | Customer: submit a rating and comment for a completed booking |

---

## Grouped by Domain

### Auth — 6 APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | Login with email & password |
| POST | `/api/users/register` | Register new account |
| POST | `/api/auth/send-otp` | Send OTP for password reset |
| POST | `/api/auth/verify-otp` | Verify OTP code |
| POST | `/api/auth/reset-password` | Reset password |
| POST | `/api/auth/refresh-token` | Refresh access token silently |

### Users — 5 APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/users/me` | Get current user profile |
| GET | `/api/users` | Admin: get all users |
| PATCH | `/api/users/:userId` | Admin: ban / unban a user |
| DELETE | `/api/users/:userId` | Admin: delete a user |
| PATCH | `/api/users/my-profile` | Update own profile |

### Services — 6 APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/services` | Get all public services (with filters) |
| GET | `/api/services/details/:serviceId` | Get single service details |
| GET | `/api/services/my-services` | Technician: get own services |
| POST | `/api/services/create` | Technician: create a service |
| PATCH | `/api/services/:serviceId` | Technician: update a service |
| DELETE | `/api/services/:serviceId` | Technician: delete a service |

### Technicians — 1 API
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/technicians/:technicianId` | Get public technician profile |

### Availabilities — 3 APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/availabilities` | Get all availability slots (public) |
| GET | `/api/availabilities/my` | Technician: get own availability slots |
| POST | `/api/availabilities/create` | Technician: create a new availability slot |

### Bookings — 5 APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/bookings/my-bookings` | Customer or Technician: get own bookings |
| POST | `/api/bookings/create` | Customer: create a booking |
| PATCH | `/api/bookings/:bookingId/cancel` | Customer: cancel a booking |
| PATCH | `/api/bookings/technician` | Technician: update booking status |
| GET | `/api/bookings` | Admin: get all bookings |

### Categories — 4 APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories/create` | Admin: create a category |
| PATCH | `/api/categories/:categoryId` | Admin: update a category |
| DELETE | `/api/categories/:categoryId` | Admin: delete a category |

### Payments — 3 APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/payments/checkout` | Create Stripe checkout session |
| GET | `/api/payments/history` | Get user's payment history |
| GET | `/api/payments/details/:paymentId` | Get single payment details |

### Reviews — 1 API
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/reviews/create` | Customer: submit a review for a booking |

---

## Source File Map

| File | APIs |
|------|------|
| `app/(authGroup)/_actions/authActions.ts` | login, register, send-otp, verify-otp, reset-password |
| `service/tokenRevalidation.ts` | refresh-token |
| `service/getMe.ts` | users/me |
| `app/(publicGroup)/_actions/publicActions.ts` | services (list) |
| `app/(publicGroup)/_actions/publicServiceActions.ts` | services/details/:id, technicians/:id |
| `app/(publicGroup)/_actions/bookingActions.ts` | availabilities, bookings/my-bookings, bookings/create, bookings/:id/cancel, reviews/create |
| `app/(dashboardGroup)/_actions/availabilityActions.ts` | availabilities/my, availabilities/create |
| `app/(dashboardGroup)/_actions/bookingActions.ts` | bookings/my-bookings (technician), bookings/technician, bookings (admin) |
| `app/(dashboardGroup)/_actions/categoryActions.ts` | categories (GET), categories/create, categories/:id (PATCH/DELETE) |
| `app/(dashboardGroup)/_actions/paymentActions.ts` | payments/checkout, payments/history, payments/details/:id |
| `app/(dashboardGroup)/_actions/serviceActions.ts` | services/my-services, categories, services/create, services/:id (PATCH/DELETE) |
| `app/(dashboardGroup)/_actions/userActions.ts` | users (admin), users/:id (PATCH/DELETE), users/my-profile |

---

## Architecture Notes

- **All API calls are server-side** — every `fetch()` lives inside a `"use server"` file. There is no client-side fetching, no SWR, no React Query.
- **Auth is dual-header** — protected routes send both `Authorization: Bearer {token}` and `cookie: accessToken=...` headers.
- **Token refresh** — handled transparently in `proxy.ts` (Next.js middleware). When the access token is expired but the refresh token is valid, a new access token is obtained silently and stored as a cookie before the request proceeds.
- **Cache strategy** — read operations use `force-cache` with `next.tags` for ISR-style revalidation. Write/mutate operations are `no-store` or explicitly `revalidateTag()` after success.
- `/api/bookings/my-bookings` is fetched in two separate action files with **different cache strategies**: `force-cache` (customer context) vs `no-store` (technician context).
- `/api/categories` is fetched in both `categoryActions.ts` and `serviceActions.ts` independently.
