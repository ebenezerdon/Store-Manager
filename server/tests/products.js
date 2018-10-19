import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

/* Test for get all products */
describe('Get Products', () => {
  it('it should GET all the products', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        email: 'joshodogwu@gmail.com', 
        password: 'realsecret',
        type: 'attendant',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).get('/api/v1/products')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(data.body).to.be.an('array');
            done();
          });
      });
  });

  it('it should return unauthorized user if user not logged in',
   (done) => {
    chai.request(app).get('/api/v1/products')
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Get A Product', () => {
  it('it should return a specific product', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        email: 'joshodogwu@gmail.com', 
        password: 'realsecret',
        type: 'attendant',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).get('/api/v1/products/1')
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
        email: 'joshodogwu@gmail.com', 
        password: 'realsecret',
        type: 'attendant',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).get('/api/v1/products/1000')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(data.body.message).to.equal(`Product with id ${id} not found.`);
            done();
          });
      });
  });

  it('returns unauthorized because user is not logged in', (done) => {
    const id = 2;
    chai.request(app).get(`/api/v1/products/${id}`)
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Create New Product', () => {
  it('create a new product', (done) => {
    chai.request(app).post('/api/v1/login')
      .send({
        email: 'sarahbeth@gmail.com', 
        password: 'supersecretstuff',
        type: 'admin',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).post('/api/v1/products')
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
        email: 'sarahbeth@gmail.com', 
        password: 'supersecretstuff',
        type: 'admin',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app).post('/api/v1/products')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            done();
          });
      });
  });

  it('it should have status 401 if user not logged in', (done) => {
    chai.request(app).post('/api/v1/products')
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
