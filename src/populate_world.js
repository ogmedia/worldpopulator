var firebase = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
 var config = {
   /* load config here */
};

firebase.initializeApp(config);

const WORLD_RADIUS = 6371000;
const ONE_DEGREE = 111300;

//Calc the distance between 2 coordinates as the crow flies
function distance(lat1, lon1, lat2, lon2) {
    var R = WORLD_RADIUS;
    var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
}

//Create random lat/long coordinates in a specified radius around a center point
function randomGeo(center, radius) {
    var y0 = center.latitude;
    var x0 = center.longitude;
    var rd = radius / ONE_DEGREE; //about 111300 meters in one degree

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    //Adjust the x-coordinate for the shrinking of the east-west distances
    var xp = x / Math.cos(y0);

    var newlat = y + y0;
    var newlon = x + x0;
    var newlon2 = xp + x0;

    return {
        'latitude': newlat.toFixed(5),
        'longitude': newlon.toFixed(5),
        'longitude2': newlon2.toFixed(5),
        'distance': distance(center.latitude, center.longitude, newlat, newlon).toFixed(2),
        'distance2': distance(center.latitude, center.longitude, newlat, newlon2).toFixed(2),
    };
}


var pull_characters = function(){
  return new Promise(function(resolve, reject){
    firebase.database().ref().child('characters').once('value',function(charSnap){
      var ch = charSnap.val();
      resolve(ch);
    })
  })
  .then(function(chrs){
    return Object.keys(chrs).map(function(k){
      return chrs[k];
    });
  })
  .then(function(c){
    return c;
  });
};

//center point
var c = {
	latitude: 29.936845,
	longitude: -90.106210
};
var d = 5; //100meters

pull_characters()
	.then(function(chars){
		console.log(chars);
		chars.forEach(function(char){

			var r_g = randomGeo(c,d);
			console.log(r_g);
			firebase.database().ref('characters/' + char.id).child('lat').set(r_g.latitude);
			firebase.database().ref('characters/' + char.id).child('lon').set(r_g.longitude);
		});
	});
