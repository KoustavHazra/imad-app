var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var config = {
    user:'hazrakoustav12',
    database:'hazrakoustav12',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool=new pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test', function(err,result){
        if (err) {
            res.status(500).send(err.toString());
        }else {
            res.send(JSON.strinigfy(result));
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
