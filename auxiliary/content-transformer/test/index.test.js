const { ContentTransformer } = require("../dist/index");

const defaultContentSourceDirectory = './content';

test('Use environment variable as source dir', () => {
    const env_lt = process.env.LYBEKK_TECH_CONTENT_DIR;
    const ct = new ContentTransformer();
    expect(ct.contentSource).not.toBe(defaultContentSourceDirectory);
    expect(ct.contentSource).toBe(env_lt);
});

test('Development mode set to true', () => {
    const ct = new ContentTransformer({
        developmentMode: true,
    });
    expect(ct.isDevelopmentMode).toBeTruthy();
});

test('Get public data - development mode off', () => {
    const ct = new ContentTransformer();
    const ctb = ct.contentBatch;
    expect(ctb.published.length).toBeGreaterThan(10);
    expect(ctb.unpublished).toBeUndefined();
    expect(ctb.unknowns).toBeUndefined();
});

/* Tests requiring environment variable unset */

test('Set content source dir with constructor', () => {
    delete process.env.LYBEKK_TECH_CONTENT_DIR;
    const testDir = '../../someOtherDir';
    const options = {
        contentSourceDirectory: testDir
    }
    const ct = new ContentTransformer(options);
    expect(ct.contentSource).toBe(options.contentSourceDirectory);
});

test('No content source dir defined', () => {
    delete process.env.LYBEKK_TECH_CONTENT_DIR;
    const ct = new ContentTransformer();
    expect(ct.contentSource).toBe(defaultContentSourceDirectory);
});

