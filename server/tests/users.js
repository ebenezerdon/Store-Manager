import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const {
  expect,
} = chai;
chai.use(chaiHttp);

/* Test for get all users */
describe('Get users', () => {
  it('it should GET all users', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/users')
          .set('accesstoken', token)
          .end((error, data) => {});
      });
    done();
  });
  it('should GET a specific user', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/users/1')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(1).to.equal(data.body.id);
            done();
          });
      });
  });
  it('it should return status 401 if id not valid', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/users/d')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });
  it('GET should return unauthorized user if not from admin', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/users')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });
  it('POST should return unauthorized user if user not admin', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send({
            fullname: 'Josh Odogwu',
            emailaddress: 'joshodogwu@gmail.com',
            password: 'passswordy',
            role: 'admin',
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });
  it('it should have a status 404 if user not available', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/users/1000000000')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(404);
            done();
          });
      });
  });

  it('it should return unauthorized user if user not logged in',
    (done) => {
      chai.request(app).get('/api/v1/users')
        .end((error, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
});

describe('Create New user', () => {
  it('it should create a new user', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send({
            fullname: 'Josh Odogwu',
            emailaddress: 'joshodogwu@gmail.com',
            password: 'passswordy',
            role: 'attendant',
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(201);
            done();
          });
      });
  });
  it('it should return error if email already exists', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send({
            fullname: 'admin',
            emailaddress: 'admin@gmail.com',
            password: 'admin',
            
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            done();
          });
      });
  });

  it('it should have status 401 if user not logged in', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({
        name: 'Ankara',
        description: 'Ankara for everybody',
        quantity: '4',
        price: '₦5500',
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
