---
title: "Couchbase cheatsheet"
date: 2020-12-03
firstPublished: 2020-06-01
description: "Cheatsheet for Couchbase Server & Sync Gateway"
tags: ["Couchbase", "Couchbase Server", "Couchbase Sync Gateway", "Cheatsheet"]
layout: layouts/post.njk
---

## Couchbase Server

### Starting & stopping

#### Linux (Ubuntu/Debian)
In a terminal/console
```shell
sudo systemctl start couchbase-server
sudo systemctl stop couchbase-server
```

#### Powershell (Windows)
```shell
Stop-Service "CouchbaseServer" -PassThru
Start-Service "CouchbaseServer" -PassThru

# OR

Restart-Service "CouchbaseServer" -PassThru
```
*The -PassThru flag can be omitted. It just makes the console wait for the result before returning control of the console.*

#### Windows CMD
```shell
net stop CouchbaseServer
net start CouchbaseServer
```
### Adjusting stats collection

Log in as root or use sudo to change the Couchbase Server static configuration, which is located at: /opt/couchbase/etc/couchbase/static_config by default.

Add the parameter grab_stats_every_n_ticks, 10, where 10 is the number of ticks. In the Couchbase Server environment, one tick is one second (default). It is recommended that the statistics collection be more frequent (and accurate). However, assign an appropriate tick value for your environment.

Restart the Couchbase Server service.

After restarting the Couchbase service, the statistics collection rate is changed.


## Couchbase Sync Gateway

### Starting & stopping
```shell
sudo service sync_gateway start
sudo service sync_gateway stop
```

### Adding users

This will add a normal user (I.E. not admin).
```shell
curl -vX POST "http://localhost:4985/mydatabase/_user/" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d '{"name": "user", "password": "password"}'
```
*Users will get synced towards a connected instance of Couchbase Server*
