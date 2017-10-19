var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5000,
    max: 10,
    idleTimeoutMillis: 30000
};

router.get('/', function(req, res){
    
    pool.connect(function(errorConnectingToDb, db, done) {
    
      if(errorConnectingToDb) {
        console.log('Error connecting', errorConnectingToDb);
        res.send(500);
      } else {
        
        var queryText = 'SELECT * FROM "koalas";'; //
        db.query(queryText, function(errorMakingQuery, result){
        
          done();
          if(errorMakingQuery) {
            console.log('Error making query', errorMakingQuery)
            res.send(500);
          } else {
            res.send(result.rows);
          }
        }) //END QUERY
      }
    }); //END POOL
  
  }); //END GET ROUTE


module.exports = router;