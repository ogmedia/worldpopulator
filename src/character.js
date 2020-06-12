'use strict';
module.exports = (function(firebase){

	var create_char = function(id,parent_id,first_name,last_name, cont_id){
		var c = {
			id: id,
			parent_id: parent_id,
			first_name: first_name,
			last_name: last_name,
			continent: cont_id
		};
		return c;
	};

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

	var mod = {
		create: create_char,
		get: pull_characters
	};

	return mod;
});