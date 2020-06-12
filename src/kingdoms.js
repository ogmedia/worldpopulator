'use strict';

module.exports = (function(){
	var kingdoms = require('../data/kingdoms.json');

	var random = function(){
		return kingdoms[Math.floor(Math.random() * kingdoms.length)];
	};

	var create = function(num,cont_id){
		num = num || 1;
		var id_track = 1;
		var ws = [];
		while( id_track <= num ){
			var w = {
				id: id_track,
				name: random(),
				type: 'kingdom',
				continent_id: cont_id
			};
			id_track++
			ws.push(w);
		}
		return ws;
	};
	var mod = {
		random: random,
		create: create
	};
	return mod;
})();
