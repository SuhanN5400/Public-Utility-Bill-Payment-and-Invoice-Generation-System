const express = require('express');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
app.use(express.json());
app.use('/api', paymentRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
