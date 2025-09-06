# Project Haribon

A modern web application built with Next.js, Convex, and Clerk, deployed on Cloudflare.

## Tech Stack

### Frontend

- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **Sonner** - Toast notifications
- **Zustand** - State management

### Backend

- **Convex** - Backend-as-a-service with real-time database
- **Cloudflare Workers** - Serverless deployment platform
- **R2** - Object storage for files
- **Svix** - Webhook handling

## Conventions and Best Practices

### Frontend Conventions

1. **Feature-Based Architecture**
   - Organize code by domain in `src/features/`
   - Each feature can contain its own components, hooks, and utilities

2. **Component Structure**
   - UI components in `src/components/ui/`
   - Providers in `src/components/providers/`
   - Follow shadcn/ui patterns for component design

3. **File Naming**
   - Use kebab-case for file names (e.g., `user-profile.tsx`)
   - Use PascalCase for component names (e.g., `UserProfile`)

4. **State Management**
   - Use Zustand for global state management
   - Store definitions in `src/stores/`

5. **Styling**
   - Use Tailwind CSS for styling
   - Follow mobile-first, responsive design principles

### Backend Conventions (Convex)

1. **File Organization**
   - Organize by domain (users, files, etc.)
   - Separate mutations, queries, and models

2. **Function Structure**
   - Export handlers and args separately for reusability
   - Use proper validators for all arguments

3. **Database Schema**
   - Define tables in domain-specific model files
   - Import and combine in main schema.ts

4. **Authentication**
   - Use Clerk for authentication
   - Protect routes with middleware
   - Verify user identity in Convex functions

5. **File Storage**
   - Use R2 for file storage
   - Handle file uploads and deletions securely

## Installation and Setup

### Prerequisites

- Node.js 22.16.x (recommended: use nvm)
- Bun package manager
- Clerk account
- Convex account
- Cloudflare account (for deployment)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain

# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment_or_dev_if_local
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/project-haribon.git
cd project-haribon
```

2. Install dependencies

```bash
bun install
```

3. Start the development server

```bash
bun dev
```

This will concurrently start the Next.js dev server with Turbopack and the Convex development server.

### Development Workflow

1. Make changes to the frontend code in `/src`
2. Make changes to the backend code in `/convex`
3. Test your changes locally
4. Deploy to Cloudflare using the deployment commands

### Deployment

Deploy to Cloudflare:

```bash
# Build and deploy
bun run deploy

# Build only
bun run build:prod

# Deploy Convex and build
bun run build:deploy

# Preview locally
bun run preview
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
