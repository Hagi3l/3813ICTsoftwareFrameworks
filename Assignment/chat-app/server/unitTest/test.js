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

    describe('api/get-groups (get)', () => {
        it('should return all groups', () => {
            http.get(url + 'api/get-groups', (res) => {

                assert.strictEqual(res.statusCode, 200);
                assert.strictEqual(res.statusMessage, 'OK');
                res.on('end', () => {
                    assert.strictEqual(body, body.exists());
                });
            });
        });
    });

    describe('api/get-channels/ (get)', () => {
        it('should return all channels in the group', () => {
            var group_id = '5f7005865006b8453028d4cd';
            http.get(url + 'api/get-channels/'+group_id, (res) => {
                assert.strictEqual(res.statusCode, 200);
                assert.strictEqual(res.statusMessage, 'OK');
                res.on('end', () => {
                    assert.strictEqual(body[0].group_id, group_id);
                });
            });
        });
    });

});
