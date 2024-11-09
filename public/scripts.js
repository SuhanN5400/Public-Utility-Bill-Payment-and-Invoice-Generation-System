document.getElementById('payment-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const type = document.getElementById('type').value;
    const amount = document.getElementById('amount').value;
    const urgent = document.getElementById('urgent').checked;

    const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, amount, urgent })
    });

    if (response.ok) {
        alert('Payment processed successfully!');
        fetchTransactionHistory();
    } else {
        alert('Failed to process payment.');
    }
});

document.getElementById('undo-transaction').addEventListener('click', async function () {
    const response = await fetch('/api/payments/undo', { method: 'POST' });

    if (response.ok) {
        alert('Last transaction undone!');
        fetchTransactionHistory();
    } else {
        alert('No transaction to undo.');
    }
});

async function fetchTransactionHistory() {
    const response = await fetch('/api/payments/history');
    const transactions = await response.json();
    const historyList = document.getElementById('transaction-history');
    historyList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.type} - $${transaction.amount} on ${new Date(transaction.date).toLocaleString()}`;
        historyList.appendChild(listItem);
    });
}

// Fetch history on page load
fetchTransactionHistory();
