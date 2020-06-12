var firebase = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
 var config = require('../config/firebase.json');

firebase.initializeApp(config);

//var Conts = require('./continents.js');
//var Countries = require('./countries.js');
//var Kingdoms = require('./kingdoms.js');
var Families = require('./family.js');

const FAMILY_SIZE = 20;
const MAX_FAMILY_PER_CONT = 10;

new Promise(function(resolve,reject){
	firebase.database().ref().child('continents').once('value',function(wSnap){
		resolve(wSnap);
	});
})
.then(function(contSnaps){
	var conts = [];
	contSnaps.forEach(function(cont){
		var c = cont.val();
		c.id = cont.key;
		conts.push(c);
	});
	return conts;
})
.then(function(cs){
	//some continents wont have families
	return cs.filter(function(){
		if( Math.random() >= .5 ){
			return true;
		}else{
			return false;
		}
	});
})
.then(function(cs){
	console.log(cs);

	var all_families = cs.map(function(cont){

		//in each contintentn we will create a number of families (randomly)
		var num_families_in_cont = Math.ceil( Math.random() * MAX_FAMILY_PER_CONT );
		console.log('spawning ' + num_families_in_cont + ' families for contintent: ' + cont.id);
	
		var cont_fams = [];
		var arr = Array.apply(null, Array( num_families_in_cont ));
        var col = arr.map(function (x, i) { return i });

		var create_family = function(){
			var random_family_size = Math.ceil( Math.random() * FAMILY_SIZE );
			console.log('creating family of size: ' + random_family_size);
			cont_fams.push( Families.create( random_family_size , cont.id) );
		}
		col.forEach(create_family);
		return cont_fams;

	});

	return all_families;
})
.then(function(af){
	af.forEach(function(con){
		console.log('families for continent');
		
		con.forEach(function(fam){
			console.log(' family length: ' + fam.length);
			//process each family here and write it to firebase (need to reference pushes)
			var fam_keys = {};
			var parent_id = 0;
			fam.forEach(function(c){
				fam_keys[c.id] = c;
				var new_id = firebase.database().ref().child('characters').push().key;
				fam_keys[c.id].id = new_id;
			});

			var updates = {};
			Object.keys(fam_keys).forEach(function(k){
				var char = fam_keys[k];
				if(char.parent_id !== 0){
					fam_keys[k].p_id = char.parent_id;
					fam_keys[k].parent_id = fam_keys[ char.parent_id ].id;
				}
				updates['/characters/' + fam_keys[k].id] = fam_keys[k];
			});
			console.log(fam_keys);
			// firebase.database().ref().update(updates);

		});
	});
});

//var fam = Families.create(20, cont_id);
//console.log(fam);
/*

var create_continents = function(c){
	var new_cont = firebase.database().ref().child('countries').push();
	return new_cont.set(c);
};
*/


