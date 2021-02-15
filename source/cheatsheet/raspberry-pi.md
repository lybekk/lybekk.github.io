---
title: "Raspberry Pi"
date: 2020-06-28
description: ""
tags: ["Raspberry Pi","Cheatsheet"]
layout: layouts/post.njk
---

## Misc.

### Set/change default password
When logged in as pi (the default user), enter <code>passwd</code> in a terminal

### Adding users
In a terminal, enter <code>sudo adduser username</code>

## Configure autostart items

One method is to create a configuration file that is unique to the currently logged in user. First you need to edit this text file:
```shell
sudo nano ~/.config/lxsession/LXDE/autostart
```
This file represents a list of commands to be executed when the GUI loads. It is usually blank when you first edit it so just add the applications you need to auto-load:
@lxterminal
@leafpad
To save and exit the nano editor press CTRL-X, Y and then ENTER.

## Restart Apache HTTP Server
```shell
sudo systemctl restart apache2
```
