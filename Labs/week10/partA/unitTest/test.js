var assert = require('assert');
var linearPoint = require('../linearPoint');

// To run unitTest:
// npm run-script unitTest

describe('Tests for linearPoint', () => {
    describe('Test Case 1 #linearPoint()',() => {
        it('Should return 6 from input 2, 1, 4', () => {
            assert.strictEqual(linearPoint(2, 1, 4), 6);
        });
        it('Should return 4 from input 2, 0, 4', () => {
            assert.strictEqual(linearPoint(2, 0, 4), 4);
        });
        it('Should return 2 from input 2, -1, 4', () => {
            assert.strictEqual(linearPoint(2, -1, 4), 2);
        });
    });
});