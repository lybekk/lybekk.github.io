---
permalink: "/guide/use-fluentui-icons-in-gatsby"
title: "How To: Use Fluent UI Icons in Gatsby"
date: 2020-07-26
description: "Microsoft's Fluent UI delivers a crisp user interface. Here's a small guide on how to use the included icons with Gatsby"
tags: ["Guide", "Fluent UI", "React", "JavaScript", "Gatsby"]
---

## Prerequisites

* A running Gatsby development environment with Fluent UI

## First - Initialize icons

Fluent UI React's official documentation instructs you to include the below lines in the root entry file.

```javascript
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
```

In **Gatsby**, an easier and more straightforward way is to include these lines in `index.js` or a layout component (I.E. `Layout.js`).

> Another possible solution may be to put them in one of Gatsby's API files.

By default, when a user visits the deployed Gatsby app, all icons will be downloaded from one of Microsoft servers.

To **avoid** this behaviour, do a couple of small adjustments.

1. Copy the icons from `your_project\node_modules\@uifabric\icons\fonts` to a subdirectory in your projects 'static' folder.
2. Modify the lines from earlier slightly, as below, where the parameter for `initializeIcons()` is the path to where the icons are.

```javascript
import { initializeIcons } from '@uifabric/icons';
initializeIcons('https://lybekk.tech/fluenticons/');
```

*The slash '/' at the end is important*

Now Gatsby will load the icons with the same performance and guarantees as the other files, ensuring correct rendering.

>See an example of Fluent UI running on Gatsby here:
>[Lybekk Tech - UUID Generator](https://lybekk.tech/tools/uuidgenerator/)

---

Further documentation on using 
[icons with Microsoft's Fluent UI](https://github.com/microsoft/fluentui/wiki/using-icons)

*As an added bonus, a way to use Font Awesome instead of Fluent UI icons.*
```javascript
import { registerIcons } from '@uifabric/styling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

registerIcons({
  icons: {
    Filter: <FontAwesomeIcon icon={faCode} />
  }
});
```
