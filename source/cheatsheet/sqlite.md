---
title: "SQLite"
date: 2020-06-25
description: "SQLite tip snippets"
tags: ["SQLite", "Database","Cheatsheet"]
layout: layouts/post.njk
---

## Copy specific columns from one table and insert into a different table

```sql
INSERT INTO destination_table (field1, field2) 
SELECT field1,field2 
FROM 'source_table';
```

## Copy content in one column to another column within the same table

```sql
update tableName 
set destinationField = sourceField;
```

> Warning! 
> Replaces all content in destination fields

## Insert UUIDs in empty cells
```python
import sqlite3
import uuid

db = 'database.db'

sql_find_id = ''' SELECT idcolumn,rowid 
                        FROM tablename 
                        WHERE idcolumn IS NULL 
                        LIMIT 1
'''
sql_insert_uuid = ''' UPDATE tablename SET idcolumn=? WHERE rowid=?
'''
sql_find_id_after = ''' SELECT idcolumn,rowid 
                        FROM tablename 
                        WHERE idcolumn=? 
'''

conn = sqlite3.connect(db)
c = conn.cursor()
c.execute(sql_find_id)
nullornot = c.fetchone()[0]
while nullornot == None:
    try:
        c.execute(sql_find_id)
        nullornot = c.fetchone()[0]
    except:
        break
    c.execute(sql_find_id)
    rowid = c.fetchone()[1]
    genuuid = str(uuid.uuid4())
    c.execute(sql_insert_uuid, (genuuid,rowid,))
    c.execute(sql_find_id_after, (genuuid,))
    try:
        c.execute(sql_find_id)
        nullornot = c.fetchone()[0]
    except:
        print("All done")
conn.commit()
conn.close()
```
