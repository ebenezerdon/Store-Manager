import express from 'express';
import {
  getAllProducts, getOneProduct, addProduct, deleteProduct, updateProduct,
} from './controllers/productsController';
import {
  getAllSales, getOneSale, addSale, updateSale, deleteSale,
} from './controllers/salesController';
import {
  getAllUsers, getOneUser, addUser, updateUser, deleteUser, loginUser,
} from './controllers/usersController';
import { authenticate, verifyAdmin, verifyAttendant } from './middleware/verify';
import {
  validateUserInput, validateUserSignup, validateProductInput, validateSaleInput, validateId,
} from './middleware/validateinput';

const router = express.Router();

/* GET home page. */
/* router.get('/', (req, res, next) => {
  res.send('index.html');
}); */

/* Products Router */
router.get('/products', authenticate, getAllProducts);
router.get('/products/:id', authenticate, validateId, getOneProduct);
router.post('/products', authenticate, validateProductInput, verifyAdmin, addProduct);
router.put('/products/:id', authenticate, validateId, validateProductInput, verifyAdmin, updateProduct);
router.delete('/products/:id', authenticate, verifyAdmin, deleteProduct);

/* Sales Router */
router.get('/sales', authenticate, verifyAdmin, getAllSales);
router.get('/sales/:id', authenticate, verifyAdmin, validateId, getOneSale);
router.post('/sales', authenticate, verifyAttendant, validateSaleInput, addSale);
router.get('/sales/:id', authenticate, verifyAdmin, validateId, getOneSale);
router.get('/sales/:id', authenticate, verifyAdmin, validateId, getOneSale);
router.put('/sales/:id', authenticate, verifyAdmin, validateId, validateSaleInput, updateSale);
router.delete('/sales/:id', authenticate, verifyAdmin, validateId, deleteSale);

/* Users Router */
router.get('/users', authenticate, verifyAdmin, getAllUsers);
router.get('/users/:id', authenticate, verifyAdmin, validateId, getOneUser);
router.put('/users/:id', authenticate, validateUserInput, validateId, verifyAdmin, updateUser);
router.delete('/users/:id', authenticate, verifyAdmin, validateId, deleteUser);
router.post('/auth/signup', authenticate, validateUserInput, validateUserSignup, verifyAdmin, addUser);
router.post('/auth/login', validateUserInput, loginUser);

export default router;
