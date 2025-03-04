# Gym Management System - Frontend

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Overview

Modern frontend for a gym management system featuring role-based access control (Admin/User), membership management, and user dashboard functionality.

## Key Features

- **Role-Based Authentication**
  - JWT token management with refresh tokens
  - Protected routes for admin/user roles
  - Login/Signup flows with form validation
- **Dashboard Interfaces**
  - Admin: User management, system monitoring
  - User: Membership tracking, profile management
- **Component Library**
  - Custom UI components built with Shadcn/ui
  - Responsive layouts using Tailwind CSS
- **API Integration**
  - Axios-based API client with interceptors
  - React Query hooks for data fetching

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite 4
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Context API
- **Routing**: React Router 6
- **UI Library**: Shadcn/ui components
- **Testing**: Vitest, React Testing Library

## Project Structure

```bash
src/
├── api/              # Axios configuration and API clients
├── assets/           # Static assets (images, videos)
├── components/       # Reusable components
│   ├── Admin/        # Admin-specific components
│   ├── Auth/         # Authentication components
│   └── custom-ui/    # Customized Shadcn/ui components
├── context/          # React context providers
├── hooks/            # Custom hooks
│   └── api/          # API query hooks
├── pages/            # Page components
│   ├── Admin/        # Admin pages
│   ├── Auth/         # Authentication pages
│   └── User/         # User pages
├── AppRoutes/        # Route configuration
└── styles/           # Global CSS styles
```

## Setup & Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AUTH_TOKEN_KEY=gym-system-auth
VITE_REFRESH_TOKEN_KEY=gym-system-refresh
```

## API Usage Example

```tsx
// Using authentication hook
const { mutate: login } = useLogin({
  onSuccess: (data) => {
    setAuth(data.accessToken);
    navigate("/dashboard");
  },
  onError: (error) => {
    toast.error(error.response?.data.message);
  },
});

// Using API query hook
const { data: memberships } = useGetAllMemberships();
```

## Authentication Flow

1. User submits credentials
2. Server returns access/refresh tokens
3. Tokens stored in secure HTTP-only cookies
4. Axios interceptor attaches access token to requests
5. 401 errors trigger automatic token refresh
6. Failed refresh logs user out

## Testing

Run unit tests:

```bash
npm test
```

Run component tests:

```bash
npm run test:components
```

## Deployment

Production-ready build:

```bash
npm run build && npm run preview
```

## Contributing

1. Create feature branch
2. Follow TypeScript style guidelines
3. Write tests for new features
4. Update documentation
5. Submit PR for review

## License

MIT License
