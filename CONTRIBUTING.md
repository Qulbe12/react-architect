# Contributing to React Architect

Thank you for your interest in contributing to React Architect! 🎉

## Getting Started

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-architect.git
   cd react-architect
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Link the package for local testing**
   ```bash
   npm link
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Testing Your Changes

1. Make your changes in the codebase
2. Test the CLI locally:
   ```bash
   react-architect --help
   react-architect init
   react-architect g component Test
   ```

3. Create a test project to verify:
   ```bash
   mkdir test-project
   cd test-project
   react-architect init
   ```

### Code Style

- Use consistent formatting (2 spaces for indentation)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Use clear, descriptive commit messages:
- `feat: add interactive mode for component generation`
- `fix: resolve path issue on Windows`
- `docs: update README with new examples`
- `refactor: improve template rendering logic`

## Adding New Features

### Adding a New Generator Type

1. Add template files in `templates/`
2. Add generator function in `lib/generator.js`
3. Update CLI command validation in `bin/index.js`
4. Update README documentation

### Adding New Templates

1. Create `.hbs` files in `templates/` directory
2. Use Handlebars syntax: `{{variableName}}`
3. Test with actual generation

## Pull Request Process

1. Update documentation (README.md) if needed
2. Test your changes thoroughly
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request with:
   - Clear title and description
   - What problem it solves
   - How to test the changes

## Ideas for Contributions

### High Priority
- Add tests (unit and integration)
- Add interactive mode (inquirer.js)
- Support custom config file (.reactarchitectrc)
- Add more template options

### Medium Priority
- Add Storybook story generation
- Add test file generation
- Support for JavaScript (non-TypeScript)
- Add context/provider generation

### Enhancement Ideas
- Support for styled-components
- Support for Tailwind CSS
- Redux/Zustand slice generators
- API client boilerplate
- Form validation templates

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Ideas for improvements

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Collaborate openly

Thank you for contributing! 🚀
