process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('/POST users', () => {
    it('It should save new user', (done) => {
        data = {
            name: "sudesh",
            password: "password"
        };
        chai.request(server).post('/users').send(data).end((err, res) => {
            res.should.have.status(201);
            done();
        });
    })
});

describe('/POST users/login', () => {
    it('It shold login the user', (done) => {
        data = {
            name: "sudesh",
            password: "password"
        };
        chai.request(server).post('/users/login').send(data).end((err, res) => {
            res.should.have.status(200);
            done();
        });
    })
});

describe('/GET users', () => {
   it('It should get all the users', (done) => {
        chai.request(server).get('/users').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done()
        });
   })
});