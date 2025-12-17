const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/:productId', removeFromCart);

module.exports = router;