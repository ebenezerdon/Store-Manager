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
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        chai.request(app).get('/api/v1/products')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(data.body).to.be.an('array');
            done();
          });
      });
  });

  it('returns unauthorized because user is not logged in', (done) => {
    chai.request(app).get('/api/v1/products')
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Get A Product', () => {
  it('returns details of a product', (done) => {
    chai.request(app).post('/api/v1/users/login')
      .send({
        email: 'example@gmail.com', password: '123456',
      })
      .end((err, res) => {
        const { token } = res.body;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        const id = 2;
        chai.request(app).get(`/api/v1/products/${id}`)
          .set('Authorization', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(id).to.equal(data.body.id);
            done();
          });
      });
  });

  it('return product not found error', (done) => {
    chai.request(app).post('/api/v1/users/login')
      .send({
        email: 'example@gmail.com', password: '123456',
      })
      .end((err, res) => {
        const { token } = res.body;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        const id = 89;
        chai.request(app).get(`/api/v1/products/${id}`)
          .set('Authorization', token)
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
    chai.request(app).post('/api/v1/users/login')
      .send({
        email: 'example@gmail.com', password: '123456',
      })
      .end((err, res) => {
        const { token } = res.body;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        chai.request(app).post('/api/v1/products')
          .send({
            name: 'Tecno', description: 'Tecno Phone', quantity: '2', price: '$200',
          })
          .set('Authorization', token)
          .end((error, data) => {
            expect(data).to.have.status(201);
            expect(data.body).to.be.an('object');
            expect(data.body.message).to.equal('Product added successfully');
            done();
          });
      });
  });

  it('return validation error if no data is sent', (done) => {
    chai.request(app).post('/api/v1/users/login')
      .send({
        email: 'example@gmail.com', password: '123456',
      })
      .end((err, res) => {
        const { token } = res.body;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        chai.request(app).post('/api/v1/products')
          .set('Authorization', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            expect(data.body).to.be.an('object');
            expect(data.body.name).to.equal('Name field is required');
            expect(data.body.description).to.equal('Description field is required');
            expect(data.body.price).to.equal('Price field is required');
            expect(data.body.quantity).to.equal('Quantity field is required');
            done();
          });
      });
  });

  it('returns unauthorized because user is not logged in', (done) => {
    chai.request(app).post('/api/v1/products')
      .send({
        name: 'Tecno', description: 'Tecno Phone', quantity: '2', price: '$200',
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
