const fs = require("fs");
const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
var kebabCase = require('lodash/fp/kebabCase');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const moment = require('moment');

var remark = require('remark')
// TODO: var remarkRecommended = require('remark-preset-lint-recommended')
// TODO: var remarkHtml = require('remark-html')
// TODO: var remarkReport = require('vfile-reporter')


module.exports = function(eleventyConfig) {

  eleventyConfig.on('beforeBuild', () => {
    // Run me before the build starts
    console.log("THIS BEFORE BUILD: ", this)
  });

  eleventyConfig.on('afterBuild', () => {
    // Run me after the build ends
    console.log("THIS AFTER BUILD: ", this)

    /* TODO: Implement to check linting on markdown files and cheatsheet
        https://unifiedjs.com/explore/package/remark/

    remark()
   .use(remarkRecommended)
   .use(remarkHtml)
   .process('## Hello world!', function (err, file) {
     console.error(remarkReport(err || file))
     console.log(String(file))
   })
     */
  });

  eleventyConfig.on('beforeWatch', (changedFiles) => {
    // changedFiles is an array of files that changed
    // to trigger the watch/serve build
    console.log("THIS, BEFORE WATCH CHANGED FILES: ", this)
    console.log("BEFORE WATCH CHANGED FILES: ", changedFiles)
  });

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

  eleventyConfig.addFilter("hashTags", function(tags) {
    const htmlList = []
    for (let tag of tags) {
      //{% for tag in post.data.tags %}
      //if (this.collections.tagList.indexOf(tag) != -1) {
        const tagUrl = `/tags/${kebabCase(tag)}/` // originally {% set tagUrl %}/tags/{{ tag }}/{% endset %} {{ tagUrl | url }}
        const html = `
        <small>
          <a 
            href="${tagUrl}"
            class="tag"
            data-tag="${kebabCase(tag)}"
            style="color: var(--primary); margin-right: .3rem;"
          >
            <span style="margin-right: .05rem; font-size: large; opacity: .6;">
              #
            </span>
            ${tag}
          </a>
        </small>
        `
        htmlList.push(html)
      //}
      //{%- if collections.tagList.indexOf(tag) != -1 -%}
        //{% set tagUrl %}/tags/{{ tag }}/{% endset %}
      //{%- endif -%}
    //{% endfor %}
    }
    return htmlList.join("")
    //{% for tag in collections.tagList %}
      //{% set tagUrl %}/tags/{{ tag | kebabCase }}/{% endset %}
    //{% endfor %}
  });

  /**
   * TODO: Create TOC with remark TOC
   */
  eleventyConfig.addFilter("toc", function(content) {
    return ""
    /* TODO:
      <Toc>
      const Toc = (): ReactElement => {
        if (!tableOfContents.items) return <></>
        return (
          <div>
            const tocHeader = [`In this post`, `Contents`, `Index`, `In in this article`, `Table of contents`]
            <h3>{tocHeader[Math.floor(Math.random() * tocHeader.length)]}</h3>
            <ul style={{ marginBottom: `1rem`, display: !tableOfContents.items ? `none` : `block` }}>
              {tableOfContents.items.map((item: { url: string | number | null | undefined }) => (
                <TableOfContentsItem headingItem={item} key={item.url} />
              ))}
            </ul>
          </div>
        )
      }
    </Toc>
    */
  });

  /**
   * Shortcodes
   * TODO: Add cheatsheet in the future
   */

  eleventyConfig.addShortcode("postStats", function(content = "", cheatsheet = []) {
    const htmlArray = []

    const postStats = {
      words: content.split(" ").length,
      sentences: wordCount.sentences,
      paragraphs: wordCount.paragraphs,
      "read time": timeToRead + (Number(timeToRead) > 1 ? ` mins` : ` min`),
    }



    /*
    Object.keys(postStats).map(item => (
      <p key={item} className="dense">
        <span style={{ fontSize: `large`, marginRight: `.3rem` }}>{postStats[item]}</span>
        {item}
      </p>
    ))


    return `<div class="user">
      <div class="user_name">${name}</div>
      <div class="user_twitter">@${twitterUsername}</div>
      </div>`;
     */
    return ""
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

    //tagSet.sort()
    const tagList = [...tagSet]
    tagList.sort()
    //return [...tagSet].sort()
    return tagList
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
