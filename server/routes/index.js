import express from 'express';
import products from '../controllers/api1/products';
import sales from '../controllers/api1/sales';
import users from '../controllers/api1/users';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('index.html');
});

/* Products Router */
router.get('/products', products.getAll);
router.get('/products/:id', products.getOne);
router.post('/products', products.addProduct);

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