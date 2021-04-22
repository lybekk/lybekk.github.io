const fs = require("fs").promises
const path = require("path")
const CleanCSS = require("clean-css")

const stylesPath = path.join(__dirname, "..", "styles")
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
  `)
  // Efficiency = `(originalSize - minifiedSize) / originalSize`, e.g. 0.25 if size is reduced from 100 bytes to 75 bytes
}

const writeToFile = (outputPath, outputContents) => {
  fs.writeFile(
    outputPath,
    `/* Generated with cssBundler.js at https://github.com/lybekk/lybekk.github.io */
    \n${outputContents}`,
    "utf-8"
  )
}

async function generate() {
  const stringList = []
  for await (const f of fileNameArray) {
    stringList.push(
      await fs.readFile(path.join(stylesPath, `${f}.css`), "utf8")
    )
  }
  const joinedStrings = stringList.join(" ")

  const minified = new CleanCSS().minify(joinedStrings)

  writeToFile("_site/lybekk.css", joinedStrings)
  writeToFile("_site/lybekk.min.css", minified.styles)
}

if (process.argv.includes("execute")) {
  generate()
}

module.exports.generate = generate
