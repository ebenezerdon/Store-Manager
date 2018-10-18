import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import 'babel';
let should = chai.should();

chai.use(chaiHttp);

/* Test the /GET route */
describe('/GET sales', () => {
  it('it should GET all the sale records', (done) => {
    chai.request(app)
      .get('/api/v1/sales')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

/* Test for single sale record */
describe('/Get sale/:id', () => {
  it('it should Get a single sale record', (done) => {
    chai.request(app)
    .get('/api/v1/sales/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.id.should.be(2);
        done();
      });
  });
});

/* Test for Create new sale record */
describe('Create New sale record', () => {
  it('it should POST a new sale record', (done) => {
    chai.request(app)
    .post('/api/v1/sales')
      .send({
        productName: 'Ankara', 
        attendantId: 'Akara for everybody', 
        price: '900', 
        quantity: '5',
        totalprice: '₦5500',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});