import express from 'express';
import products from '../controllers/api1/products';
import sales from '../controllers/api1/sales';
import users from '../controllers/api1/users';
import verifyToken from '../middleware/verifytoken';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('index.html');
});

/* Products Router */
router.get('/products', verifyToken.authentication, products.getAll);
router.get('/products/:id', verifyToken.authentication, products.getOne);
router.post('/products', verifyToken.authentication, products.addProduct);

/* Sales Router */
router.get('/sales', sales.getAll);
router.get('/sales/:id', sales.getOne);
router.post('/sales', sales.addSale);

/* Users Router */
router.get('/users', users.getAll);
router.get('/users/:id', users.getOne);
router.post('/users', users.addUser);
router.post('/login', users.loginUser);

export default router;