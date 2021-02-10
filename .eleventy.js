const fs = require("fs");
const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
var kebabCase = require('lodash/fp/kebabCase');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const moment = require('moment');


module.exports = function(eleventyConfig) {

  const passthroughList = [
    "google93445b09dad855a5.html",
    "lybekk.png",
    "source/js/*",
    "source/img/*.png",
    "source/fluenticons",
    "source/CNAME",
    "source/CNAME",
  ]

  for (let item of passthroughList) {
    eleventyConfig.addPassthroughCopy(item);
  }

  /**
   * Filters
   */

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("kebabCase", function(txt) {
    return kebabCase(txt)
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("dateFromNow", dateString => {
   return moment(dateString, "YYYY-MM-DD").fromNow()
  });
  
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("wordCounter", function(content) {
    return content.split(" ").length
  });

  /**
   * Plugins
   */

  eleventyConfig.addPlugin(pluginRss);

  /**
   * Miscellaneous
   */
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
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
