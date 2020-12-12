const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/excel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('db connected');
  })
  .catch((error) => {
    console.log('Error while connecting to db ', error);
  });
