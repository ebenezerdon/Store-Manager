import express from 'express';
import products from '../controllers/api1/products';
import sales from '../controllers/api1/sales';
import users from '../controllers/api1/users';
import verify from '../middleware/verify';
const router = express.Router();

const auth = verify.authentication;
const verifyAdmin = verify.Admin;
const verifyAttendant = verify.Attendant;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('index.html');
});

/* Products Router */
router.get('/products', auth, products.getAll);
router.get('/products/:id', auth, products.getOne);
router.post('/products', auth, verifyAdmin, products.addProduct);

/* Sales Router */
router.get('/sales', auth, verifyAdmin, sales.getAll);
router.get('/sales/:id', auth, sales.getOne);
router.post('/sales', auth, verifyAttendant, sales.addSale);

/* Users Router */
router.get('/users', users.getAll);
router.get('/users/:id', users.getOne);
router.post('/users', users.addUser);
router.post('/login', users.loginUser);

export default router;