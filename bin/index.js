#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { initProject, generateItem } = require('../lib/generator');
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

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
