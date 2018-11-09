import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const {
  expect
} = chai;
chai.use(chaiHttp);

/* Test for get all products */
describe('Get Products', () => {
  it('it should GET all products', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .get('/api/v1/products')
          .set('accesstoken', token)
          .end((error, data) => {});
      });
    done();
  });
  it('should GET a specific product', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .get('/api/v1/products/2')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(2).to.equal(data.body.id);
            done();
          });
      });
  });
  it('should have a status 404 if product not available', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .get('/api/v1/products/10000000')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(404);
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

describe('Create New Product', () => {
  it('should create a new product', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .post('/api/v1/products')
          .send({
            productname: 'Ankara',
            description: 'Ankara for everybody',
            price: '400',
            quantity: 24,
            min: 14,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            done();
          });
      });
  });

  it('should return error if product already exists', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .post('/api/v1/products')
          .send({
            productname: 'Long Sleeve T shirt',
            description: 'Really cool stuff',
            price: '52000',
            quantity: 41,
            min: 25,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(402);
            expect(data.body.success).to.equal(false);
            done();
          });
      });
  });

  it('it should return unauthorized user if user not admin', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
        type: 'attendant',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .post('/api/v1/products')
          .send({
            productname: 'Ankara',
            description: 'Ankara for everybody',
            price: '400',
            quantity: 24,
            min: 14,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });

  it('it should return error if req has no data', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .post('/api/v1/products')
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

describe('Update Product', () => {
  it('should update a product', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .put('/api/v1/products/2')
          .send({
            productname: 'Ankaraq',
            description: 'Ankaraq for everybody',
            price: '400',
            quantity: 24,
            min: 14,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(data.body.productname).to.equal('Ankaraq');
            done();
          });
      });
  });

  it('it should return unauthorized user if user not admin', (done) => {
    chai.request(app).put('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
        type: 'attendant',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .put('/api/v1/products/2')
          .send({
            productname: 'Ankara',
            description: 'Ankara for everybody',
            price: '400',
            quantity: 24,
            min: 14,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });

  it('it should return error if req has no data', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .put('/api/v1/products/2')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            done();
          });
      });
  });

  it('it should have status 401 if user not logged in', (done) => {
    chai.request(app).put('/api/v1/products/2')
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

describe('Delete Product', () => {
  it('should delete a product', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
        type: 'admin',
      })
      .end((err, res) => {
        const token = res.body;
        chai.request(app)
          .delete('/api/v1/products/2')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(data.body.message).to.equal('Product deleted!');
            expect(data.body.success).to.equal(true);
            done();
          });
      });
  });
});
