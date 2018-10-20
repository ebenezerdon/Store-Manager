import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

/* Test for get all sales */
describe('Get Sales', () => {
  it('it should GET all sale records', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        emailAdress: 'sarahbeth@gmail.com',
        password: 'supersecretstuff',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        expect(res).to.have.status(200);
        chai.request(app)
          .get('/api/v1/sales')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(data.body).to.be.an('array');
          });
      });
    done();
  });

  it('it should return unauthorized user if user not logged in',
    (done) => {
      chai.request(app).get('/api/v1/sales')
        .end((error, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
});

describe('Get A sale record', () => {
  it('it should return a specific sale record', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        emailAdress: 'joshodogwu@gmail.com',
        password: 'realsecret',
        type: 'attendant',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app).get('/api/v1/sales/1')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(1).to.equal(data.body.id);
            done();
          });
      });
  });

  it('it should have a status 404', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        emailAdress: 'joshodogwu@gmail.com',
        password: 'realsecret',
        type: 'attendant',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).get('/api/v1/sales/1000')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(404);
            expect(res.body).to.be.an('object');
            done();
          });
      });
  });

  it('it should return err if user not logged in', (done) => {
    chai.request(app).get('/api/v1/sales/2')
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Create New sale', () => {
  it('create a new sale', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        emailAdress: 'sarahbeth@gmail.com',
        password: 'supersecretstuff',
        type: 'admin',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).post('/api/v1/sales')
          .send({
            name: 'Ankara',
            description: 'Akara for everybody',
            quantity: '4',
            price: '₦5500',
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(201);
            expect(data.body).to.be.an('object');
            done();
          });
      });
  });

  it('it should return error if req has no data', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        emailAdress: 'sarahbeth@gmail.com',
        password: 'supersecretstuff',
        type: 'admin',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).post('/api/v1/sales')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            done();
          });
      });
  });

  it('it should have status 401 if user not logged in', (done) => {
    chai.request(app).post('/api/v1/sales')
      .send({
        name: 'Ankara',
        description: 'Akara for everybody',
        quantity: '4',
        price: '₦5500',
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
