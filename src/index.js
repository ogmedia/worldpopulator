'use strict';
module.exports = (function(){

	/*
	
	 var family = require('./family.js');

	var f = family.create(50);
	console.log(f);
	*/
	const NUM_WORLDS = 1;
	const NUM_CONTINENTS = 5;
	const NUM_KINGDOMS = 10;
	const NUM_COUNTRIES = 10;
	
	var worlds = require('./worlds.js');
	var w = worlds.create(NUM_WORLDS);
	console.log(w);

	var continents = require('./continents.js');
	var c = continents.create(NUM_CONTINENTS, w[0].id);
	console.log(c);

	var kingdoms = require('./kingdoms.js');
	var k = kingdoms.create(NUM_KINGDOMS, c[1].id );
	console.log(k);

	var countries = require('./countries.js');
	var cy = countries.create(NUM_COUNTRIES, c[3].id);
	console.log(cy);
})();