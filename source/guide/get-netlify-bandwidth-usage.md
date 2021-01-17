---
permalink: "/guide/get-netlify-bandwidth-usage"
title: "How to: Get Netlify Bandwith Usage Programatically For Free"
firstPublished: 2020-07-27
date: 2020-10-14
description: "A how-to on getting your account bandwidth usage on Netlify for free, either using Javascript or Python."
tags: ["Netlify", "Python", "JavaScript", "Guide"]
---

import NetlifyBandwidthUsage from '../../../src/components/tools/netlifyBandwidthUsage'

Netlify's Analytics feature, at the time of writing, costs 9$. This may be a bit steep if all you need is to measure your site's traffic. This is an attempt on a livable compromise.

## Using Python

### Explanation

*In the script below, replace the following variable's values*

<dl>
    <dt style="font-weight: bold;">ACCOUNT_NAME</dt>
    <dd>The account name associated with the account.</dd>
    <dt style="font-weight: bold;">SITE_NAME</dt>
    <dd>The site name can be found in 'Site information' in the project's settings, or at the top in the overview.</dd>
    <dt style="font-weight: bold;">EMAIL</dt>
    <dd>The email used during account registration.</dd>
    <dt style="font-weight: bold;">PERSONAL_ACCESS_TOKEN</dt>
    <dd>Created at https://app.netlify.com/user/applications</dd>        
</dl>

### Full Python script

```python
import requests

# Edit these
ACCOUNT_NAME = 'youraccountname'
SITE_NAME = 'projectsitename'
EMAIL = 'name@example.com'
PERSONAL_ACCESS_TOKEN = "longlonglongstringgeneratedbynetlify"

# Leave the rest
bandwidth_api_url = 'https://api.netlify.com/api/v1/accounts/{}/bandwidth'.format(ACCOUNT_NAME)

auth_string = "Bearer " + PERSONAL_ACCESS_TOKEN

response = requests.get(bandwidth_api_url, headers = {
    'User-Agent': '{0} ({1})'.format(SITE_NAME, EMAIL),
    "Authorization": auth_string
})
response = response.json()

# Optional printing to console. Can be removed
print('Raw response: ', response)

def calculate(key):
    return int(response[key]) / 1000000

print_list = {
    "Included in plan": calculate("included"),
    "Used": calculate("used"),
    "Remaining":  calculate("included") - calculate("used"),
}
print('Human readable:')
for item in print_list.items():
    print(item[0], ': ', round(item[1], 2), ' MB')
```
*Note: The returned usage will be a bit higher than how Netlify calculates it.*

## Netlify Bandwidth Checker Tool

If you are comfortable pasting your **Personal Access Token** in a web form, try this tool, which does the same as the Python script, only in JavaScript.
One way to mitigate risk is to create a token, and revoke it just after using this tool.

*Note: The script is executed client-side. No information is exchanged with lybekk.tech*

<NetlifyBandwidthUsage />
