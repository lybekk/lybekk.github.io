---
title: "Termux cheatsheet"
firstPublished: 2019-05-29
date: 2020-12-04
description: "Code snippets for Termux , a brilliant terminal emulator for Android."
tags: ["Termux", "MySQL", "MariaDB", "PostgreSQL", "Cheatsheet"]
layout: layouts/post.njk
---

## Termux & MariaDB

How to run MariaDB, a drop-in alternative to MySQL, on Termux

```bash
# Install MariaDB
pkg mariadb

# Run this multi-line command
cd '/data/data/com.termux/files/usr' ; \ 
/data/data/com.termux/files/usr/bin/mysqld_safe \ 
--datadir='/data/data/com.termux/files/usr/var/lib/mysql'
```

## Open files from within Termux
Open a file reachable by Termux, and view it in any Android app. I.E. send a file by email or view/edit an image in an editor.
```shell
termux-open file.jpg
```
This will request the "open in" prompt. 
Handy for viewing images, PDF or any other file format not viewable in a terminal.

## PostgreSQL

### Troubleshooting

*Problem*

After installation, on database initialization PostgreSQL server is unable to start. 

**when running `$ initdb` the following exception is raised**

<samp>
CANNOT LINK EXECUTABLE "/data/data/com.termux/files/usr/bin/postgres": library "libicui18n.so.67" not found no data was returned by command ""/data/data/com.termux/files/usr/bin/postgres" -V" initdb: error: The program "postgres" is needed by initdb but was not found in the same directory as "/data/data/com.termux/files/usr/bin/initdb". Check your installation.
</samp>

*Solution*

`pkg upgrade`

## Python

### Troubleshooting

If matplotlib fails to install:
`pip3 install wheel`

*Jupyter Notebook*

```shell
pkg install libzmq

pip3 install jupyter
```
