const fs = require("fs");
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {

  const passthroughList = [
    "google93445b09dad855a5.html",
    "lybekk.png",
    "source/img/*.png",
    "source/fluenticons",
    "source/CNAME",
    "source/CNAME",
  ]

  for (let item of passthroughList) {
    eleventyConfig.addPassthroughCopy(item);
  }

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: [
        "md",
        "html",
        "ejs",
        "liquid",
        "njk"
    ],
    dir: {
        input: "source",
        includes: "_includes",
        data: "_data",
        output: "_site",
    }
  }
};
