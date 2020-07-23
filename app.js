'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var requestify = require('requestify');
//TODO: Implement HTTPS for a more secure communication
//const https = require('https');

var PORT = process.env.PORT || 3000;
var BASE_URL = 'https://YOURSERVER/b1s/v1';
var API_OPTIONS = {
  headers: { accept: 'application/json' },
};
var app = express();
var slSession = null;
var counter = 20;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let data = 'fcdsmanager:pass123manuel';
let buff = new Buffer(data);
let base64data = buff.toString('base64');

app.post('*', function(req, res) {
var auth = req.headers["authorization"];
if(auth != 'Basic ' + base64data)
{
 res.json({ "error" : { "code" : 301, "message" : { "lang" : "en-us", "value" : "Invalid session." } } });
}
else
{
  var URL = BASE_URL + req.path;
  var id = req.query.id;
  if(id != null)
  	URL = URL + "('" + id + "')";
  //console.log('Requesting: ' + URL);
  var options = { headers: { 'Cookie': slSession.cookie } };
  var record = req.body;
  requestify
    .post(URL, record, options)
    .then(function(fbres) {
     var resp = "";
      if(fbres.body != "")
        resp = fbres.getBody();
      res.json(resp);
    })
    .catch(function(err) {
      res.json(err.getBody());
    });
}
});

app.get('*', function(req, res) {
var auth = req.headers["authorization"];
if(auth != 'Basic ' + base64data)
{
 res.json({ "error" : { "code" : 301, "message" : { "lang" : "en-us", "value" : "Invalid session." } } });
}
else
{
  var URL = BASE_URL + req.path;
  var id = req.query.id;
  if(id != null)
  	URL = URL + "('" + id + "')";
 //console.log('Requesting: ' + URL);
  var options = { headers: { 'Cookie': slSession.cookie } };
  requestify
    .get(URL,options)
    .then(function(fbres) {
      var resp = "";
      if(fbres.body != "")
        resp = fbres.getBody();
      res.json(resp);
    })
    .catch(function(err) {
      res.json(err.getBody());
    });
}
});

app.delete('*', function(req, res) {
var auth = req.headers["authorization"];
if(auth != 'Basic ' + base64data)
{
 res.json({ "error" : { "code" : 301, "message" : { "lang" : "en-us", "value" : "Invalid session." } } });
}
else
{
  var URL = BASE_URL + req.path;
  var id = req.query.id;
  if(id != null)
  	URL = URL + "('" + id + "')";
 //console.log('Requesting: ' + URL);
  var options = { headers: { 'Cookie': slSession.cookie } };
  requestify
    .delete(URL,options)
    .then(function(fbres) {
      var resp = "";
      if(fbres.body != "")
        resp = fbres.getBody();
      res.json(resp);
    })
    .catch(function(err) {
      res.json(err.getBody());
    });
}
});

app.patch('*', function(req, res) {
var auth = req.headers["authorization"];
if(auth != 'Basic ' + base64data)
{
 res.json({ "error" : { "code" : 301, "message" : { "lang" : "en-us", "value" : "Invalid session." } } });
}
else
{
  var URL = BASE_URL + req.path;
  var id = req.query.id;
  if(id != null)
  	URL = URL + "('" + id + "')";
  //console.log('Requesting: ' + URL);
  var options = { headers: { 'Cookie': slSession.cookie } };
  var record = req.body;
  requestify
    .patch(URL, record, options)
    .then(function(fbres) {
      var resp = "";
      if(fbres.body != "")
        resp = fbres.getBody();
      res.json(resp);
    })
    .catch(function(err) {
      res.json(err.getBody());
    });
}
});

//TODO: Change the app listen to implement HTTPS
//https.createServer({}, app).listen(PORT, function() {
app.listen(PORT, function() {
  console.log('Service Layer proxy listening on port %s.', PORT);
  slConnect();
  let myVar = setInterval(function(){ slConnect() }, 60000);
});

function slConnect() {
if(counter == 20)
{
 counter = 0;
 //Connect to SL and store a SessionID
    Connect(function (error, resp) {
        if (error) {
            console.error("Can't Connect to Service Layer");
            //console.error(error);
        } else {
            slSession = resp;
	    console.log("Connected to Service Layer");
	    //console.log(slSession);
        }
    });
}
else
{
 counter++; 
 }
}

function Connect(callback) {
    var url = BASE_URL + "/Login";
    var b1session = {};

var API_OPTIONS = {
  headers: { accept: 'application/json' }
};
    //Credentials
    var data = {
                UserName: "manager",
                Password: "YOURPASSWORD",
                CompanyDB: "YOURDB"
                };

  console.log("Connecting to SAP: " + url);

  requestify
    .post(url, data, API_OPTIONS)
    .then(function(fbres) {
      //console.log(fbres.body);
      //console.log(fbres.headers);
      b1session.cookie = fbres.headers['set-cookie'];
      b1session.SessionId = fbres.getBody().SessionId;
      return callback(null, b1session);
    })
    .catch(function(err) {
      return callback(err, null);
    });
}
