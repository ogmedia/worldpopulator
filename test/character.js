/* characters test */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var Character = require('../character.js');

describe('Character Module',function(){
	
	console.log(Character);
	const test_character = {
			id: 0,
			parent_id: 0,
			first_name: 'Test',
			last_name: 'Character'
		};

	describe('#create()',function(){
		it('should return an object with members of the arguments',function(){
			var c = Character.create(test_character.id, test_character.parent_id, test_character.first_name, test_character.last_name);
			
			expect(c).to.be.an('object');
			expect(c.first_name).to.equal(test_character.first_name);
			expect(c.last_name).to.equal(test_character.last_name);
			expect(c.id).to.equal(test_character.id);
			expect(c.parent_id).to.equal(test_character.parent_id);
		});

		it('should return an empty object with proper keys if no arguments given',function(){
			var c = Character.create();

			expect(c).to.be.an('object');
		});
	});

});