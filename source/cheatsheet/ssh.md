---
title: "SSH cheatsheet"
date: 2020-07-29
description: "Cheatsheet - Apache HTTP Server"
tags: ["SSH", "VPS", "Linux", "Cheatsheet"]
layout: layouts/post.njk
---

*SSH - Secure Shell*


## Forward a port from a remote source (I.E. a VPS) to specific port on localhost

```bash
ssh -L 65432:localhost:80 user@111.222.333.444 -p 54321 -i .ssh/id_rsa_selected_key
```

*Command breakdown*
`ssh` No explanation needed (?)

`-L 65432:localhost:80` The forwarding part of the command. 65432 is the port you want to forward to on the target/receiver/local device. localhost:80 is the port om the remote.

`user@111.222.333.444 -p 54321` The remote's user, IP-address and SSH port (if port is not specifiec in remote's settings, defaults to 22)

`-i .ssh/id_rsa_selected_key` '-i' is used when a specific SSH key is needed

## Creating a key
```bash
ssh-keygen -t rsa -C "some.identifier@name.com"
```
