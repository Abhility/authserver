const express = require('express');
const app = express();
const authRouter = require('./routes/authRoutes');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) console.log('Cannot connect to DB');
    console.log('Connected to DB');
  }
);

app.use(express.json());
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => console.log(` Server listening on port ${PORT}`));
