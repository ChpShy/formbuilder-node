var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1:27017/form';
mongoose.connect(dbUrl,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', function (err) {
   console.log('Connection Error: ' + err);
   if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
      console.log(new Date(), err.toString());
      setTimeout(function () {
          console.log('正在准备重连...');
          db.openUri(dbUrl)
      }, 20 * 1000);
   }
});
db.on('open', function () {
   console.log('Connection Success!');
});

module.exports = mongoose;