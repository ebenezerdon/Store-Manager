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
/* import { authenticate, verifyAdmin, verifyAttendant } from '../middleware/verify'; */
/* import { 
  validateUserInput, validateProductInput, validateSaleInput,
} from './middleware/validateinput'; */

const router = express.Router();

/* GET home page. */
/* router.get('/', (req, res, next) => {
  res.send('index.html');
}); */

/* Products Router */
router.get('/products', getAllProducts);
router.get('/products/:id', getOneProduct);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

/* Sales Router */
router.get('/sales', getAllSales);
router.get('/sales/:id', getOneSale);
router.post('/sales', addSale);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

/* Users Router */
router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/auth/signup', addUser);
router.post('/auth/login', loginUser);

export default router;
