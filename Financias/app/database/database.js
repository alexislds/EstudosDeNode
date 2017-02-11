const MongoClient = require('mongodb').MongoClient;
var _db;

module.exports = {

  connectDb: (callback) => {
    MongoClient.connect('mongodb://killevil:killevil@ds043917.mlab.com:43917/dbalexis', (err, database) => {
      _db = database;
      return callback(err);
    });
  },

  getDb: () => {
    return _db;
  }
};
