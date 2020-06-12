'use strict';
module.exports = (function(){
	var worlds = require('../data/worlds.json');

	var random = function(){
		return worlds[Math.floor(Math.random() * worlds.length)];
	};

	// creates num amount of worlds
	var create = function( num ){
		num = num || 1;
		var id_track = 1;
		var ws = [];
		while( id_track <= num ){
			var w = {
				id: id_track,
				name: random(),
				type: 'world'
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