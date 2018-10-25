import express from 'express';
import {
  getAllProducts, getOneProduct, addProduct,
} from '../controllers/productsController';
import {
  getAllSales, getOneSale, addSale,
} from '../controllers/salesController';
import {
  getAllUsers, getOneUser, addUser, loginUser,
} from '../controllers/usersController';
import { authenticate, verifyAdmin, verifyAttendant } from '../middleware/verify';
import { 
  validateUserInput, validateProductInput, validateSaleInput
} from '../middleware/validateInput';

const router = express.Router();

/* GET home page. */
/* router.get('/', (req, res, next) => {
  res.send('index.html');
}); */

/* Products Router */
router.get('/products', authenticate, getAllProducts);
router.get('/products/:id', authenticate, getOneProduct);
router.post('/products', authenticate, verifyAdmin, validateProductInput, addProduct);

/* Sales Router */
router.get('/sales', authenticate, verifyAdmin, getAllSales);
router.get('/sales/:id', authenticate, verifyAdmin, getOneSale);
router.post('/sales', authenticate, verifyAttendant, validateSaleInput, addSale);

/* Users Router */
router.get('/users', authenticate, verifyAdmin, getAllUsers);
router.get('/users/:id', authenticate, verifyAdmin, getOneUser);
router.post('/users', authenticate, verifyAdmin, validateUserInput, addUser);
router.post('/login', loginUser);

export default router;
