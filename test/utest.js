const chai = require('chai');
const chaiHttp = require('chai-http');
const { userTest,courseTest, dbReq } =require('./fixtures/datab.js') 
const app = require( '../src/index.js')
const should = chai.should()

chai.use(chaiHttp)

beforeEach(dbReq)





describe('Creating User', () => {
    it('should create new user', (done) => {
      let user = {
        name: 'ABc',
        email: 'aBc@gmail.com',
        role: 'Teacher',
        password: 'abcdefghijk'
        
      }
      chai
        .request(app)
        .post('/api/user/new')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.have.property('success').eql(true)
          res.body.data.should.have.property('name')
          res.body.data.should.have.property('email')
          res.body.data.should.have.property('password')
          res.body.data.should.have.property('role')
          doeon()
        })
    })
  })

describe('Loging in User', () => {
  it('should log the User', (done) => {
    chai
      .request(app)
      .post('/api/user/login')
      .send({
        email: userTest.email,
        password: userTest.password,
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('success').eql(true)
        res.body.should.be.a('object')
        doeon()
      })
  })
})

describe('Logging Out', () => {
    it('must log the user out', (done) => {
      chai
        .request(app)
        .post('/api/user/logout')
        .set('Authorization', `Bearer ${userTest.token}`)
        .end((err, res) => {
          res.body.should.be.a('object')
          done()
        })
    })
  })

describe('get all users', () => {
  it('should get all the users', (done) => {
    chai
      .request(app)
      .get('/api/user/get')
      .set('Authorization', `Bearer ${userTest.token}`)
      .end((err, res) => {
        res.should.have.status(302)
        res.body.should.be.a('object')
        res.body.should.have.property('success').eql(true)
        done()
      })
  })
})

describe('get all teachers', () => {
    it('should get all the teachers', (done) => {
      chai
        .request(app)
        .get('/api/user/getteachers')
        .set('Authorization', `Bearer ${userTest.token}`)
        .end((err, res) => {
          res.should.have.status(302)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          done()
        })
    })
  })
describe('get all students', () => {
    it('should get all the students', (done) => {
      chai
        .request(app)
        .get('/api/user/getstudents')
        .set('Authorization', `Bearer ${userTest.token}`)
        .end((err, res) => {
          res.should.have.status(302)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          done()
        })
    })
  })



describe('update User', () => {
    it('Should update an existing user', (done) => {
      chai
        .request(app)
        .patch(`/api/user/update/${userTest._id}`)
        .set('Authorization', `Bearer ${userTest.token}`)
        .send({
          mobile:1234567890
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })

describe('User Delete', () => {
    it('should delete current user', (done) => {
        chai
            .request(app)
            .delete(`/api/user/delete/${userTest._id}`)
            .set('Authorization', `Bearer ${userTest.token}`)
            .end((err,res) => {
                res.should.have.status(200)
                res.body.should.have.property('success').eql(true)
                done()
            })
    })
})
