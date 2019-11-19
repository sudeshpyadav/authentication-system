process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
let token = "";
describe('POST /auth/register', () => {
    it('It should register the new user', (done) => {
        data = {
            username: "sudesh",
            password: "password"
        };
        chai.request(server).post('/auth/register').send(data).end((err, res) => {
            res.should.have.status(201);
            done();
        });
    })
});

describe('POST /auth/login', () => {
    it('It shold login the user and return auth token', (done) => {
        data = {
            username: "sudesh",
            password: "password"
        };
        chai.request(server).post('/auth/login').send(data).end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("token");
            token = res.body.token;
            done();
        });
    })
});

describe('/GET users', () => {
   it('It should get all the users', (done) => {
        chai.request(server).get('/users').set('Authorization', `Beares ${token}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            // res.body.length.should.be.eql(1);
            done()
        });
   })
});