const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb+srv://superuser:!TtZ96yAmF@cluster0-gzzo6.mongodb.net/mongoFatz?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(db => {console.log('DB is connected');})
  .catch(error => {console.error(error);});


