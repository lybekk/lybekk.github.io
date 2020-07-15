---
slug: "/cheatsheet/python"
title: "Python cheatsheet"
date: 2020-07-09
description: "Cheatsheet for Python"
tags: ["Python", "Syntax", "Cheatsheet"]
---

## Collection types
```python
my_list = ["an item", "another item", "A third item. Can you believe it?"]
my_tuple = ("this", "will be", "unchangeable")
my_set = {"the order", "of these", "are not guaranteed"}
my_dictionary = { "key1": "Value 1", "Key 2": 42 }
```

>*Lists and Tuples are 'ordered'. Items will appear as they are inserted*
>
>*Sets and Dictionaries are not ordered collection types*

## Retrieving device hostname
```python
import socket

HOSTNAME = socket.gethostname()
print(HOSTNAME)
```

## Parse & Dump a JSON file
```python
import json

with open('/path/to/file.json', "r") as f:
    file_contents = json.loads( f.read() )
    print( json.dumps(file_contents, indent=4) )
```

## Write to file
```python
with open('/path/to/file.txt', "w") as f:
    f.write( "A string, dumped JSON or the like" )
```

## Get environment variable
```python
import os

variable = os.environ['some_variable_name']
```

## Run another script
```python
import subprocess
subprocess.Popen("script2.sh", shell=True)
```
Note: *<code>os.system("script2.sh")</code> is not recommended*

## Run another Python script
Runs another Python script in the same process as the script executing the command
```python
exec(open("script2.py").read())
```

## Dict comprehension
```python
[print(key, value) for key, value in some_dictionary.items()]
```