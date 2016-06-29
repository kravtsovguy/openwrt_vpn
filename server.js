var express         = require('express');
var app = express();

var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBVIIO1uddakhBOGXNesEovQ4pRcDwd-c8",
    authDomain: "openwrtvpn-42b5b.firebaseapp.com",
    databaseURL: "https://openwrtvpn-42b5b.firebaseio.com",
    storageBucket: "",
  };
firebase.initializeApp(config);

var db = firebase.database();

	var db = firebase.database();
	
	
app.get('/vpn/:mac', function (req, res) {
	//var r = db.ref("users/c4:6e:1f:e2:4e:fb");
	//r.set({"login":"syka", "password":"bleat1234"});
	
	var ref = db.ref("users/"+req.params.mac);
	ref.once("value", function(snapshot) {
		var v = snapshot.val();
		res.send(v.login + "\n" + v.password);
		console.log('Requested '+JSON.stringify(v)+' for '+req.params.mac);
	});	
});

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 3) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};