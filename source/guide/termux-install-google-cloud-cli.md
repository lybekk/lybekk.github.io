---
permalink: "/guide/termux-install-google-cloud-cli"
title: "Termux: Install Google Cloud CLI"
date: 2021-01-16
description: "Install gcloud CLI to access Google Cloudh Shell through SSH on Android using Termux"
tags: ["Termux", "Google", "Google Cloud", "CLI", "Android", "Guide"]
---

> These instructions specifically targets the following error during installation:
> <samp class="error" style="display: inline-block;">ERROR: (gcloud.components.update) The following components are unknown [anthoscli, kuberun].</samp>

1. First: Run 
    * `curl https://sdk.cloud.google.com | bash`
    * *Note: This will fail when trying to install components. Ignore this.*
2. Then `~/google-cloud-sdk/install.sh --override-components` 
    * (without specifying components)
    * Will add gcloud to $PATH
3. And then `gcloud components install gsutil`
4. Finally `gcloud init`

Google cloud's shell can finally be accessed with `gcloud cloud-shell ssh`
