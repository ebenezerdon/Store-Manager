import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const {
  expect,
} = chai;
chai.use(chaiHttp);

/* Test for get all sales */
describe('Get sales', () => {
  it('it should GET all sales record', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/sales')
          .set('accesstoken', token)
          .end((error, data) => {});
      });
    done();
  });
  it('should GET a specific sale record', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/sales/1')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(1).to.equal(data.body.id);
            done();
          });
      });
  });
  it('should GET attendant sale record', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/sales/users/41')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(41).to.equal(data.body[0].attendant_id);
            done();
          });
      });
  });
  it('it should return status 400 if id not valid', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/sales/d')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            done();
          });
      });
  });
  it('GET should return unauthorized user if user not admin', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/sales')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });
  it('POST should return unauthorized user if user not attendant', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .post('/api/v1/sales')
          .send({
            productname: 'Ankara',
            productid: 4,
            price: '56',
            quantity: 5,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });
  it('should have a status 404 if sale not available', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .get('/api/v1/sales/1000000000')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(404);
            done();
          });
      });
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

describe('Create New sale', () => {
  it('it should create a new sale', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .post('/api/v1/sales')
          .send({
            productname: 'Ankara',
            productid: 4,
            price: '56',
            quantity: 5,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(201);
            done();
          });
      });
  });

  it('should return error if req has no data', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .post('/api/v1/sales')
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
        productname: 'Ankara',
        productid: 4,
        price: '56',
        quantity: 5,
        attendant_id: 45,
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Update sales record', () => {
  it('it should update sales record', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .put('/api/v1/sales/1')
          .send({
            productname: 'Ankara',
            productid: 4,
            price: '56',
            quantity: 5,
            attendant_id: 45,
          })
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(data.body.productname).to.equal('Ankara');
            done();
          });
      });
  });

  it('it should return unauthorized user if user not admin', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .put('/api/v1/sales/1')
          .send({
            productname: 'Ankara',
            productid: 4,
            price: '56',
            quantity: 5,
            attendant_id: 45,
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
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .put('/api/v1/sales/2')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(400);
            done();
          });
      });
  });

  it('it should have status 401 if user not logged in', (done) => {
    chai.request(app).put('/api/v1/sales/2')
      .send({
        id: 3,
        productname: 'Ankara',
        productid: 4,
        price: '56',
        quantity: 5,
        attendant_id: 45,
      })
      .end((error, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Delete sale record', () => {
  it('should delete a sale record', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'admin@gmail.com',
        password: 'adminpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .delete('/api/v1/sales/2')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(200);
            expect(data.body.message).to.equal('Sale record deleted!');
            expect(data.body.success).to.equal(true);
            done();
          });
      });
  });

  it('it should return unauthorized user if user not admin', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({
        emailaddress: 'attendant@gmail.com',
        password: 'attendantpassword',
      })
      .end((err, res) => {
        const { token } = res.body;
        chai.request(app)
          .delete('/api/v1/sales/2')
          .set('accesstoken', token)
          .end((error, data) => {
            expect(data).to.have.status(401);
            done();
          });
      });
  });
});
