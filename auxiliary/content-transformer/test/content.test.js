const fs = require('fs');
const { test } = require('gray-matter');
const { ContentTransformer } = require("../dist/index");

const globalContentTransformer = new ContentTransformer({developmentMode: true});
globalContentTransformer.saveToCache()

 /**
  * Generate content report
  * @param {*} dirCache 
  */
function generateReport(dirCache = './cache', print = false) {
    if (!fs.existsSync(dirCache)){
        fs.mkdirSync(dirCache)
    }
    const lines = []

    const addIt = txt => {
        lines.push(txt);
        if (print) console.log(txt);
    }

    for (const [key, value] of Object.entries(globalContentTransformer.contentBatch)) {
        const txt = `${key}: ${value.length}`;
        addIt(txt)
    }

    if (globalContentTransformer.contentBatch.unpublished) addIt('\nunpublished:');
    for (x of globalContentTransformer.contentBatch.unpublished) {
        const txt = `    ${x.data.title}`
        addIt(txt)
    }

    fs.writeFileSync(
        `${dirCache}/report.txt`,
        lines.join('\n')
    )
}

describe('File testing', () => {
    generateReport();
    const arr = Object.keys(globalContentTransformer.contentBatch);
    it.each(arr)('Test if %s exists', key => {
        const fileExists = fs.existsSync(`./cache/${key}.json`);
        expect(fileExists).toBeTruthy()
    })

    const filePublished = fs.readFileSync(`./cache/published.json`);
    const publishedList = JSON.parse(filePublished);
    it('All published entries must contain minimum properties', () => {
        for (const post of publishedList) {
            const tests = [
                post.hasOwnProperty('content'),
                post.hasOwnProperty('excerpt'),
                post.data.hasOwnProperty('title'),
                post.data.hasOwnProperty('date'),
                post.data.hasOwnProperty('description'),
                post.data.hasOwnProperty('tags'),
                post.data.hasOwnProperty('published'),
            ]
            const hasAllProperties = tests.every(x => x === true);
            expect(hasAllProperties).toBeTruthy();
        }
    })

    it('Published entries must not contain property private', () => {
        for (const post of publishedList) {
            expect(post.data.hasOwnProperty('private')).not.toBeTruthy()
        }
    })

})

test(`Report exists`, () => {
    const file = fs.readFileSync(`./cache/report.txt`);
    const fileExists = fs.existsSync(`./cache/report.txt`);
    expect(file.length).toBeGreaterThan(10);
    expect(fileExists).toBeTruthy()
})
