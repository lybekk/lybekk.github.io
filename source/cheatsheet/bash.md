---
permalink: "/cheatsheet/bash"
title: "Bash cheatsheet"
date: 2020-06-01
description: ""
tags: ["Bash", "Syntax", "Cheatsheet"]
---

## Find files with GREP
Search for a specific word, phrase or Regex in file contents.
```bash
# Search for a specific word or phrase in a specific file
grep "word" file.txt

# Same as above, but limiting to one extension/suffix
grep "word" *.txt

# or using wildcard to search multiple files
grep "word" *

# As above, while traversing subdirectories
grep -r "word" *
​
# Case-Insensitive search (ignore case)
​    grep -i "word" *
```

## Read x last lines from a file
```bash
# example
tail -100 /var/log/apache2/error.log
```

## Copy a file
sudo cp /path/to/source/file.txt /path/for/destination/file.txt

## Recursively search for filename
```bash
# Add wildcard '*' on either side where required
find . -name "yourfilename*"

# Case insensitive
find . -iname "yourfilename*"
```

## Measure temperature
```bash
# If command is not found, install lm-sensors
sudo apt install lm-sensors

# Then run
sensors
# or
sensors-detect
```

## TCPtrack
tcptrack displays the status of TCP connections that it sees on a given network interface. tcptrack monitors their state and displays information such as state, source/destination addresses and bandwidth usage in a sorted, updated list very much like the top(1) command. 

```bash
# If command is not found, install with
sudo apt install tcptrack

# Assumed network name - wlp2s0 - replace with your own.
sudo tcptrack -r 1 -i wlp2s0
```

## Securely erase/replace free space on disk
```bash
# Example. Replace 'Desktop' with desired path
sfill -v Desktop/
```
*Skip -v for less verbose output*

## Permissions

## Change permissions
```bash
# Change owner user and group on a directory or file
chown yourusername:yourgroup <directory or file>

# Make a file editable for owner and group
chmod 774 file.txt
```

### Find files not owned by user
```bash
sudo find ~yourusername/ \! -user yourusername -print
```

## Measure wireless (WiFi/WLAN) signal quality and strength
```bash
iwconfig

# Output example
wlp2s0  IEEE 802.11  ESSID:"Network Name"
        Mode:Managed  Frequency:2.472 GHz  Access Point: 1D:B7:2C:37:0F:D0
        Bit Rate=144.4 Mb/s   Tx-Power=22 dBm
        Retry short limit:7   RTS thr:off   Fragment thr:off
        Power Management:on
        Link Quality=53/70  Signal level=-57 dBm
        Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
        Tx excessive retries:0  Invalid misc:991   Missed beacon:0
```
*Look for `Signal level`, this example outputs -57dbm, a good signal. Not excellent, but good.*

## Count words in a plain text file
```bash
cat filename.txt | xargs -n1 | sort | uniq -c > newfilename.txt
```

## Diff - Find differences between two folders
```bash
diff -r dir1 dir2 | grep dir1 | awk '{print $4}' > difference1.txt
# For skipping pipe output to file
diff -rq dir1 dir2
```

## DU (disk usage)

### Find the biggest files in a directory (and subdirs)
```bash
du -Sh | sort -rh | head -20
```

### Directory size
```bash
du -sh *
```
