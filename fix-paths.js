const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src');

// Map of files that need to be updated with their relative paths
const filesToUpdate = [
  'components/ui/table.tsx',
  'components/ui/textarea.tsx',
  'components/ui/toast.tsx',
  'components/ui/toaster.tsx',
  'components/ui/tooltip.tsx',
  'hooks/use-toast.ts'
];

function updateFile(filePath) {
  try {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace @/ imports with relative paths
    content = content.replace(
      /from ["']@\/([^"']+)["']/g, 
      (match, importPath) => {
        const relativePath = path.relative(
          path.dirname(fullPath), 
          path.join(rootDir, importPath)
        ).replace(/\\/g, '/');
        
        // Ensure the path starts with ./
        const finalPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
        return `from '${finalPath}'`;
      }
    );
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Process each file
filesToUpdate.forEach(filePath => {
  updateFile(filePath);
});

console.log('Finished updating import paths!');
