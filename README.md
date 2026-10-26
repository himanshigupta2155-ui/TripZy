# TripZy 🚗
### A Full-Stack Ride-Sharing Application

## 1. Overview

TripZy is a full-stack ride-sharing web application that connects people offering rides with people looking for rides. Drivers can publish available rides, while passengers can browse rides and submit booking requests. Drivers can accept or reject requests, and passengers can manage their bookings.

The application aims to make ride coordination easier through a simple interface and a structured booking workflow.

## 2. Problem Statement

People travelling to similar destinations may find it difficult to coordinate rides and manage available seats. TripZy provides a platform where drivers can share ride details and passengers can request seats, while both sides can track booking status.

## 3. Key Features

### User Authentication
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- HTTP-only cookies for authentication tokens.
- Protected backend routes.

### Ride Management
- Create rides with source, destination, date, departure time, available seats, and price per seat.
- Browse available rides.
- View ride details.
- Update or cancel rides through the ride-management endpoints.

### Booking Management
- Request seats on a ride.
- Validate seat availability.
- Prevent drivers from booking their own rides.
- Prevent duplicate pending booking requests for the same ride.
- Track booking statuses: pending, accepted, rejected, and cancelled.
- Cancel bookings and restore seats when an accepted booking is cancelled.

### Driver Requests
- View booking requests for rides owned by the logged-in driver.
- Accept or reject pending requests.
- Decrease available seats when a booking is accepted.
- Prevent unauthorized users from managing another driver's requests.

### User Interface
- Home page.
- Registration and login pages.
- Available rides page.
- Create ride page.
- My Bookings page.
- Driver Requests page.

## 4. Technology Stack

**Frontend**
- React
- Vite
- React Router
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- cookie-parser

## 5. Architecture

TripZy follows a client-server architecture.

1. The React frontend provides the user interface.
2. Axios sends HTTP requests to the Express backend.
3. Authentication middleware verifies the JWT stored in the HTTP-only cookie.
4. Controllers handle application logic and validation.
5. Mongoose models interact with MongoDB to store and retrieve users, rides, and bookings.
6. The backend returns JSON responses to the frontend.

### Main Data Models

**User**
- Name
- Email
- Hashed password

**Ride**
- Driver reference
- Source and destination
- Date and departure time
- Available seats
- Price per seat
- Ride status

**Booking**
- Passenger reference
- Ride reference
- Number of seats booked
- Booking status

## 6. Project Structure

The project is organized into frontend and backend applications.

```text
TripZy/
├── Backend/
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Ride.model.js
│   │   └── Booking.model.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── Frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── App.jsx
    └── package.json
```

## 7. Getting Started

### Prerequisites

Install the following:
- Node.js and npm
- MongoDB Atlas account or a MongoDB instance
- Git

### Backend Setup

1. Open a terminal in the `Backend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:

   ```env
   dbUrl=your_mongodb_connection_string
   jwt_secret=your_secret_key
   ```

4. Start the backend using the development script configured in `package.json`, for example:

   ```bash
   npm run dev
   ```

The backend currently uses port `8008`.

### Frontend Setup

1. Open another terminal in the frontend directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server using the script configured in `package.json`, commonly:

   ```bash
   npm run dev
   ```

4. Open the local URL displayed by Vite, typically `http://localhost:5173`.

Ensure the frontend Axios configuration points to the backend at `http://localhost:8008/` and sends credentials with requests.

## 8. API Endpoints

The following endpoints are based on the implemented routes. Authentication is required for protected endpoints.

### User Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/users/register` | Register a user |
| POST | `/users/login` | Log in |
| GET | `/users/me` | Get the authenticated user |
| POST | `/users/logout` | Log out, if implemented |

### Ride Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/rides/create` | Create a ride |
| GET | `/rides/getAll` | Browse rides |
| GET | `/rides/get/:rideId` | Get a ride by ID |
| PATCH | `/rides/update/:rideId` | Update a ride |
| PATCH | `/rides/:rideId/cancel` | Cancel a ride |

### Booking Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/bookings/create` | Create a booking request |
| GET | `/bookings/get` | Get the passenger's bookings |
| GET | `/bookings/driver-requests` | Get requests for the driver's rides |
| PATCH | `/bookings/:bookingId/accept` | Accept a booking |
| PATCH | `/bookings/:bookingId/reject` | Reject a booking |
| PATCH | `/bookings/:bookingId/cancel` | Cancel a booking |

## 9. Booking Workflow

1. A driver creates a ride with the required details.
2. A passenger browses available rides and requests seats.
3. The booking is created with `pending` status.
4. The driver reviews the request and accepts or rejects it.
5. On acceptance, available seats are reduced.
6. If the passenger cancels an accepted booking, those seats are restored.

## 10. Security and Validation

The application includes:
- Password hashing with bcrypt.
- JWT authentication.
- HTTP-only authentication cookies.
- Protected routes.
- Ownership checks for booking actions.
- Input validation for booking requests.
- Checks for ride availability and seat limits.
- Appropriate HTTP status codes for common errors.

## 11. Environment Variables

Keep credentials and secrets in the backend `.env` file. Never commit the actual `.env` file to a public repository.

Add `.env` and other sensitive files to `.gitignore`. Use a strong JWT secret and configure the database connection securely.

## 12. Future Improvements

Possible future improvements include:
- Search and filtering by route and travel date.
- Passenger and driver profile management.
- Booking notifications.
- Improved validation and error messages.
- Automated tests for API endpoints.
- Deployment and production configuration.

## 13. Project Status

TripZy has a working foundation for its core ride-sharing and booking workflows. The application has been tested manually for important flows, including booking creation, driver acceptance and rejection, and seat restoration after cancellation.

Deployment, automated testing, and additional edge-case verification should be documented as completed only after they have been verified.

## 14. Author

Developed as a full-stack software project.

**Project:** TripZy — Ride-Sharing Application
