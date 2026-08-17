# API Integration

| Frontend Component | Method | Backend Endpoint | Purpose |
|---|---|---|---|
| LoginForm | POST | /api/auth/login | User login |
| SignUpForm | POST | /api/auth/register | User registration |
| ForgotPassword | POST | /api/auth/send-otp | Send OTP |
| ResetPassword | POST | /api/auth/reset-password | Reset password |
| Services | GET | /api/services | Get services |
| BookingForm | POST | /api/bookings | Create booking |
| CheckoutButton | POST | /api/payments/checkout | Create Stripe checkout |