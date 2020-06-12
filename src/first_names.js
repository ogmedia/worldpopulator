'use strict';

module.exports = (function(){
	var mod = {};
	var random = function(){
		return f_n[ Math.floor( (Math.random() * f_n.length) ) ];
	};
	mod.random = random;
	var f_n =	require('../data/first_names.json');
	return mod;
})();