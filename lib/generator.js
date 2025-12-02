const fs = require('fs').promises;
const path = require('path');
const handlebars = require('handlebars');
const { toPascalCase, toCamelCase, toKebabCase } = require('./utils');

/**
 * Create a directory if it doesn't exist
 * @param {string} dirPath - Directory path
 */
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Write content to a file
 * @param {string} filePath - File path
 * @param {string} content - File content
 */
async function writeFile(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf8');
}

/**
 * Read and compile a template
 * @param {string} templateName - Template file name
 * @returns {Function} Compiled template function
 */
async function loadTemplate(templateName) {
  const templatePath = path.join(__dirname, '..', 'templates', templateName);
  const templateContent = await fs.readFile(templatePath, 'utf8');
  return handlebars.compile(templateContent);
}

/**
 * Get list of available modules
 * @returns {Promise<string[]>} Array of module names
 */
async function getAvailableModules() {
  const cwd = process.cwd();
  const modulesPath = path.join(cwd, 'src', 'modules');
  
  try {
    const entries = await fs.readdir(modulesPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    return [];
  }
}

/**
 * Initialize the project structure
 */
async function initProject() {
  const cwd = process.cwd();
  
  const directories = [
    'src/core/services',
    'src/core/hooks',
    'src/core/context',
    'src/components',
    'src/shared/ui',
    'src/shared/utils',
    'src/modules'
  ];

  for (const dir of directories) {
    const dirPath = path.join(cwd, dir);
    await ensureDir(dirPath);
    
    // Create .gitkeep files in empty directories
    const gitkeepPath = path.join(dirPath, '.gitkeep');
    await writeFile(gitkeepPath, '');
  }
}

/**
 * Generate a component
 * @param {string} name - Component name
 * @param {string} moduleName - Optional module name
 */
async function generateComponent(name, moduleName) {
  const cwd = process.cwd();
  const pascalName = toPascalCase(name);
  const kebabName = toKebabCase(name);
  
  let basePath;
  if (moduleName) {
    basePath = path.join(cwd, 'src', 'modules', moduleName, 'components', pascalName);
  } else {
    basePath = path.join(cwd, 'src', 'components', pascalName);
  }
  
  await ensureDir(basePath);

  // Load templates
  const componentTemplate = await loadTemplate('component.tsx.hbs');
  const scssTemplate = await loadTemplate('component.module.scss.hbs');
  const typesTemplate = await loadTemplate('component.types.ts.hbs');
  const indexTemplate = await loadTemplate('component.index.ts.hbs');

  const context = { name: pascalName, kebabName };

  // Generate files
  await writeFile(
    path.join(basePath, `${pascalName}.tsx`),
    componentTemplate(context)
  );
  
  await writeFile(
    path.join(basePath, `${pascalName}.module.scss`),
    scssTemplate(context)
  );
  
  await writeFile(
    path.join(basePath, `${pascalName}.types.ts`),
    typesTemplate(context)
  );
  
  await writeFile(
    path.join(basePath, 'index.ts'),
    indexTemplate(context)
  );
}

/**
 * Generate a service
 * @param {string} name - Service name
 * @param {string} moduleName - Optional module name
 */
async function generateService(name, moduleName) {
  const cwd = process.cwd();
  const pascalName = toPascalCase(name);
  const camelName = toCamelCase(name);
  
  let basePath;
  if (moduleName) {
    basePath = path.join(cwd, 'src', 'modules', moduleName, 'services');
  } else {
    basePath = path.join(cwd, 'src', 'core', 'services');
  }
  
  await ensureDir(basePath);

  const serviceTemplate = await loadTemplate('service.ts.hbs');
  const context = { name: pascalName, camelName };

  await writeFile(
    path.join(basePath, `${pascalName}Service.ts`),
    serviceTemplate(context)
  );
}

/**
 * Generate a custom hook
 * @param {string} name - Hook name
 * @param {string} moduleName - Optional module name
 */
async function generateHook(name, moduleName) {
  const cwd = process.cwd();
  const camelName = toCamelCase(name);
  const hookName = camelName.startsWith('use') ? camelName : `use${toPascalCase(name)}`;
  
  let basePath;
  if (moduleName) {
    basePath = path.join(cwd, 'src', 'modules', moduleName, 'hooks');
  } else {
    basePath = path.join(cwd, 'src', 'core', 'hooks');
  }
  
  await ensureDir(basePath);

  const hookTemplate = await loadTemplate('hook.ts.hbs');
  const context = { hookName };

  await writeFile(
    path.join(basePath, `${hookName}.ts`),
    hookTemplate(context)
  );
}

/**
 * Generate a module
 * @param {string} name - Module name
 */
async function generateModule(name, _moduleName) {
  const cwd = process.cwd();
  const kebabName = toKebabCase(name);
  const pascalName = toPascalCase(name);
  
  const basePath = path.join(cwd, 'src', 'modules', kebabName);
  
  const directories = [
    'components',
    'services',
    'hooks'
  ];

  for (const dir of directories) {
    await ensureDir(path.join(basePath, dir));
  }

  // Create module index file
  const moduleIndexTemplate = await loadTemplate('module.index.ts.hbs');
  const context = { name: pascalName };

  await writeFile(
    path.join(basePath, 'index.ts'),
    moduleIndexTemplate(context)
  );
}

/**
 * Generate an item based on type
 * @param {string} type - Item type (component, module, service, hook)
 * @param {string} name - Item name
 * @param {string} moduleName - Optional module name
 */
async function generateItem(type, name, moduleName) {
  switch (type) {
    case 'component':
      await generateComponent(name, moduleName);
      break;
    case 'service':
      await generateService(name, moduleName);
      break;
    case 'hook':
      await generateHook(name, moduleName);
      break;
    case 'module':
      await generateModule(name, moduleName);
      break;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

module.exports = {
  initProject,
  generateItem,
  getAvailableModules
};
