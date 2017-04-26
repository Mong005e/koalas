var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var path = require ('path');
var pg = require('pg');

var port = 7654;

var config = {
  database: 'koala_holla',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool( config );

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


//create server
app.listen(port, function(){
  console.log('server up on : ', port);
});


app.get('/', function(req, res){
  console.log('finding the html');
  res.sendFile(path.resolve('public/views/index.html'));
});

app.get ('/getKoalas', function(req, res){
  console.log('get Koalas route hit' );

    var allTheKoalas = [];

    pool.connect(function( err, connection, done){
      if ( err ){
        console.log( err );
        res.send(400);
      } else {
        console.log('connected to db');
        var resultSet = connection.query("SELECT * from koalas");
        resultSet.on( 'row', function ( row ){
          allTheKoalas.push ( row );
          });
        resultSet.on('end', function(){
          done();

          res.send(allTheKoalas);
        });
      }

    });
});//end app.get

app.post ('/addKoala', function(req, res){
    console.log(req.body);
    console.log(req.body.name);


    pool.connect(function(err, connection, done){
      if (err) {
        res.send(400);
    }
      else {
        var ageNum= parseInt(req.body.age);
        var resultSet= connection.query("INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES (req.body.name,req.body.sex,ageNum,req.body.ready_for_transfer,req.body.notes");
        done();
        res.send(200);
    }

});

});//end app.post
