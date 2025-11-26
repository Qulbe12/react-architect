# React Architect 🏗️

<p align="center">
  <strong>A powerful CLI scaffolding tool for React + TypeScript applications</strong>
</p>

<p align="center">
  Generate opinionated folder structures and component templates with Angular-style architecture for Vite + React + TypeScript projects.
</p>

---

## 🎯 Features

- **🚀 Quick Scaffolding**: Initialize a complete project structure in seconds
- **📦 Angular-Style Architecture**: Organized modules, services, and components
- **🎨 Component Generation**: Auto-generate components with TypeScript, SCSS modules, and type definitions
- **🔧 Service Layer**: Class-based singleton services for business logic
- **🪝 Custom Hooks**: Generate custom React hooks with boilerplate
- **📁 Module System**: Organize features into self-contained modules
- **⚡ TypeScript First**: Full TypeScript support out of the box
- **🎯 Opinionated Structure**: Best practices baked in

---

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g react-architect
```

### Local Development

```bash
npx react-architect init
```

---

## 🚀 Quick Start

### 1. Initialize Project Structure

```bash
react-architect init
```

This creates the following folder structure:

```
src/
├── core/
│   ├── services/
│   ├── hooks/
│   └── context/
├── components/
├── shared/
│   ├── ui/
│   └── utils/
└── modules/
```

### 2. Generate Components

```bash
# Generate a component in src/components
react-architect generate component Button

# Or use the shorthand
react-architect g component Button
```

This creates:

```
src/components/Button/
├── Button.tsx
├── Button.module.scss
├── Button.types.ts
└── index.ts
```

### 3. Generate Components in Modules

```bash
# Generate a component inside a specific module
react-architect g component LoginForm --module auth
```

This creates:

```
src/modules/auth/components/LoginForm/
├── LoginForm.tsx
├── LoginForm.module.scss
├── LoginForm.types.ts
└── index.ts
```

---

## 📚 Commands

### `init`

Initialize the recommended folder structure.

```bash
react-architect init
```

### `generate` (alias: `g`)

Generate components, modules, services, or hooks.

```bash
react-architect generate <type> <name> [options]
```

**Types:**
- `component` - React component with styles and types
- `module` - Feature module with folder structure
- `service` - Singleton service class
- `hook` - Custom React hook

**Options:**
- `-m, --module <moduleName>` - Generate inside a specific module

---

## 🎨 Examples

### Generate a Component

```bash
react-architect g component Header
```

Output:
```tsx
// Header.tsx
import React from 'react';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.types';

export const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.header} ${className}`}>
      <h2>Header Component</h2>
      {children}
    </div>
  );
};
```

### Generate a Service

```bash
react-architect g service Auth
```

Output:
```typescript
// AuthService.ts
class AuthService {
  private static instance: AuthService;
  
  private constructor() {
    this.initialize();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // ... methods
}

export const authService = AuthService.getInstance();
```

### Generate a Hook

```bash
react-architect g hook useAuth
```

Output:
```typescript
// useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // ... hook logic

  return { data, loading, error };
};
```

### Generate a Module

```bash
react-architect g module auth
```

Output:
```
src/modules/auth/
├── components/
├── services/
├── hooks/
└── index.ts
```

### Generate Component Inside Module

```bash
react-architect g component LoginForm --module auth
```

---

## 🏗️ Architecture

React Architect enforces a clean, scalable architecture:

### **Core**
Global services, hooks, and context that are used across the entire application.

### **Components**
Reusable components that aren't tied to a specific feature.

### **Shared**
- **ui/**: Common UI components (buttons, inputs, modals)
- **utils/**: Helper functions and utilities

### **Modules**
Feature-based modules containing:
- **components/**: Feature-specific components
- **services/**: Business logic and API calls
- **hooks/**: Feature-specific custom hooks

---

## 📂 File Structure

### Component Structure

Each component gets:
- **`ComponentName.tsx`** - React component
- **`ComponentName.module.scss`** - Scoped styles
- **`ComponentName.types.ts`** - TypeScript interfaces
- **`index.ts`** - Clean exports

### Module Structure

```
src/modules/feature-name/
├── components/          # Feature components
├── services/           # Feature services
├── hooks/              # Feature hooks
└── index.ts            # Module exports
```

---

## 🛠️ Development

### Local Testing

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-architect.git
cd react-architect
```

2. Install dependencies:
```bash
npm install
```

3. Link the package locally:
```bash
npm link
```

4. Test the CLI:
```bash
react-architect --help
```

5. Unlink when done:
```bash
npm unlink -g react-architect
```

---

## 📤 Publishing to NPM

### First-Time Setup

1. Create an NPM account at [npmjs.com](https://www.npmjs.com/)

2. Login to NPM:
```bash
npm login
```

### Publishing

1. Update version in `package.json`:
```bash
npm version patch  # or minor, or major
```

2. Publish to NPM:
```bash
npm publish
```

### Version Management

- **Patch** (`1.0.0` → `1.0.1`): Bug fixes
```bash
npm version patch
```

- **Minor** (`1.0.0` → `1.1.0`): New features
```bash
npm version minor
```

- **Major** (`1.0.0` → `2.0.0`): Breaking changes
```bash
npm version major
```

### Update Package

```bash
npm version patch
npm publish
```

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **Interactive Mode**: CLI prompts for configuration
- [ ] **Config File**: `.reactarchitectrc` for project-specific settings
- [ ] **Storybook Integration**: Auto-generate Storybook stories
- [ ] **JavaScript Support**: Generate JS files instead of TS
- [ ] **Testing Templates**: Auto-generate test files
- [ ] **Custom Templates**: User-defined template support
- [ ] **Context Generation**: Generate React context providers
- [ ] **API Client Generator**: Generate API service boilerplate
- [ ] **Route Generation**: Auto-generate route configurations
- [ ] **Form Generation**: Generate form components with validation

### Community Ideas

- Support for other styling solutions (Styled Components, Tailwind)
- Redux/Zustand slice generators
- GraphQL query generators
- Docker configuration
- CI/CD pipeline templates

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by Angular CLI
- Built for the React community
- Powered by Node.js, Commander, and Handlebars

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/react-architect/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/react-architect/discussions)

---

<p align="center">
  Made with ❤️ for the React community
</p>

<p align="center">
  <strong>⭐ Star this repo if you find it helpful!</strong>
</p>
