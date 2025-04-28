const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const account = require('./routes/account');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/account', account);

const PORT = 4545;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // чтобы работали тесты supertest
