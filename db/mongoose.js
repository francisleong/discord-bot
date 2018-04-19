const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Pokemon', (err) => {
  if(err) {
    console.log('Unable to connect to the Pokemon server!');
  }
});

module.exports = {
  mongoose
};