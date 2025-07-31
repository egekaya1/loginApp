# Next.js Authentication & Access Control

## Overview

This project implements a simple user authentication system in a Next.js application. It demonstrates role-based access control by restricting certain routes and UI elements based on the user's role (`admin` vs regular user).

The authentication backend is implemented as a Next.js **serverless API route** (`/api/login`) that validates credentials by calling an external API. User role data is saved in a Redux store and persisted across sessions using `localStorage`.

---

## Features

- **Login page (`/login`)**: Users submit email and password.
- **API Route (`/api/login`)**: Authenticates user by checking credentials from external API endpoint (`https://f5q80hfi91.execute-api.eu-south-1.amazonaws.com/prod/get_users`).
- **Role-based Access Control**:
  - Users with `admin` role can access protected `/admin` route.
  - Regular users are redirected away from `/admin`.
- **Conditional Navigation**: Navbar shows or hides the `/admin` link depending on the logged-in user's role.
- **State Management**: Uses Redux Toolkit slice (`authSlice`) to manage authentication state.
- **Persistence**: Authentication state is saved in `localStorage` to maintain login status across page reloads.
- **Logout functionality** to clear authentication state and local storage.

---

## Technologies Used

- [Next.js](https://nextjs.org/) (React framework with serverless API routes)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- React Hooks (`useState`, `useEffect`, `useDispatch`, `useSelector`)
- CSS with Tailwind for styling (optional)
- Fetch API for backend communication

---

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- npm package manager
- Git

### Installation

1. Clone the repository.

2. Install dependencies:

npm install

3. Run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## How It Works

1. **Login flow**:

   * User submits email and password on `/login`.
   * Client sends a POST request to `/api/login` serverless API route.
   * The API route pulls the credentials from the external API endpoint.
   * If credentials are valid, frontend dispatches `loginSuccess` action to update Redux state and save role in `localStorage`.

2. **Access Control**:

   * On each page load, Redux state is hydrated from `localStorage`.
   * Navbar checks Redux state and conditionally renders the "Admin" link.
   * `/admin` page checks if the logged-in user has the `admin` role; if not, redirects to `/`.

3. **Logout**:

   * Clears auth state in Redux and removes role from `localStorage`.
   * Redirects user to the homepage or login page.

---

## Authentication Data

The external API expects a JSON body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

and returns user data including the `role`, e.g.:

```json
{
  "role": "admin"
}
```

---

## License

This project is open source and available under the MIT License.

---
