const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.module.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const cssFiles = walk('./src');

cssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace heavy border-bottoms
  content = content.replace(/border-bottom:\s*[4-9]px\s*solid\s*var\(--([a-zA-Z0-9-]+)\)(?:\s*!important)?;/g, (match, varName) => {
    if (varName === 'card-shadow') return 'box-shadow: var(--shadow-sm); border: 1px solid var(--border);';
    if (varName === 'border') return 'box-shadow: var(--shadow-sm); border: 1px solid var(--border);';
    if (varName.includes('shadow')) return `box-shadow: 0 4px 12px var(--${varName.replace('-shadow', '-light')});`;
    return 'box-shadow: var(--shadow-sm);';
  });

  // Also replace some transform: translateY(4px) / 5px to translateY(1px)
  content = content.replace(/transform:\s*translateY\([4-9]px\)/g, 'transform: translateY(1px)');
  
  // And replace margin-bottom: 5px inside :active to prevent layout shift
  content = content.replace(/margin-bottom:\s*5px;/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
