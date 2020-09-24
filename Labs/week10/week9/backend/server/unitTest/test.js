let assert = require('assert');
let app = require('../server.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

// To run unitTest:
// npm run-script unitTest

describe('Tests for Server endpoints (API Calls)', () => {
    before(() => { console.log('before the test'); });
    after(() => { console.log('after the test'); });

    describe('Add Product Route (POST)', () => {
        it('it should Insert(POST) a product', (done) => {
            chai.request(app)
                .post('/add')
                .type('form')
                .send({"id": 1337, "name": "testName", "description": "testDesc", "price": 1337, "units": 1337 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('num');
                    res.body.should.have.property('err');
                    res.body.err.eql(null);
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('Read Products Route (GET)', () => {
        it('it should GET all products', (done) => {
            chai.request(app)
                .get('/read')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('Update Product Route (POST)', () => {
        it('it should Update(POST) a product', (done) => {
            chai.request(app)
                .post('/update')
                .type('form')
                .send({"objid": 1337, "name": "testNameUpdate", "description": "testDescUpdate", "price": 7331, "units": 7331 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('ok');
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('Remove Product Route (POST)', () => {
        it('it should Remove(POST) a product', (done) => {
            chai.request(app)
                .post('/remove')
                .type('form')
                .send({ "productid": 1337 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('Get Product Info Route (POST)', () => {
        it('it should return Product information', (done) => {
            chai.request(app)
                .post('/get_item')
                .type('form')
                .send({ "productid": 1337 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('Check ID against form data (POST)', () => {
        it('it should return allowed or not', (done) => {
            chai.request(app)
                .post('/checkID')
                .type('form')
                .send({ "id": 1337 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success');
                    res.body.success.eql(1);
                    res.body.should.have.property('topnum');
                    res.body.topnum.eql(0);
                    console.log(res.body);
                    done();
                });
        });
    });


});