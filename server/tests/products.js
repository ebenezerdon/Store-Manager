import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

  /* Test for get all products */
describe('/GET products', () => {
  it('it should GET all the products', (done) => {
    chai.request(app)
      .get('/api/v1/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });
});

/* Test for single product */
describe('Get A Product', () => {
  it('it should return a specific product', (done) => {
    chai.request(app).get('/api/v1/products/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(1).to.equal(res.body.id);
        done();
      });
  });

  it('it should have a status 404', (done) => {
    chai.request(app).get('/api/v1/products/1000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('string');
        done();
      });
  });
});

/* Test for create new product */
describe('Create New Product', () => {
  it('it should POST a new product', (done) => {
    chai.request(app).post('/api/v1/products')
      .send({
        name: 'Ankara',
        description: 'Akara for everybody',
        quantity: '4',
        price: '₦5500',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('it should have status 400 if no data is sent', (done) => {
    chai.request(app).post('/api/v1/products')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});