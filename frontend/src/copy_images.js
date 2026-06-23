const fs = require('fs');
const path = require('path');

const srcDir = '/home/suvasmita/.gemini/antigravity/brain/8367ee34-a44d-4f2b-b67d-6ca995b20911';
const destDir = '/var/www/html/yoga_healers/frontend/src/assets';

const files = [
  { prefix: 'product_enema_', name: 'product_enema.png' },
  { prefix: 'product_sprout_', name: 'product_sprout.png' },
  { prefix: 'product_neem_comb_', name: 'product_neem_comb.png' },
  { prefix: 'product_copper_bottle_', name: 'product_copper_bottle.png' },
  { prefix: 'product_tea_', name: 'product_tea.png' }
];

const allFiles = fs.readdirSync(srcDir);

files.forEach(f => {
  const matchingFile = allFiles.find(name => name.startsWith(f.prefix) && name.endsWith('.png'));
  if (matchingFile) {
    const srcPath = path.join(srcDir, matchingFile);
    const destPath = path.join(destDir, f.name);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${matchingFile} -> ${f.name}`);
  } else {
    console.error(`Could not find file with prefix ${f.prefix}`);
  }
});
