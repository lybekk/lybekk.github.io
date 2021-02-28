const glob = require('glob');
const matter = require('gray-matter');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

function firstFourLines(file, options) {
  file.excerpt = file.content.split('\n').slice(0, 4).join(' ');
}

const parseMarkdownDir = () => {
  const markdownDir = process.env.LYBEKK_TECH_MARKDOWN_DIRECTORY;
  const processedMarkdownFiles = new Array();

  if (markdownDir) {
    console.log("Markdown directory: ", markdownDir)

    const optionsGlob = {
      cwd: markdownDir,
    };

    const optionsGrayMatter = {
      excerpt: firstFourLines
    }


    const files = glob.sync("**/*.md", optionsGlob);
    for (f of files) {
      // TODO: Verify if utf-8 is needed
      const contents = matter.read(markdownDir + f, optionsGrayMatter);
      contents.html = md.render(contents.content);

      processedMarkdownFiles.push(
        contents
      )
      // TODO: syntax highlighting https://github.com/markdown-it/markdown-it#syntax-highlighting
      // TODO: Filter public
    }

    return processedMarkdownFiles;
  } else {
    throw "No markdown directory set";
  };
};

module.exports = function() {
  return parseMarkdownDir();
}

/* TESTING */
const temp = parseMarkdownDir()
console.log(temp[0])
