const fs = require('fs-extra');
const { parse } = require('json2csv');
const path = require('path');

const generateInvoice = async (payment) => {
    const invoicePath = path.join(__dirname, '../../data/invoices');
    const fileName = `${payment.type}_${Date.now()}.csv`;
    const filePath = path.join(invoicePath, fileName);
    const csv = parse(payment);
    await fs.outputFile(filePath, csv);
};

const logTransaction = async (payment) => {
    const logPath = path.join(__dirname, '../../data/logs/dailyLog.json');
    let logs = [];
    
    try {
        if (await fs.exists(logPath)) {
            logs = await fs.readJson(logPath);
        }
        logs.push(payment);
        await fs.writeJson(logPath, logs);
    } catch (err) {
        console.error('Error logging transaction:', err);
    }
};

module.exports = { generateInvoice, logTransaction };
