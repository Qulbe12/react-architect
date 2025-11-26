#!/usr/bin/env node

/**
 * React Architect Setup Verification
 * Checks that everything is properly configured
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

let errors = 0;
let warnings = 0;

function check(name, test, fix) {
  try {
    if (test()) {
      console.log(`${GREEN}✓${RESET} ${name}`);
      return true;
    } else {
      console.log(`${RED}✗${RESET} ${name}`);
      if (fix) {
        console.log(`  ${YELLOW}Fix: ${fix}${RESET}`);
      }
      errors++;
      return false;
    }
  } catch (error) {
    console.log(`${RED}✗${RESET} ${name}: ${error.message}`);
    errors++;
    return false;
  }
}

function warn(name, test, suggestion) {
  try {
    if (test()) {
      console.log(`${GREEN}✓${RESET} ${name}`);
      return true;
    } else {
      console.log(`${YELLOW}⚠${RESET} ${name}`);
      if (suggestion) {
        console.log(`  ${YELLOW}Suggestion: ${suggestion}${RESET}`);
      }
      warnings++;
      return false;
    }
  } catch (error) {
    console.log(`${YELLOW}⚠${RESET} ${name}: ${error.message}`);
    warnings++;
    return false;
  }
}

console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
console.log(`${BLUE}  React Architect Setup Verification${RESET}`);
console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

// Check Node.js version
console.log(`${BLUE}Checking Environment...${RESET}`);
check(
  'Node.js version (>= 14.0.0)',
  () => {
    const version = process.version;
    const major = parseInt(version.split('.')[0].substring(1));
    return major >= 14;
  },
  'Install Node.js 14+ from https://nodejs.org'
);

check(
  'npm is available',
  () => {
    execSync('npm --version', { stdio: 'ignore' });
    return true;
  },
  'Install npm (comes with Node.js)'
);

// Check package.json
console.log(`\n${BLUE}Checking Package Configuration...${RESET}`);
check(
  'package.json exists',
  () => fs.existsSync('package.json'),
  'Run: npm init'
);

check(
  'package.json has "bin" field',
  () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return pkg.bin && pkg.bin['react-architect'];
  },
  'Add "bin" field to package.json'
);

check(
  'package.json has correct version',
  () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return /^\d+\.\d+\.\d+$/.test(pkg.version);
  },
  'Set valid semantic version (e.g., 1.0.0)'
);

check(
  'package.json has dependencies',
  () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return pkg.dependencies && Object.keys(pkg.dependencies).length > 0;
  },
  'Run: npm install'
);

// Check file structure
console.log(`\n${BLUE}Checking File Structure...${RESET}`);
check(
  'bin/ directory exists',
  () => fs.existsSync('bin'),
  'Create bin/ directory'
);

check(
  'bin/index.js exists',
  () => fs.existsSync('bin/index.js'),
  'Create bin/index.js'
);

check(
  'bin/index.js has shebang',
  () => {
    const content = fs.readFileSync('bin/index.js', 'utf8');
    return content.startsWith('#!/usr/bin/env node');
  },
  'Add shebang: #!/usr/bin/env node'
);

check(
  'bin/index.js is executable',
  () => {
    const stats = fs.statSync('bin/index.js');
    return (stats.mode & 0o111) !== 0;
  },
  'Run: chmod +x bin/index.js'
);

check(
  'lib/ directory exists',
  () => fs.existsSync('lib'),
  'Create lib/ directory'
);

check(
  'lib/generator.js exists',
  () => fs.existsSync('lib/generator.js'),
  'Create lib/generator.js'
);

check(
  'lib/utils.js exists',
  () => fs.existsSync('lib/utils.js'),
  'Create lib/utils.js'
);

check(
  'templates/ directory exists',
  () => fs.existsSync('templates'),
  'Create templates/ directory'
);

check(
  'component templates exist',
  () => {
    return (
      fs.existsSync('templates/component.tsx.hbs') &&
      fs.existsSync('templates/component.module.scss.hbs') &&
      fs.existsSync('templates/component.types.ts.hbs') &&
      fs.existsSync('templates/component.index.ts.hbs')
    );
  },
  'Create component template files'
);

check(
  'service template exists',
  () => fs.existsSync('templates/service.ts.hbs'),
  'Create templates/service.ts.hbs'
);

check(
  'hook template exists',
  () => fs.existsSync('templates/hook.ts.hbs'),
  'Create templates/hook.ts.hbs'
);

check(
  'module template exists',
  () => fs.existsSync('templates/module.index.ts.hbs'),
  'Create templates/module.index.ts.hbs'
);

// Check dependencies
console.log(`\n${BLUE}Checking Dependencies...${RESET}`);
check(
  'node_modules/ exists',
  () => fs.existsSync('node_modules'),
  'Run: npm install'
);

check(
  'commander is installed',
  () => fs.existsSync('node_modules/commander'),
  'Run: npm install commander'
);

check(
  'handlebars is installed',
  () => fs.existsSync('node_modules/handlebars'),
  'Run: npm install handlebars'
);

check(
  'chalk is installed',
  () => fs.existsSync('node_modules/chalk'),
  'Run: npm install chalk'
);

// Check documentation
console.log(`\n${BLUE}Checking Documentation...${RESET}`);
warn(
  'README.md exists',
  () => fs.existsSync('README.md'),
  'Create comprehensive README.md'
);

warn(
  'LICENSE exists',
  () => fs.existsSync('LICENSE'),
  'Add LICENSE file (MIT recommended)'
);

warn(
  '.gitignore exists',
  () => fs.existsSync('.gitignore'),
  'Create .gitignore file'
);

warn(
  'CHANGELOG.md exists',
  () => fs.existsSync('CHANGELOG.md'),
  'Create CHANGELOG.md for version history'
);

// Check git
console.log(`\n${BLUE}Checking Version Control...${RESET}`);
warn(
  'Git repository initialized',
  () => fs.existsSync('.git'),
  'Run: git init'
);

warn(
  'Repository has commits',
  () => {
    try {
      execSync('git log -1', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  },
  'Run: git add . && git commit -m "Initial commit"'
);

// Check if linked
console.log(`\n${BLUE}Checking Installation...${RESET}`);
warn(
  'Package is linked globally',
  () => {
    try {
      execSync('which react-architect', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  },
  'Run: npm link (for local testing)'
);

// Final summary
console.log(`\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
console.log(`${BLUE}  Summary${RESET}`);
console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

if (errors === 0 && warnings === 0) {
  console.log(`${GREEN}✅ Perfect! Everything is properly configured.${RESET}\n`);
  console.log(`Next steps:`);
  console.log(`  1. Run: npm link (to test locally)`);
  console.log(`  2. Test: react-architect --version`);
  console.log(`  3. Test: react-architect init`);
  console.log(`  4. Publish: npm publish\n`);
} else {
  if (errors > 0) {
    console.log(`${RED}✗ ${errors} error(s) found${RESET}`);
    console.log(`${RED}  Fix the errors above before continuing.${RESET}\n`);
  }
  if (warnings > 0) {
    console.log(`${YELLOW}⚠ ${warnings} warning(s) found${RESET}`);
    console.log(`${YELLOW}  These are optional but recommended.${RESET}\n`);
  }
  
  if (errors > 0) {
    process.exit(1);
  }
}

console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
