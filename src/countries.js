'use strict';

module.exports = (function(){
	var countries = require('../data/countries.json');

	var random = function(){
		return countries[Math.floor(Math.random() * countries.length )];
	};

	var create = function(num,cont_id){
		num = num || 1;
		var id_track = 1;
		var cs = [];
		while( id_track <= num ){
			var c = {
				id: id_track,
				name: random(),
				type: 'country',
				continent_id: cont_id
			};
			id_track++
			cs.push(c);
		}
		return cs;
	};

	var mod = {
		random: random,
		create: create
	};

	return mod;
})();
