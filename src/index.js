const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', fileRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  return res.status(500).json({ message: 'Something went wrong' });
});

const server = app.listen(5000, () => {
  console.log('Server started at ', server.address().port);
});
