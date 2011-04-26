$(document).ready(function(){

	module("Level Module", {
		setup: function() {
			this.level = new level();
		}
	});	

	test("Test level array creation", function() {
		var testLevel = new level(6,6)		
		equals(testLevel.structure[5][5], undefined, "We expect the array location to exist, undefined" );		
	});
	
	module("Piece Module", {

	});	

	test("Test piece array creation", function() {
		var testPiece = new piece([[true, true], [true, true]]);	
		equals(testPiece.structure[1][1], true, "We expect the array location to be true" );		
	});
	
	test("Test piece rotate right", function() {
		var testPiece = new piece([[true, false], [false, true]]);
		testPiece.rotateRight();
		equals(testPiece.structure[0][0], false, "We expect this location to be false" );
		equals(testPiece.structure[0][1], true, "We expect this location to be true" );
		equals(testPiece.structure[1][0], true, "We expect this location to be true" );
		equals(testPiece.structure[1][1], false, "We expect this location to be false" );		
	});
	
	test("Test piece rotate right - more complicated", function() {
		var testPiece = new piece([[0,0,1], [0,0,0], [6,0,0]]);
		testPiece.rotateRight();
		equals(testPiece.structure[0][0], 6, "We expect this location to be 6" );
		equals(testPiece.structure[2][2], 1, "We expect this location to be 1" );		
	});
	
	test("Test piece rotate left- more complicated", function() {
		var testPiece = new piece([[0,0,1], [0,0,0], [6,0,0]]);
		testPiece.rotateLeft();
		equals(testPiece.structure[0][0], 1, "We expect this location to be 6" );
		equals(testPiece.structure[2][2], 6, "We expect this location to be 1" );		
	});
	
});