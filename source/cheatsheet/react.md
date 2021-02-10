---
title: "React cheatsheet"
date: 2020-10-27
description: "React cheatsheet"
tags: ["React","JavaScript","Cheatsheet"]
layout: layouts/post.njk
---

## Run function on component render
```javascript
import React, { useEffect } from "react"

useEffect(() => {
    console.log('This runs on every render')
})

// add and empty array as a callback to run once, instead of on every render
useEffect(() => {
    console.log('This runs exactly once')
}, [])
```
