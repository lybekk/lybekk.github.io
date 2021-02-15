---
title: "Markdown syntax"
date: 2020-06-01
description: ""
tags: ["Markdown", "Syntax","Cheatsheet"]
layout: layouts/post.njk
---

## Markdown

A more complete list of commonly used Markdown found [here](https://www.markdownguide.org/basic-syntax)

## Definition List
<pre>
term
: definition
</pre>

### Links to headings

You can make links to headings based on the heading text, for example:
```
### My Heading

Lorem ipsum...

[Reference](#my-heading)
```

### GitHub specific

In order to create table of contents (TOC) in markdown files on GitHub, put this snippet anywhere you would want a TOC to be generated:
```
* TOC
{:toc}
```
