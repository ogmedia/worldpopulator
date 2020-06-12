module.exports = function(){
  var myGeolocPosition = null;  //as {coords:{lat:x,lon:y}}

  var nearbySearchRadius = 0.08; //in miles

  var dStart = new Date();
  var locPositionTimer = dStart.getTime();
  var locPositionThreshold = 30000;

  //for our timeout/polling
  var geocodeSearchingFlag = false;

  var mtgGeoOptions = {maximumAge:5000, timeout:10000, enableHighAccuracy:false};

  var locationUpdateWatch = null;

  var hasGeocodeLoc = function(){
    hasLocStorage = window.localStorage || false;
    if( !hasLocStorage ){
      return false;
    }

    var lat = parseFloat(window.localStorage.getItem("lat")) || null;
    var lon = parseFloat(window.localStorage.getItem("lon")) || null;
    var last_geo = window.localStorage.getItem("last_geo");

    if( ( locPositionTimer - last_geo ) > locPositionThreshold ){
      myGeolocPosition = null;
      return false;   
    }

    if( lat !== null && lon !== null ){
      myGeolocPosition = { coords: { latitude: lat, longitude: lon } };
      return true;
    }else{
      myGeolocPosition = null;
      return false;
    }

  };

  //radians
  Number.prototype.toRad = function() {
     return this * Math.PI / 180;
  };

  var savePositionDataToLocal = function( position ){
      if(window.localStorage){
        window.localStorage.setItem("lat", position.coords.latitude );
        window.localStorage.setItem("lon", position.coords.longitude );
        window.localStorage.setItem("last_geo", locPositionTimer );
        return true;
      }
  };

  //gets the location thats currently being used
  var getLocation = function( callback ){

    //we cant get anything back
    var geoErrBack = function(){
        console.log('getCurrentPosition timedout/error');

        //check local and use that, otherwise it'll be null
        console.log("using fallback coords\n" + myGeolocPosition.coords.latitude + "\n" + myGeolocPosition.coords.longitude);
        callback( myGeolocPosition, true );
    };

    //successfully got the position
    var sendBack = function(position){
      //alert('received new position' + position.coords.latitude + "\n" + position.coords.longitude );
      myGeolocPosition = position;          //ref the coords
      savePositionDataToLocal( position );  //save to local
      callback( position );                 //callback
    };

    if(navigator.geolocation){
      
      if( !hasGeocodeLoc() ){
        navigator.geolocation.getCurrentPosition( sendBack, geoErrBack, mtgGeoOptions );
      }else{
        callback( myGeolocPosition );
      }

    }else{ 
      callback( null );
    }

  };

  var runLocationWatch = function(callback){
    mtgGeoOptions.timeout = 30000;
  //kicks off the periodical locaiton update
    locationUpdateWatch = navigator.geolocation.watchPosition( function( position ){
      console.log('POSITION CHANGE DETECTED');
      // navigator.geolocation.clearWatch( locationUpdateWatch ); //stops the main locaiton process

      //save the updated position data
      savePositionDataToLocal( position );    //save to local
      //getProximityMeetings();                 //update the list
      callback(position);

    }, function(){
       console.log('watchPosition threw error/timeout');
    }, mtgGeoOptions );

  //need thi later to turn off
  //navigator.geolocation.clearWatch( locationUpdateWatch );
  };

  //takes the position and the firebase ref
  var getProximityCharacters = function(position, char_col ){
    console.log('get proximity called');
    position = position || myGeolocPosition;  //if we dont have one use the one thats saved
    var lat = position.lat || position.coords.latitude || null;
    var lon = position.lon || position.coords.longitude || null;

    return char_col.filter(function(c){
        console.log('checking to see if in radius');
        console.log(c);
        var lat2 = c.lat;
        var lon2 = c.lon;
        //test it
        if( withinRadius( lat, lon, lat2, lon2 ) ){
          return c;
        }
    });

    //call withinRadius()
  };


  function withinRadius( lat1, lon1, lat2, lon2 ){
    lat1 = lat1 || 0;
    lon1 = lon1 || 0;
    lat2 = lat2 || 0;
    lon2 = lon2 || 0;

    var R = 6371; // km 

    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();  
    var x2 = lon2-lon1;
    var dLon = x2.toRad();  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 

    //distance between
    if( parseFloat(d) <= nearbySearchRadius ){
      return true;
    }else{
      return false;
    }

  }


  //setInterval(function(){
   // flashGeo();

  //kicks off the main nearby search process all over again
  var restartNearbyMeetingSearch = function(){
    showLocationLoading();
    getLocation(function(position){
      //getProximityMeetings(position);
      //alert(position);
    });

    startManualTimeoutProcess();
  };

  var hideLocationLoading = function(){

  };

  var showEmptyMeetingResult = function(){
   
  };

  var showLocationLoading = function(){

  };

  var mod = {
    watch: runLocationWatch,
    radius: getProximityCharacters,
    loc: function(){
      return myGeolocPosition;
    },
    get: getLocation
  };
  return mod;
};