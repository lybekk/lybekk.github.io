var fs = require('fs')
const navLinkGroups = require('../_data/navLinkGroups.js')
const indexHTML = fs.readFileSync('./_site/index.html',"utf-8")


describe(`Nav link groups`, () => {
    it(`function returns HTML ok - test 1`, () => {
        expect(navLinkGroups().html).toMatch(/<h2>Projects/)
    })

    test('function returns HTML ok - test 2', () => {
        expect(navLinkGroups().html).toMatch("<span>UUID Generator</span>")
        //expect(navLinkGroups().html).toHaveTextContent("<span>UUID Generator</span>")
    })

    test('Generated HTML from function is matched in _site/index.html ', () => {
      expect(indexHTML).toMatch(navLinkGroups().html)
    })

    test('if data is ok', () => {
        expect(navLinkGroups().data[0].name).toBe("Projects")
    })

})
