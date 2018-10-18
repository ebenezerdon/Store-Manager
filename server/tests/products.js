import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import 'babel';
let should = chai.should();

chai.use(chaiHttp);

/* Test the /GET route */
describe('/GET products', () => {
  it('it should GET all the products', (done) => {
    chai.request(app)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

/* Test for single product */
describe('/Get Product/:id', () => {
  it('it should Get a single product', (done) => {
    chai.request(app)
    .get('/api/v1/products/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.id.should.be(2);
        done();
      });
  });
});

/* Test for Create new product */
describe('Create New Product', () => {
  it('it should POST a new product', (done) => {
    chai.request(app)
    .post('/api/v1/products')
      .send({
        name: 'Ankara', 
        description: 'Akara for everybody', 
        quantity: '4', 
        price: '₦5500',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});