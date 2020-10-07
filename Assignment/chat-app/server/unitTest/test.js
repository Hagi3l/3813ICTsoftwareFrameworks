let assert = require('assert');
let app = 'http://localhost:3000/';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);


describe('Server API testing', function() {

    before(() => { console.log('before test'); });
    after(() => { console.log('after test'); });

    describe('testing getting users - api/users (get)', () => {
            it('should return all users', (done) => {
            chai.request(app)
                .get('api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
            });
        });
    });

    describe('testing getting groups - api/get-groups (get)', () => {
        it('should return all groups', (done) => {
            chai.request(app)
                .get('api/get-groups')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
            });
        });
    });

    describe('testing getting channels - api/get-channels/ (get)', () => {
        it('should return all channels in the group', (done) => {
            var group_id = '5f7005865006b8453028d4cd';
            chai.request(app)
                .get('api/get-channels/'+group_id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
            });
        });
    });

    describe('testing login auth - api/login-auth/ (post)', () => {
        it('should fail due to hashing', (done) => {
            chai.request(app)
                .post('api/login-auth')
                .type('form')
                .send({"username": "rand", "password": "rand" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
            });
        });
    });

});
