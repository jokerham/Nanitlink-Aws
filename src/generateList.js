import { dirname, join } from "path";
import { existsSync, readdirSync, statSync, writeFileSync } from "fs";

// Define the paths
const __dirname = dirname(new URL(import.meta.url).pathname);
const layoutDir = join(__dirname, './layout');
const moduleDir = join(__dirname, './module');
const outputFilePath = join(__dirname, 'layouts_and_modules.json');

// Helper function to get subdirectories
const getSubdirectories = (directory) => {
  try {
    return readdirSync(directory).filter((subdir) => {
      const fullPath = join(directory, subdir);
      return statSync(fullPath).isDirectory();
    });
  } catch (error) {
    console.error(`Error reading directory: ${directory}`, error);
    return [];
  }
};

// Function to scan modules and check for 'admin' subdirectory
const getModulesWithAdminCheck = (directory) => {
  const modules = getSubdirectories(directory);

  return modules.map((module) => {
    const adminPath = join(directory, module, 'admin');
    return {
      name: module,
      hasAdmin: existsSync(adminPath),
    };
  });
};

// Main function to generate the JSON file
const generateJsonFile = () => {
  const layouts = getSubdirectories(layoutDir);
  const modules = getModulesWithAdminCheck(moduleDir);

  const outputData = {
    layouts,
    modules,
  };

  writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2));
  console.log(`JSON file created successfully at: ${outputFilePath}`);
};

// Execute the function
generateJsonFile();