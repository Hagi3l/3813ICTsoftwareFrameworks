var assert = require('assert');
var http = require('http');

var url = 'http://localhost:3000/';

describe('Server API testing', function() {

    before(() => { console.log('before test'); });
    after(() => { console.log('after test'); });

    describe('api/users (get)', () => {
        it('should return all users', () => {
            http.get(url + 'api/users', (res) => {

                assert.strictEqual(res.statusCode, 200);
                assert.strictEqual(res.statusMessage, 'OK');
                res.on('end', () => {
                    assert.strictEqual(body, body.exists());
                });

            });
        });
    });
});
