const { exception } = require('console');
const fs = require('fs');
const { test } = require('gray-matter');
const { ContentTransformer } = require("../dist/index");

const defaultContentSourceDirectory = './content';

it.todo('Test deep copying environment variable')
//const envVarCopy = process.env.LYBEKK_TECH_CONTENT_DIR.slice()

it('Use environment variable as source dir', () => {
    const env_lt = process.env.LYBEKK_TECH_CONTENT_DIR;
    const ct = new ContentTransformer();
    expect(ct.contentSource).not.toBe(defaultContentSourceDirectory);
    expect(ct.contentSource).toBe(env_lt);
});

it('Development mode set to true', () => {
    const ct = new ContentTransformer({
        developmentMode: true,
    });
    expect(ct.isDevelopmentMode).toBeTruthy();
});

it('Get public data - development mode off', () => {
    const ct = new ContentTransformer();
    const ctb = ct.contentBatch;
    expect(ctb.published.length).toBeGreaterThan(10);
    expect(ctb.unpublished).toBeUndefined();
    expect(ctb.unknowns).toBeUndefined();
});


describe('Cache tests', () => {
    const ct = new ContentTransformer();
    it.todo('Delete cache dir')
    it.todo('See if cache dir exists after deleting')
    const result = ct.saveToCache();
    it.todo('See if cache dir exists after mkdirSync')

    it('Saving to cache works', () => {
        expect(result).toBeTruthy()
    })

})


describe('Tests requiring environment variable unset', () => {
    it('Set content source dir with constructor', () => {
        delete process.env.LYBEKK_TECH_CONTENT_DIR;
        const testDir = '../../someOtherDir';
        const options = {
            contentSourceDirectory: testDir
        }
        const ct = new ContentTransformer(options);
        expect(ct.contentSource).toBe(options.contentSourceDirectory);
    });

    it('No content source dir defined', () => {
        delete process.env.LYBEKK_TECH_CONTENT_DIR;
        const ct = new ContentTransformer();
        expect(ct.contentSource).toBe(defaultContentSourceDirectory);
    });
})
