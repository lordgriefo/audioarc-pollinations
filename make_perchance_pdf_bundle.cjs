const fs = require('fs');
const { execSync } = require('child_process');

// 1. Read masterProductionNotesPdf.ts
let code = fs.readFileSync('D:/audioarc/masterProductionNotesPdf.ts', 'utf8');

// 2. Replace the jsPDF import with safe browser global lookup
code = code.replace(
  "import { jsPDF } from 'jspdf';",
  "const jsPDF = (typeof window !== 'undefined' ? ((window.jspdf && window.jspdf.jsPDF) || window.jsPDF) : null);"
);

// Write temporary shim
fs.writeFileSync('D:/audioarc/masterProductionNotesPdf.browser.ts', code);

// 3. Bundle with esbuild to standalone IIFE
execSync(
  'npx esbuild "D:/audioarc/masterProductionNotesPdf.browser.ts" --bundle --format=iife --global-name=AudioArcBibleEngine --outfile="D:/audioarc/public/audioarc_master_bible.js"',
  { stdio: 'inherit' }
);

// 4. Wrap with global helpers so window.buildMasterProductionNotesPDF and window.exportMasterProductionNotesPDF exist
let bundled = fs.readFileSync('D:/audioarc/public/audioarc_master_bible.js', 'utf8');
bundled += `
if (typeof window !== 'undefined') {
  window.buildMasterProductionNotesPDF = AudioArcBibleEngine.buildMasterProductionNotesPDF;
  window.exportMasterProductionNotesPDF = AudioArcBibleEngine.exportMasterProductionNotesPDF;
}
`;
fs.writeFileSync('D:/audioarc/public/audioarc_master_bible.js', bundled);

// Clean up temporary shim
fs.unlinkSync('D:/audioarc/masterProductionNotesPdf.browser.ts');

console.log('Successfully generated D:/audioarc/public/audioarc_master_bible.js (' + bundled.length + ' bytes)');
