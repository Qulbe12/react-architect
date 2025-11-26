# Examples

This directory contains example outputs and usage patterns for React Architect.

## Basic Usage

### Initialize a Project

```bash
# Create a new Vite + React + TypeScript project
npm create vite@latest my-app -- --template react-ts
cd my-app

# Initialize React Architect structure
react-architect init
```

### Generate Components

```bash
# Generate a button component
react-architect g component Button

# Generate a header component
react-architect g component Header

# Generate a card component
react-architect g component Card
```

### Generate Components in Modules

```bash
# Create an auth module first
react-architect g module auth

# Generate components inside the auth module
react-architect g component LoginForm --module auth
react-architect g component RegisterForm --module auth
react-architect g component ForgotPassword --module auth
```

### Generate Services

```bash
# Generate a global auth service
react-architect g service Auth

# Generate a service in a module
react-architect g service User --module auth
```

### Generate Hooks

```bash
# Generate a custom hook
react-architect g hook useAuth

# Generate a hook in a module
react-architect g hook useLogin --module auth
```

## Real-World Example

Here's how you might structure a complete authentication feature:

```bash
# 1. Create the auth module
react-architect g module auth

# 2. Generate components
react-architect g component LoginForm --module auth
react-architect g component RegisterForm --module auth
react-architect g component ProtectedRoute --module auth

# 3. Generate services
react-architect g service Auth --module auth
react-architect g service Token --module auth

# 4. Generate hooks
react-architect g hook useAuth --module auth
react-architect g hook useUser --module auth
```

## E-commerce Example

```bash
# Create product module
react-architect g module products

# Components
react-architect g component ProductCard --module products
react-architect g component ProductList --module products
react-architect g component ProductDetail --module products

# Services
react-architect g service Product --module products
react-architect g service Cart --module products

# Hooks
react-architect g hook useProducts --module products
react-architect g hook useCart --module products

# Create cart module
react-architect g module cart

# Components
react-architect g component CartItem --module cart
react-architect g component CartSummary --module cart
react-architect g component Checkout --module cart
```

## Dashboard Example

```bash
# Core components
react-architect g component Sidebar
react-architect g component Navbar
react-architect g component Dashboard

# Analytics module
react-architect g module analytics
react-architect g component Chart --module analytics
react-architect g component StatsCard --module analytics
react-architect g service Analytics --module analytics
react-architect g hook useAnalytics --module analytics

# Users module
react-architect g module users
react-architect g component UserTable --module users
react-architect g component UserProfile --module users
react-architect g service User --module users
```

## Resulting Structure

After running the above commands, your project structure would look like:

```
src/
├── core/
│   ├── services/
│   │   └── AuthService.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   └── context/
├── components/
│   ├── Button/
│   ├── Header/
│   ├── Sidebar/
│   └── Navbar/
├── shared/
│   ├── ui/
│   └── utils/
└── modules/
    ├── auth/
    │   ├── components/
    │   │   ├── LoginForm/
    │   │   ├── RegisterForm/
    │   │   └── ProtectedRoute/
    │   ├── services/
    │   │   ├── AuthService.ts
    │   │   └── TokenService.ts
    │   ├── hooks/
    │   │   ├── useAuth.ts
    │   │   └── useUser.ts
    │   └── index.ts
    ├── products/
    │   └── ...
    └── cart/
        └── ...
```

## Tips

1. **Always run `init` first** to set up the folder structure
2. **Create modules for features** to keep code organized
3. **Use shared/ui for reusable components** like buttons, inputs
4. **Use core for global services** that are used across modules
5. **Keep components small** and focused on one responsibility
