---
permalink: "/cheatsheet/html"
title: "HTML cheatsheet"
date: 2020-06-28
description: ""
tags: ["HTML", "Syntax","Cheatsheet"]
---

## HTML

### Embed plain text (txt) files in .html

```html
<embed src="folder/file.txt" width="400" height="200"> 
```

### Style embedded elements

```html
<div style="margin: 0 auto; width:100%; height:400px; overflow: auto;">
    <object type="text/html" data="file_name.txt" style="width:100%; height:400px; margin:1%;" />
</div>

<p>
    <font color="#FFFFFF">
        <embed src="filename.txt" width="x" height="y" />
    </font>
</p>
```
