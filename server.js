var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

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
    
	var ref = db.ref("users/"+req.params.mac);
	ref.once("value", function(snapshot) {
		var v = snapshot.val();
        if(v!=null)
            res.send(v.login + "\n" + v.password);
        else
            res.send("empty\nempty");
        
		console.log('Requested '+JSON.stringify(v)+' for '+req.params.mac);
	});	
});

app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
});