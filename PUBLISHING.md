# Publishing Guide 📦

Complete guide to publishing React Architect to NPM.

## Prerequisites

1. **NPM Account**
   - Create account at [npmjs.com](https://www.npmjs.com/signup)
   - Verify your email address

2. **Login to NPM**
   ```bash
   npm login
   ```
   Enter your:
   - Username
   - Password
   - Email
   - OTP (if 2FA enabled)

## First-Time Setup

### 1. Check Package Name Availability

```bash
npm search react-architect
```

If taken, update `name` in `package.json`:
```json
{
  "name": "@yourusername/react-architect",
  "version": "1.0.0",
  ...
}
```

### 2. Update package.json

Ensure these fields are correct:
```json
{
  "name": "react-architect",
  "version": "1.0.0",
  "description": "A CLI scaffolding tool...",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-architect.git"
  },
  "keywords": [
    "react",
    "cli",
    "scaffold",
    "generator",
    "vite",
    "typescript"
  ]
}
```

### 3. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: React Architect v1.0.0"
git branch -M main
git remote add origin https://github.com/yourusername/react-architect.git
git push -u origin main
```

## Publishing Steps

### 1. Test Locally

```bash
# Link package locally
npm link

# Test in a new directory
cd /tmp
mkdir test-app
cd test-app
react-architect init
react-architect g component Test

# Unlink when done
npm unlink -g react-architect
```

### 2. Version Your Package

Choose the appropriate version bump:

**Patch** (1.0.0 → 1.0.1) - Bug fixes
```bash
npm version patch
```

**Minor** (1.0.0 → 1.1.0) - New features
```bash
npm version minor
```

**Major** (1.0.0 → 2.0.0) - Breaking changes
```bash
npm version major
```

This automatically:
- Updates version in package.json
- Creates a git commit
- Creates a git tag

### 3. Publish to NPM

```bash
npm publish
```

For scoped packages:
```bash
npm publish --access public
```

### 4. Push to GitHub

```bash
git push && git push --tags
```

### 5. Verify Publication

```bash
# Search for your package
npm search react-architect

# View package page
npm view react-architect

# Install and test
npm install -g react-architect
react-architect --version
```

## Updating Your Package

When you make changes:

```bash
# 1. Make your changes
# Edit files...

# 2. Test locally
npm link
# Test the CLI...
npm unlink -g react-architect

# 3. Update version
npm version patch  # or minor/major

# 4. Publish
npm publish

# 5. Push to GitHub
git push && git push --tags

# 6. Update CHANGELOG.md
# Document your changes
```

## Version Management

### Semantic Versioning

- **MAJOR** (X.0.0): Breaking changes
  - Changing CLI command structure
  - Removing features
  - Changing default behavior

- **MINOR** (0.X.0): New features
  - Adding new generators
  - Adding new flags
  - New template options

- **PATCH** (0.0.X): Bug fixes
  - Fixing bugs
  - Documentation updates
  - Performance improvements

### Version Commands

```bash
# Bump patch version
npm version patch -m "Fix: resolve Windows path issue"

# Bump minor version
npm version minor -m "Feat: add interactive mode"

# Bump major version
npm version major -m "Breaking: change CLI structure"

# Specific version
npm version 2.1.3
```

## Best Practices

### Before Publishing

- [ ] Test all commands locally
- [ ] Update README.md
- [ ] Update CHANGELOG.md
- [ ] Run `npm link` and test in real project
- [ ] Check package.json fields
- [ ] Commit all changes
- [ ] Create GitHub release

### Package.json Checklist

- [ ] Correct package name
- [ ] Proper version number
- [ ] Clear description
- [ ] Keywords for discoverability
- [ ] Author information
- [ ] Repository URL
- [ ] License specified
- [ ] Correct bin path
- [ ] Files array includes all needed files

### Files to Include

The `files` array in package.json controls what's published:

```json
"files": [
  "bin",
  "lib",
  "templates",
  "README.md",
  "LICENSE"
]
```

These are automatically included:
- package.json
- README.md
- LICENSE

These are always excluded:
- node_modules/
- .git/
- .DS_Store

## Unpublishing

⚠️ **Warning**: Only unpublish within 72 hours of publishing

```bash
# Unpublish specific version
npm unpublish react-architect@1.0.0

# Unpublish entire package (use with caution!)
npm unpublish react-architect --force
```

## Creating Releases on GitHub

After publishing:

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Choose the version tag (v1.0.0)
4. Add release title: "v1.0.0 - Initial Release"
5. Add release notes from CHANGELOG.md
6. Publish release

## NPM Package Page

Your package will be available at:
```
https://www.npmjs.com/package/react-architect
```

Features:
- Installation instructions
- README display
- Version history
- Download statistics
- Dependencies

## Monitoring Your Package

### Check Downloads

```bash
npm view react-architect
```

### Package Statistics

- [npm-stat.com](https://npm-stat.com/)
- [npmcharts.com](https://npmcharts.com/)

### Set Up Badges

Add to README.md:

```markdown
![npm version](https://img.shields.io/npm/v/react-architect)
![npm downloads](https://img.shields.io/npm/dm/react-architect)
![license](https://img.shields.io/npm/l/react-architect)
```

## Troubleshooting

### "Package name already exists"

Solution: Use a scoped package name
```json
{
  "name": "@yourusername/react-architect"
}
```

### "You must be logged in"

Solution:
```bash
npm logout
npm login
```

### "402 Payment Required"

Solution: You need a paid account for private packages, or:
```bash
npm publish --access public
```

### "You do not have permission"

Solution: Check you're logged in with correct account
```bash
npm whoami
```

## Post-Publication

1. **Announce**: Share on Twitter, Reddit, Dev.to
2. **Documentation**: Keep README updated
3. **Support**: Respond to issues quickly
4. **Iterate**: Listen to feedback and improve

## Quick Reference

```bash
# One-time setup
npm login

# Before each release
git add .
git commit -m "Prepare v1.x.x"
npm version patch
npm publish
git push && git push --tags

# Check status
npm view react-architect
npm whoami
```

## Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Package.json Fields](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

---

Good luck with your package! 🚀
