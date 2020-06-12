'use strict';
module.exports = (function(){
	var names = require('../data/last_names.json');
	var mod = {
		random: function(){
			return names[Math.floor(Math.random() * names.length)];
		}
	};
	return mod;
})();
