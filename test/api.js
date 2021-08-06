let server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Test APIs', () => {

    it("Test GET route /video/getAll", (done) => {
        chai.request(server)
        .get('/api/video/getAll')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.not.be.eq(0);
        done();
        })
    })

    it("Test GET route by id /video/getVideo/:id", (done) => {
        chai.request(server)
        .get('/api/video/getVideo/606b111618f92f05c4aa3165')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.not.be.eq(0);
        done();
        })
    })    
})