const chai = require('chai');
const chaiHttp = require('chai-http');
const { userTest,courseTest, dbReq } =require('./fixtures/datab.js') 
const app = require( '../src/index.js')
const should = chai.should();

chai.use(chaiHttp)

beforeEach(dbReq)

describe('Creating Course', () => {
    it('should create New Course', (done) => {
        let course = {
            name: 'asdfgh',
            desc:'ghjkl',
            duration:50,
            owner:'uyruyt'

        }
        chai
            .request(app)
            .post('/api/course/new')
            .set('Authorization', `Bearer ${userTest.token}`)
            .send(course)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('success').eql(true)
                done();
            });
    });
});

describe('Get Courses', () => {
    it('should get courses', (done) => {
        chai 
            .request(app)
            .get('api/course/get')
            .set('Authorization', `Bearer ${userTest.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('success').eql(true)
                done();
        });
    });
});

describe('Get Courses by Name', () => {
    it('should get courses by name', (done) => {
        chai 
            .request(app)
            .get(`api/course/getbyname/${courseTest.name}`)
            .set('Authorization', `Bearer ${userTest.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('success').eql(true)
                done();
        });
    });
});

describe('Get Courses by Owner', () => {
    it('should get courses by Owner', (done) => {
        chai 
            .request(app)
            .get(`api/course/get/${courseTest.owner}`)
            .set('Authorization', `Bearer ${userTest.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('success').eql(true)
                done();
        });
    });
});

describe('Update Course', () => {
    it('should patch course details', (done) => {
        let course = {
            name: 'CVBN'
        }
        chai
            .request(app)
            .patch(`api/course/update/${courseOne._id}`)
            .set('Authorization', `Bearer ${userTest.token}`)
            .send(course)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('success').eql(true)
                done();
            });
    });
});

describe('Upload Files', () => {
    it('should upload files', (done) => {
      chai
        .request(app)
        .post('api/course/uploadfile')
        .set('Authorization', `Bearer ${userTest.token}`)
        .attach('file', (''))
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('success').eql(true)
          done();
        });
    });
});

describe('Upload Video', () => {
    it('should upload Video', (done) => {
      chai
        .request(app)
        .post('api/course/uploadvideo')
        .set('Authorization', `Bearer ${userTest.token}`)
        .attach('file', (''))
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('success').eql(true)
          done();
        });
    });
});


describe('Course Delete', () => {
    it('should delete the course', (done) => {
        chai
            .request(app)
            .delete(`/course/delete/${courseOne._id}`)
            .set('Authorization', `Bearer ${userTest.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true),
                res.body.should.have.property('data');
                done();
            });
    });
});