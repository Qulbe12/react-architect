# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-26

### Added
- Initial release of React Architect
- `init` command to create project structure
- `generate` command with support for:
  - Components (with .tsx, .module.scss, .types.ts, index.ts)
  - Modules (with organized folder structure)
  - Services (singleton pattern class-based services)
  - Hooks (custom React hooks with state and effects)
- `--module` flag for generating items inside modules
- Handlebars template system
- PascalCase, camelCase, and kebab-case transformations
- Comprehensive documentation
- MIT License

### Features
- Angular-style architecture for React
- TypeScript-first approach
- SCSS modules for styling
- Type definition files for components
- Clean export patterns with index.ts files
- Error handling and user feedback with chalk colors

## [Unreleased]

### Planned
- Interactive mode with prompts
- Configuration file support (.reactarchitectrc)
- Storybook story generation
- Test file generation
- JavaScript support (non-TypeScript)
- Custom template support
- Context/Provider generation
- Redux/Zustand integration

---

## Version History

- **1.0.0** - Initial Release
