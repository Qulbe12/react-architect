#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { initProject, generateItem, getAvailableModules } = require('../lib/generator');
const packageJson = require('../package.json');

const program = new Command();

program
  .name('react-architect')
  .description('CLI scaffolding tool for React + TypeScript applications')
  .version(packageJson.version);

// Init command
program
  .command('init')
  .description('Initialize the recommended folder structure')
  .action(async () => {
    try {
      console.log(chalk.blue('🏗️  Initializing React Architect structure...'));
      await initProject();
      console.log(chalk.green('✅ Project structure created successfully!'));
    } catch (error) {
      console.error(chalk.red('❌ Error initializing project:'), error.message);
      process.exit(1);
    }
  });

// Generate command
program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate a component, module, service, or hook')
  .option('-m, --module <moduleName>', 'Generate inside a specific module')
  .action(async (type, name, options) => {
    try {
      const validTypes = ['component', 'module', 'service', 'hook'];
      
      if (!validTypes.includes(type)) {
        console.error(chalk.red(`❌ Invalid type: ${type}`));
        console.log(chalk.yellow(`Valid types: ${validTypes.join(', ')}`));
        process.exit(1);
      }

      console.log(chalk.blue(`🔨 Generating ${type}: ${name}...`));
      await generateItem(type, name, options.module);
      console.log(chalk.green(`✅ ${type} '${name}' created successfully!`));
    } catch (error) {
      console.error(chalk.red('❌ Error generating item:'), error.message);
      process.exit(1);
    }
  });

// Module command - cleaner syntax for module-specific generation
program
  .command('module <moduleName> <type> <name>')
  .alias('m')
  .description('Generate a component, service, or hook inside a specific module')
  .action(async (moduleName, type, name) => {
    try {
      const validTypes = ['component', 'service', 'hook'];
      
      if (!validTypes.includes(type)) {
        console.error(chalk.red(`❌ Invalid type: ${type}`));
        console.log(chalk.yellow(`Valid types for module command: ${validTypes.join(', ')}`));
        process.exit(1);
      }

      console.log(chalk.blue(`🔨 Generating ${type} '${name}' in module '${moduleName}'...`));
      await generateItem(type, name, moduleName);
      console.log(chalk.green(`✅ ${type} '${name}' created in module '${moduleName}'!`));
    } catch (error) {
      console.error(chalk.red('❌ Error generating item:'), error.message);
      process.exit(1);
    }
  });

// List modules command
program
  .command('list-modules')
  .alias('ls')
  .description('List all available modules in the project')
  .action(async () => {
    try {
      const modules = await getAvailableModules();
      
      if (modules.length === 0) {
        console.log(chalk.yellow('⚠️  No modules found. Create one with: react-architect g module <name>'));
      } else {
        console.log(chalk.blue('📦 Available modules:'));
        modules.forEach(module => {
          console.log(chalk.green(`  • ${module}`));
        });
        console.log(chalk.gray(`\nTotal: ${modules.length} module(s)`));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error listing modules:'), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
