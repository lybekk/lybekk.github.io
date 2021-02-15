---
title: "Dart cheatsheet"
date: 2020-10-25
description: "Dart cheatsheet."
tags: ["Dart", "Flutter", "Cheatsheet"]
layout: layouts/post.njk
---

## Useful libraries

### Standard library
* dart:async - Enables async/await functions
* dart:io - For read/write operations on the local filesystem
    * https://api.dart.dev/stable/2.10.2/dart-io/Directory-class.html
* dart:convert - Used for, among other things, JSON encoding and decoding

## Print
print('Hello, World!');

## Basic function
void main() {
    print('Hello, World!');
}

## Run Dart script from the command line
`dart /path/to/script.dart`

## Directory
var myDir = new Directory('/home/user/dir/');

### List files in a directory
```dart
var myDir = new Directory('/home/user/dir/');

void checkDir(theDir) {
  theDir.exists().then((isThere) {
    isThere ? print('exists') : print('non-existent');
    listDir(theDir);
  });
}

void listDir(theDir) {
    theDir.list(recursive: true, followLinks: false)
    .listen((FileSystemEntity entity) {
        print(entity.path);
    });
}

checkDir(myDir);
```

## Handy resources from around the web
* [Working with JSON](https://codingwithjoe.com/dart-fundamentals-working-with-json-in-dart-and-flutter/)
* [JSON and serialization
](https://flutter.dev/docs/development/data-and-backend/json#manual-encoding)
* [Reading and writing files](https://flutter.dev/docs/cookbook/persistence/reading-writing-files)
