# Installation & Setup Guide 📦

Complete installation guide for React Architect.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Verification](#verification)
4. [Getting Started](#getting-started)
5. [Troubleshooting](#troubleshooting)
6. [Uninstallation](#uninstallation)

---

## Prerequisites

### Required
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)

Check your versions:
```bash
node --version
npm --version
```

### Recommended
- A Vite + React + TypeScript project
- Terminal with shell (bash, zsh, fish)
- Code editor (VS Code recommended)

---

## Installation Methods

### Method 1: Global Installation (Recommended)

Install globally to use anywhere on your system:

```bash
npm install -g react-architect
```

Verify installation:
```bash
react-architect --version
```

### Method 2: Use with npx (No Installation)

Run without installing:

```bash
npx react-architect init
npx react-architect g component Button
```

**Pros**: No global installation needed  
**Cons**: Slower (downloads each time)

### Method 3: Project-Level Installation

Install as a dev dependency in your project:

```bash
npm install --save-dev react-architect
```

Use with npm scripts:
```json
{
  "scripts": {
    "architect": "react-architect"
  }
}
```

Then run:
```bash
npm run architect init
npm run architect g component Button
```

### Method 4: From Source (Development)

For contributing or testing unreleased versions:

```bash
# Clone the repository
git clone https://github.com/yourusername/react-architect.git
cd react-architect

# Install dependencies
npm install

# Link globally
npm link

# Test
react-architect --version
```

---

## Verification

### Check Installation

```bash
# Check version
react-architect --version
# Expected output: 1.0.0

# Check help
react-architect --help
# Should show command list

# Check location
which react-architect
# Shows installation path
```

### Quick Test

```bash
# Create test directory
mkdir test-project
cd test-project

# Initialize structure
react-architect init

# Generate a component
react-architect g component TestButton

# Verify files created
ls -R src/
```

---

## Getting Started

### Step 1: Create or Navigate to Project

**Option A: New Vite Project**
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

**Option B: Existing Project**
```bash
cd your-existing-project
```

### Step 2: Initialize Structure

```bash
react-architect init
```

This creates:
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

### Step 3: Generate Your First Component

```bash
react-architect g component Button
```

### Step 4: Use the Component

Edit `src/App.tsx`:
```tsx
import { Button } from './components/Button';

function App() {
  return <Button>Click Me!</Button>;
}

export default App;
```

### Step 5: Run Your Project

```bash
npm run dev
```

---

## Troubleshooting

### Issue: Command not found

**Error**: `react-architect: command not found`

**Solutions**:

1. **Check if installed globally**:
   ```bash
   npm list -g react-architect
   ```

2. **Reinstall**:
   ```bash
   npm uninstall -g react-architect
   npm install -g react-architect
   ```

3. **Check npm global bin path**:
   ```bash
   npm config get prefix
   ```
   
   Ensure this path is in your `$PATH`:
   ```bash
   echo $PATH
   ```

4. **Add to PATH** (if needed):
   ```bash
   # For bash
   echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   
   # For zsh
   echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

### Issue: Permission denied

**Error**: `EACCES: permission denied`

**Solutions**:

1. **Use sudo** (not recommended):
   ```bash
   sudo npm install -g react-architect
   ```

2. **Fix npm permissions** (recommended):
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
   source ~/.profile
   npm install -g react-architect
   ```

### Issue: Module not found

**Error**: `Cannot find module 'handlebars'`

**Solution**: Dependencies missing, reinstall:
```bash
npm uninstall -g react-architect
npm cache clean --force
npm install -g react-architect
```

### Issue: Windows path issues

**Error**: Path separator issues on Windows

**Solution**: Use PowerShell or Git Bash, ensure Node.js is in PATH

### Issue: Template not found

**Error**: `Template file not found`

**Solution**: Ensure you're using the latest version:
```bash
npm update -g react-architect
```

### Issue: Syntax errors in generated files

**Solution**: Check your Node.js version:
```bash
node --version
```
Upgrade if below v14:
```bash
# Using nvm
nvm install 18
nvm use 18
```

---

## Uninstallation

### Global Uninstall

```bash
npm uninstall -g react-architect
```

Verify removal:
```bash
react-architect --version
# Should show: command not found
```

### Project-Level Uninstall

```bash
npm uninstall react-architect
```

### Clean Up Global Packages

```bash
# List all global packages
npm list -g --depth=0

# Clean npm cache
npm cache clean --force
```

---

## Platform-Specific Notes

### macOS

- Use terminal (bash/zsh)
- May need to restart terminal after installation
- Check PATH in `~/.zshrc` or `~/.bash_profile`

### Linux

- Use terminal (bash/zsh/fish)
- May need sudo for global install
- Check PATH in `~/.bashrc` or `~/.zshrc`

### Windows

- Use PowerShell, CMD, or Git Bash
- May need to run as Administrator
- Add to PATH in System Environment Variables

---

## Updating

### Update Global Installation

```bash
npm update -g react-architect
```

### Check for Updates

```bash
npm outdated -g react-architect
```

### Install Specific Version

```bash
npm install -g react-architect@1.0.0
```

---

## Multiple Versions

### Using nvm (Node Version Manager)

```bash
# Install different Node versions
nvm install 18
nvm install 20

# Switch versions
nvm use 18
react-architect --version

nvm use 20
react-architect --version
```

---

## IDE Integration

### VS Code

Add to `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Generate Component",
      "type": "shell",
      "command": "react-architect g component ${input:componentName}"
    }
  ],
  "inputs": [
    {
      "id": "componentName",
      "type": "promptString",
      "description": "Component name"
    }
  ]
}
```

### Package.json Scripts

Add convenient shortcuts:
```json
{
  "scripts": {
    "architect": "react-architect",
    "component": "react-architect g component",
    "module": "react-architect g module",
    "service": "react-architect g service",
    "hook": "react-architect g hook"
  }
}
```

Usage:
```bash
npm run component Button
npm run service Auth
npm run hook useAuth
```

---

## Getting Help

### Documentation
- [README.md](README.md) - Full documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [EXAMPLES.md](EXAMPLES.md) - Usage examples

### Support
- [GitHub Issues](https://github.com/yourusername/react-architect/issues)
- [GitHub Discussions](https://github.com/yourusername/react-architect/discussions)

### Community
- Star the repo on GitHub
- Share your experience
- Contribute improvements

---

## Next Steps

After successful installation:

1. ✅ Read the [Quick Start Guide](QUICKSTART.md)
2. ✅ Check out [Examples](EXAMPLES.md)
3. ✅ Start building your project
4. ✅ Share feedback and contribute

---

**Happy coding!** 🚀
