import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);
/* Test for all sale records */
describe('/GET sales', () => {
  it('it should GET all sale records', (done) => {
    chai.request(app)
      .get('/api/v1/sales')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });
});

/* Test for single sale record*/
describe('Get A sale', () => {
  it('it should return a specific sale record', (done) => {
    chai.request(app).get('/api/v1/sales/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(1).to.equal(res.body.id);
        done();
      });
  });

  it('it should have a status 404', (done) => {
    chai.request(app).get('/api/v1/sales/1000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('string');
        done();
      });
  });
});

describe('Create New sale record', () => {
  it('it should POST a new sale record', (done) => {
    chai.request(app).post('/api/v1/sales')
      .send({
        productId: '3',
        productName: 'Akara',
        AttendantId: '4',
        price: '₦5500',
        quantity: '25',
        totalPrize: '₦57000',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('it should have status 400 if no data is sent', (done) => {
    chai.request(app).post('/api/v1/sales')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});