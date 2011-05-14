$(document).ready(function(){

	module("Level Module", {
		setup: function() {
			this.level = new level();
		}
	});	

	test("Test level array creation", function() {
		var testLevel = new level(6,6);	
		equals(testLevel.structure[5][5], undefined, "We expect the array location to exist, undefined" );		
	});
	
	test("Test createPiece() method", function() {
		
		function oneOrZero(val){
			if(val <= 1){ return true; }
			return false;
		}
		
		var testPiece = this.level.createPiece()
		ok(oneOrZero(testPiece.structure[1][1]), "We expect the random piece to be at least this large" );		
	});
	
	module("Piece Module", {

	});	

	test("Test piece array creation", function() {
		var testPiece = new piece([[true, true], [true, true]]);	
		equals(testPiece.structure[1][1], true, "We expect the array location to be true" );		
	});
	
	test('Test piece rotate counter-clock-wise', function() {
		var testPiece = new piece([[true, false], [false, true]]);
		testPiece.rotate('ccw');
		equals(testPiece.structure[0][0], false, "We expect this location to be false" );
		equals(testPiece.structure[0][1], true, "We expect this location to be true" );
		equals(testPiece.structure[1][0], true, "We expect this location to be true" );
		equals(testPiece.structure[1][1], false, "We expect this location to be false" );		
	});
	
	test('Test "T-piece" rotate clock-wise', function() {
		var testPiece = new piece(
		       [[1,1,1],
			[0,1,0],
			[0,0,0]]
		);
		
		/* Expected Result
		  
		[[0,0,1],
		 [0,1,1],
		 [0,0,1]] */
		
		testPiece.rotate('cw');
		
		equals(testPiece.structure[0][0], 0, "We expect this location to be 0" );
		equals(testPiece.structure[0][1], 0, "We expect this location to be 0" );
		equals(testPiece.structure[0][2], 1, "We expect this location to be 1" );
		equals(testPiece.structure[1][0], 0, "We expect this location to be 0" );
		equals(testPiece.structure[1][1], 1, "We expect this location to be 1" );
		equals(testPiece.structure[1][2], 1, "We expect this location to be 1" );
		equals(testPiece.structure[2][0], 0, "We expect this location to be 0" );
		equals(testPiece.structure[2][1], 0, "We expect this location to be 0" );
		equals(testPiece.structure[2][2], 1, "We expect this location to be 1" );
	});
	
	test('Test "T-piece" rotate counter-clock-wise', function() {
		var testPiece = new piece(
		       [[1,1,1],
			[0,1,0],
			[0,0,0]]
		);
		
		/* Expected Result
		  
		[[1,0,0],
		 [1,1,0],
		 [1,0,0]] */
		
		testPiece.rotate('ccw');
		
		equals(testPiece.structure[0][0], 1, "We expect this location to be 1" );
		equals(testPiece.structure[0][1], 0, "We expect this location to be 0" );
		equals(testPiece.structure[0][2], 0, "We expect this location to be 0" );
		equals(testPiece.structure[1][0], 1, "We expect this location to be 1" );
		equals(testPiece.structure[1][1], 1, "We expect this location to be 1" );
		equals(testPiece.structure[1][2], 0, "We expect this location to be 0" );
		equals(testPiece.structure[2][0], 1, "We expect this location to be 1" );
		equals(testPiece.structure[2][1], 0, "We expect this location to be 0" );
		equals(testPiece.structure[2][2], 0, "We expect this location to be 0" );
	});
	
});