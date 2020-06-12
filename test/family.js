/* family test */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var Family = require('../family.js');

describe('Family Module',function(){
	
	console.log(Family);
	const test_ancestor = {
			id: 1,
			parent_id: 0,
			first_name: 'Test',
			last_name: 'Ancestor'
		};

	describe('#create()',function(){

		it('create family tree from ancestor',function(){
			var family_total = 20;

			var f = Family.create(20, test_ancestor);

			expect(f).to.be.an('array');
			expect(f.length).to.equal(20);
		});
	});

});