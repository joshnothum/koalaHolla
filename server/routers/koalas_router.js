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

var pool = new pg.Pool(config);

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

  router.post('/', function(req, res){
    var koalaAdded = req.body;

    pool.connect(function(errorConnectingToDb, db, done) {
    
      if(errorConnectingToDb) {
        console.log('Error connecting', errorConnectingToDb);
        res.send(500);
      } else {
        var queryText = 'INSERT INTO "koalas" ("name", "gender", "age", "ready_for_transfer", "notes") VALUES ($1, $2, $3, $4, $5);'
        db.query(queryText, [koalaAdded.name, koalaAdded.gender, koalaAdded.age, koalaAdded.readyForTransfer, koalaAdded.notes], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making query', errorMakingQuery)
            res.send(500);
          } else {
            res.sendStatus(201);
          }
        }) //END QUERY
      }
    }); //END POOL
  
  }); //END POST ROUTE

module.exports = router;