"use strict";

var http = require('http');

var bodyParser = require('body-parser')
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var request = require('request');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBVIIO1uddakhBOGXNesEovQ4pRcDwd-c8",
    authDomain: "openwrtvpn-42b5b.firebaseapp.com",
    databaseURL: "https://openwrtvpn-42b5b.firebaseio.com",
    storageBucket: "openwrtvpn-42b5b.appspot.com",
  };

firebase.initializeApp(config);
var db = firebase.database();
	
app.get('/vpn/:mac', function (req, res) {
    
    var str = 'http://localhost:'+server.address().port+'/api/user/'+req.params.mac;
    request(str, function (error, response, body) {
        var v = JSON.parse(body);
        res.send(v.login + "\n" + v.password);
    });
});

app.get('/api/user/:mac', function (req, res) {
    
	var ref = db.ref("users/" + req.params.mac);
	ref.once("value", function(snapshot) {
		var v = snapshot.val();
        var user = {};
        user.login = v != null ? v.login : "empty";
        user.password = v != null ? v.password: "empty";
        res.json(user);
        console.log('Requested '+JSON.stringify(v)+' for '+req.params.mac);
    });	
});

app.put('/api/user/:mac', function (req, res) {
    var auth = req.body;
    console.log("New data");
    console.log(req.params.mac+' : '+JSON.stringify(auth));
    var ref = db.ref("users/" + req.params.mac);
    ref.set(auth,function(error) {
        var r = {};
        if (error) {
            r.result = "ERROR";
        } else {
            r.result = "OK";
        }
        res.json(r);
    });
});

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/pay', function (req, res) {
    res.render('pay');
});

app.get('/admin', function (req, res) {
    res.render('admin', {mac:''});
});

app.get('/admin/:mac', function (req, res) {
    res.render('admin',{mac: req.params.mac});
});

app.use(function(req, res){
   //res.sendStatus(404);
    res.redirect('/');
});

var server = app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
});