const preparedContent = require('../source/_data/icons');
const heroBottomButtons = require('../source/_data/heroBottomButtons');
const assert = require('assert');

describe('module _data/icons returns icons', function() {
  it('envelope is string', function() {
    assert.strictEqual(typeof preparedContent.envelope, "string");
  });
});

describe('module _data/heroBottomButtons works', function() {
  it('all properties are strings', function() {
    const { data, html} = heroBottomButtons;
    let checkList = [html];
    data.forEach(element => {
      checkList = [ ...checkList, ...Object.values(element) ]
    });
    assert.strictEqual(checkList.every(item => typeof item === 'string'), true);
  });
});
