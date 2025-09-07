const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src');

function fixImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace @/ imports with relative paths
    content = content.replace(
      /from ["']@\/([^"']+)["']/g, 
      (match, importPath) => {
        const relativePath = path.relative(
          path.dirname(filePath), 
          path.join(rootDir, importPath)
        ).replace(/\\/g, '/');
        
        // Ensure the path starts with ./
        const finalPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
        return `from '${finalPath}'`;
      }
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed imports in ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fixImports(fullPath);
    }
  });
}

// Start processing from the src directory
processDirectory(rootDir);
console.log('Finished fixing imports!');
