/**
 * Bundles and minifies CSS files in source/styles
 * 
 * TODO: Consider going back to SASS
 */
const fs = require("fs").promises
const path = require("path")
const CleanCSS = require("clean-css")

const outputBaseDir = "_site"

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

/**
 * Not in use at the moment
 */
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
    outputContents,
    "utf-8"
  )
  console.log(`[OK] File written to ${outputPath}`)
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

  try {
    await fs.mkdir(outputBaseDir)
  } catch (error) {
    if (error.code == "EEXIST") {
      console.log(`[OK] ${outputBaseDir} directory exists`)
    } else {
      console.log(error)
    }
  }

  writeToFile(`${outputBaseDir}/lybekk.css`, joinedStrings)
  writeToFile(`${outputBaseDir}/lybekk.min.css`, minified.styles)
}

if (process.argv.includes("execute")) {
  generate()
}

module.exports.generate = generate
