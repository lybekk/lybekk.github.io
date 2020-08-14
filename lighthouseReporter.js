const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fetch = require('node-fetch');
var xml2js = require('xml2js');

let reportObjectCondensed = {
    testRunTime: new Date().toISOString(),
    items: [],
}

let reportObjectFull = []
let urlList = [];

function condensedReport(lhr) {
    let { performance, accessibility, seo, 'best-practices': bestPractices } = lhr.categories;
    let temp = {
        url: lhr.finalUrl,
        performance: performance.score,
        accessibility: accessibility.score,
        bestPractices: bestPractices.score,
        seo: seo.score,
    }
    reportObjectCondensed.items.push(temp)
}

async function fetchSitemap() {
    const x = await fetch('https://lybekk.tech/sitemap.xml');
    const sitemapResult = await x.text();
    var parser = new xml2js.Parser({ async: true });
    parser.parseStringPromise(sitemapResult).then(async function (result) {

        for await (let x of result.urlset.url) {
            urlList.push(x.loc[0])
        }
    })
        .catch(function (err) {
            console.log(err)
        });

}

async function runLighthouse() {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel: 'info', output: 'html', port: chrome.port };

    async function testURL(url) {
        const runnerResult = await lighthouse(url, options);
        const reportHtml = runnerResult.report;
        let filename = url.replace(/[/\\?%*:|"<>]/g, '-');
        fs.writeFileSync(`./reports/lhreport_${filename}.html`, reportHtml);
        reportObjectFull.push(runnerResult.lhr);
        condensedReport(runnerResult.lhr);
    }

    for await (let item of urlList) {
        await testURL(item);
    }

    await chrome.kill();
};


async function procedure() {
    await fetchSitemap();
    await runLighthouse();

    fs.writeFileSync('./reports/lhreport_full.json', JSON.stringify(reportObjectFull, null, 2));
    fs.writeFileSync('./reports/lhreport_condensed.json', JSON.stringify(reportObjectCondensed, null, 2));
}
procedure()
