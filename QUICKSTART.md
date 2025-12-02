# Quick Start Guide 🚀

Get started with React Architect in 5 minutes!

## Step 1: Create a New Vite Project

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
```

## Step 2: Install React Architect

### Option A: Global Installation
```bash
npm install -g react-architect
```

### Option B: Use with npx
```bash
npx react-architect init
```

## Step 3: Initialize Structure

```bash
react-architect init
```

This creates:
```
src/
├── core/          # Global services, hooks, context
├── components/    # Reusable components
├── shared/        # Shared UI and utils
└── modules/       # Feature modules
```

## Step 4: Generate Your First Component

```bash
react-architect g component Button
```

Output:
```
src/components/Button/
├── Button.tsx              # Component file
├── Button.module.scss      # Styles
├── Button.types.ts         # TypeScript types
└── index.ts                # Clean exports
```

## Step 5: Use Your Component

Edit `src/App.tsx`:

```tsx
import { Button } from './components/Button';

function App() {
  return (
    <div className="App">
      <Button>Click Me!</Button>
    </div>
  );
}

export default App;
```

## Step 6: Generate a Feature Module

```bash
# Create auth module
react-architect g module auth

# Add components to it
react-architect g component LoginForm --module auth
react-architect g service Auth --module auth
react-architect g hook useAuth --module auth
```

**Or use the cleaner module command:**

```bash
# Create module
react-architect g module auth

# Add items with cleaner syntax
react-architect m auth component LoginForm
react-architect m auth service Auth
react-architect m auth hook useAuth
```

## Step 7: Run Your App

```bash
npm run dev
```

## Common Commands Cheat Sheet

```bash
# Initialize structure
react-architect init

# Generate component
react-architect g component MyComponent

# Generate component in module
react-architect g component MyComponent --module auth
react-architect m auth component MyComponent  # NEW cleaner syntax!

# Generate service
react-architect g service MyService

# Generate service in module
react-architect m auth service Auth

# Generate hook
react-architect g hook useMyHook

# Generate hook in module
react-architect m auth hook useAuth

# Generate module
react-architect g module myModule

# List all modules
react-architect ls

# Show help
react-architect --help

# Show version
react-architect --version
```

## Project Organization Tips

### ✅ DO
- Use `core/` for global services (AuthService, ApiService)
- Use `shared/ui` for reusable UI components (Button, Input)
- Use `modules/` for feature-specific code
- Keep components small and focused
- Export through index.ts files

### ❌ DON'T
- Mix feature code with shared components
- Create deeply nested folder structures
- Put everything in components/
- Duplicate code across modules

## Next Steps

1. **Customize Templates**: Check the `/templates` folder
2. **Add Styling**: Update `.module.scss` files
3. **Add Logic**: Implement services and hooks
4. **Build Features**: Create modules for each feature
5. **Deploy**: Build and ship your app!

## Need Help?

- 📖 [Full Documentation](README.md)
- 💡 [Examples](EXAMPLES.md)
- 🤝 [Contributing](CONTRIBUTING.md)
- 🐛 [Report Issues](https://github.com/yourusername/react-architect/issues)

Happy coding! 🎉
