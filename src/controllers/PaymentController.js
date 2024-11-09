const fs = require('fs-extra');
const Queue = require('../models/Queue');
const PriorityQueue = require('../models/PriorityQueue');
const Stack = require('../models/Stack');
const { generateInvoice, logTransaction } = require('../utils/fileHandler');

const regularQueue = new Queue();
const urgentQueue = new PriorityQueue();
const transactionHistory = new Stack();

const processPayment = async (req, res) => {
    const { type, amount, urgent } = req.body;
    const payment = { type, amount, date: new Date() };
    
    if (urgent) {
        urgentQueue.enqueue(payment, 1);  // Priority 1 for urgent
    } else {
        regularQueue.enqueue(payment);
    }

    transactionHistory.push(payment);
    await generateInvoice(payment);
    await logTransaction(payment);

    res.status(201).send('Payment processed successfully');
};

const getTransactionHistory = (req, res) => {
    res.status(200).json(transactionHistory.getAll());
};

const undoLastTransaction = (req, res) => {
    const undoneTransaction = transactionHistory.pop();
    if (undoneTransaction === "Stack is empty") {
        return res.status(404).send('No transaction to undo');
    }
    res.status(200).json(undoneTransaction);
};

module.exports = { processPayment, getTransactionHistory, undoLastTransaction };
