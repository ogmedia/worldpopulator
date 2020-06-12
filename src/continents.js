'use strict';
module.exports = (function(){
	var continents = require('../data/continents.json');

	var random = function(){
		return continents[Math.floor(Math.random() * continents.length)];
	};

	var create = function(num, w_id){
		num = num || 1;
		w_id = w_id || 0;
		var id_track = 1;
		var cs = [];
		while( id_track <= num ){
			var c = {
				id: id_track,
				name: random(),
				type: 'continent',
				world_id: w_id
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