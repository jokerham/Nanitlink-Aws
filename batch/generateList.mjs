import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, readdirSync, statSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(dirname(dirname(__filename)), './src');

const layoutDir = resolve(__dirname, './layout');
const moduleDir = resolve(__dirname, './module');
const outputFilePath = resolve(__dirname, 'layouts_and_modules.json');

const getSubdirectories = (directory) => {
  try {
    return readdirSync(directory).filter((subdir) => {
      const fullPath = resolve(directory, subdir);
      return statSync(fullPath).isDirectory();
    });
  } catch (error) {
    console.error(`Error reading directory: ${directory}`, error);
    return [];
  }
};

const getModulesWithAdminCheck = (directory) => {
  const modules = getSubdirectories(directory);
  return modules.map((module) => {
    const adminPath = resolve(directory, module, 'admin');
    return {
      name: module,
      hasAdmin: existsSync(adminPath),
    };
  });
};

const generateJsonFile = () => {
  console.log(layoutDir);
  const layouts = getSubdirectories(layoutDir);
  const modules = getModulesWithAdminCheck(moduleDir);

  const outputData = {
    layouts,
    modules,
  };

  writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2));
  console.log(`JSON file created successfully at: ${outputFilePath}`);
};

generateJsonFile();
