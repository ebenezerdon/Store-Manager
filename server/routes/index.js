import express from 'express';
import products from '../controllers/api1/products';
import sales from '../controllers/api1/sales';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('index.html');
});

/* Products Router */
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/products/:id', products.getOne);
router.post('/api/v1/products', products.addProduct);

/* Sales Router */
router.get('/api/v1/sales', sales.getAll);
router.get('/api/v1/sales/:id', sales.getOne);
router.post('/api/v1/sales', sales.addSale);

export default router;