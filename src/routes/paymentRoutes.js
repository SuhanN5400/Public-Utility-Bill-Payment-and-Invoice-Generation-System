const express = require('express');
const { processPayment, getTransactionHistory, undoLastTransaction } = require('../controllers/PaymentController');

const router = express.Router();

router.post('/payments', processPayment);
router.get('/payments/history', getTransactionHistory);
router.post('/payments/undo', undoLastTransaction);

module.exports = router;
