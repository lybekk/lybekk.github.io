const fs = require('fs').promises;
const path = require('path');
const CleanCSS = require('clean-css');

const stylesPath = path.join(__dirname, '..', 'styles');
const fileNameArray = [
  "global",
  "variables",
  "mediaqueries",
  "htmlTags",
  "classes",
  "animations",
  "ariaLabels",
]

function printResults(output) {
  console.log(`
  Errors: ${output.errors}
  Warnings: ${output.warnings}
  originalSize: ${output.stats.originalSize}
  minifiedSize: ${output.stats.minifiedSize}
  timeSpent: ${output.stats.timeSpent}
  efficiency: ${output.stats.efficiency}
  `);
  // Efficiency = `(originalSize - minifiedSize) / originalSize`, e.g. 0.25 if size is reduced from 100 bytes to 75 bytes
}

async function generate() {
  const stringList = [];
  for await (let f of fileNameArray) {
    f = path.join(stylesPath, `${f}.css`)
    stringList.push(await fs.readFile(f, 'utf8'))
  }
  const joinedStrings = stringList.join(' ');
  // TODO: Nonminified CSS
  const options = { /* options */ };
  const minified = new CleanCSS(options).minify(joinedStrings);
  const outputPath = '_site/lybekk.min.css'
  const outputMinified = "/* Generated with cssBundler.js at https://github.com/lybekk/lybekk.github.io */" + minified.styles;
  fs.writeFile(outputPath, outputMinified, 'utf-8');
  printResults(minified);
}

if (process.argv.includes('execute')) {
  generate();
}

module.exports.generate = generate;
