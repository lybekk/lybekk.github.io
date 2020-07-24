---
slug: "/guide/python-cgi-on-apache-web-server"
title: "Run a simple Python CGI on Apache Web Server"
date: 2020-07-20
description: "A how-to on running a simple Python CGI script on an Apache HTTP Web Server"
tags: ["Python", "CGI", "Apache HTTP Server", "Guide"]
---

## Prerequisites

* Python 3.x

## First things first
First, save the script below to a file.

```python
#!/usr/bin/env python3
import cgi
from string import Template

# enable debugging
import cgitb
cgitb.enable()

print('Content-Type: text/html; charset=utf-8\n')
```

## Then

1. Configure Apache's configuration file
    1. Open the config file in any editor. Usually exists in `/etc/apache2/apache2.conf`. Example: `sudo nano /etc/apache2/apache2.conf`
    2. Put this in at the end: `ScriptAlias /myscript/ "/var/www/html/cgi-bin/your_script.py"`. 'myscript' is the URL you want the script at.
2. Put the Python script in cgi-bin (usually `/var/www/html/cgi-bin/`)
    1. Example: `sudo cp /path/to/script/your_script.py /var/www/html/cgi-bin/your_script.py`
3. Make sure Apache has permission to execute the file `chmod +x your_script.py`
