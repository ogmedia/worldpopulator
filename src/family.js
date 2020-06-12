'use strict';
module.exports = (function(){

	const first_names = require('./first_names.js');
	const last_names = require('./last_names.js');
	const character = require('./character.js');

	var CharacterDefaultAttributes = {
		id: 0,
		parent_id: 0,
		first_name: 'N/A',
		last_name: last_names.random()
	};


	// this will return an array of family members
	// params are an ancestor (Object) and the size of the family (int)
	var build_family = function(family_size, cont_id, patriarch){
		var char_id_track = 1; //main scope
		const num_children = 4;

		patriarch = patriarch ||  {
			id: char_id_track,
			parent_id: 0,
			first_name: first_names.random(),
			last_name: last_names.random(),
			continent: cont_id
		};

		var family = [patriarch];
		var next_generation = [];

		var create_children = function(p){
			var child_track = 0;
			var rand_child_num = Math.floor( Math.random() * num_children );
			while(child_track < rand_child_num && family.length < family_size){
				char_id_track++;
				child_track++;

				let c = character.create(char_id_track,p.id, first_names.random(), p.last_name, cont_id);

				next_generation.push(c);
				family.push(c);
			}
		};

		var members = [patriarch];
		var gen_track = 1;
		while(family.length < family_size){

			//if our next generation queue is full up, iterate through that and clear it
			if(next_generation.length > ( Math.pow( num_children,gen_track ) - 1 ) ){
				members = next_generation;
				next_generation = [];
				gen_track++;
			}
				
			members.map(create_children);
			
		}//end loop
		return family;
	};


	var mod = {
		create: build_family
	};
	
	return mod;
})();