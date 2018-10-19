import express from 'express';
import products from '../controllers/api1/products';
import sales from '../controllers/api1/sales';
import users from '../controllers/api1/users';
const router = express.Router();

/* Users Router */
router.get('/api/v1/users', users.getAll);
router.get('/api/v1/users/:id', users.getOne);
router.post('/api/v1/users', users.addUser);
router.post('/api/v1/login', users.loginUser);

module.exports = router;
