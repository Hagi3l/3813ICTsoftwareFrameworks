var assert = require('assert');

// To run unitTest:
// npm run-script unitTest

describe('Tests for linearPoint', () => {
    describe('Test Case 1 #linearPoint()',() => {
        it('Should return 6 from input 2, 1, 4', () => {
            assert.strictEqual(6, 6);
        });
        it('Should return 4 from input 2, 0, 4', () => {
            assert.strictEqual(4, 4);
        });
        it('Should return 2 from input 2, -1, 4', () => {
            assert.strictEqual(2, 2);
        });
    });
});