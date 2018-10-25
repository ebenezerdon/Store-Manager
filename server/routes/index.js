import express from 'express';
import products from '../controllers/api1/products';
import sales from '../controllers/api1/sales';
import users from '../controllers/api1/users';
import { authenticate, verifyAdmin, verifyAttendant } from '../middleware/verify';

const router = express.Router();

/* GET home page. */
/* router.get('/', (req, res, next) => {
  res.send('index.html');
}); */

/* Products Router */
router.get('/products', authenticate, products.getAll);
router.get('/products/:id', authenticate, products.getOne);
router.post('/products', authenticate, verifyAdmin, products.addProduct);

/* Sales Router */
router.get('/sales', authenticate, verifyAdmin, sales.getAll);
router.get('/sales/:id', authenticate, sales.getOne);
router.post('/sales', authenticate, verifyAttendant, sales.addSale);

/* Users Router */
router.get('/users', authenticate, verifyAdmin, users.getAll);
router.get('/users/:id', authenticate, verifyAdmin, users.getOne);
router.post('/users', authenticate, verifyAdmin, users.addUser);
router.post('/login', users.loginUser);

export default router;
