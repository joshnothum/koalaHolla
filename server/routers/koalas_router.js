var express = require('express');
var router = express.Router();

var poolModule = require('../modules/pool.js');
var pool = poolModule;

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
        var queryText = 'INSERT INTO "koalas" ("name", "gender", "age", "readyForTransfer", "notes") VALUES ($1, $2, $3, $4, $5);'
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

  router.delete('/:id', function(req, res){
    var koalaID = req.params.id;
    console.log(koalaID);
    pool.connect(function(errorConnectingToDb, db, done) {
    
      if(errorConnectingToDb) {
        console.log('Error connecting', errorConnectingToDb);
        res.send(500);
      } else {
        var queryText = 'DELETE FROM "koalas" WHERE "id" = $1;';
        db.query(queryText, [koalaID], function(errorMakingQuery, result){
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
  
  }); //END delete ROUTE

  router.put('/:id', function(req, res){
    var readyForTransfer = req.body.readyForTransfer;
    if (readyForTransfer === 'Y' || readyForTransfer === 'y'){
      readyForTransfer === 'N';
    } else if (readyForTransfer === 'N' || readyForTransfer === 'n') {
      readyForTransfer === 'Y';
    }
    var koalaID = req.params.id;
    console.log(koalaID);
    pool.connect(function(errorConnectingToDb, db, done) {
      if(errorConnectingToDb) {
        console.log('Error connecting', errorConnectingToDb);
        res.send(500);
      } else {
        var queryText = 'UPDATE "koalas" SET "readyForTransfer" = $1 WHERE "id" = $2;';
        db.query(queryText, [readyForTransfer, koalaID], function(errorMakingQuery, result){
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
  
  }); //END delete ROUTE

module.exports = router;