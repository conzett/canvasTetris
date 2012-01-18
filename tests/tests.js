$(document).ready(function(){

	module("Level Module", {
		setup: function() {
			this.level = new level();
		}
	});	

	test("Test level array creation", function() {
		var testLevel = new level(null, 6,6);	
		equals(testLevel.getStructure()[5][5], undefined, "We expect the array location to exist, undefined" );		
	});
	
	test("Test createPiece() method", function() {
		
		function oneOrZero(val){
			if(val <= 1){ return true; }
			return false;
		}
		
		var testPiece = this.level.getActive();
		ok(oneOrZero(testPiece.getStructure()[1][1]), "We expect the random piece to be at least this large" );		
	});

	test('Test set piece function', function() {

		var color = "#336699";

		var testPiece = new piece(
		    [[1,1,1],
			[0,1,0]], color, 2, 2
		);

		var testLevel = new level(null, 5,4, testPiece);		

		testLevel.placeActive();

		equals(testLevel.getStructure()[2][2], color, "We expect this location to contain the color " + color );
		equals(testLevel.getStructure()[2][3], color, "We expect this location to contain the color " + color );
		equals(testLevel.getStructure()[2][4], color, "We expect this location to contain the color " + color );
		equals(testLevel.getStructure()[3][2], undefined, "We expect this location to nothing");
		equals(testLevel.getStructure()[3][3], color, "We expect this location to contain the color " + color );
		equals(testLevel.getStructure()[3][4], undefined, "We expect this location to nothing");
		
	});

	test('Test isObstructedLeft function', function() {

		var testPiece = new piece([	[1,1,1],
									[0,1,0]],
									null,
									0,
									1
		);

		var x = "#336699";
		var o = undefined;

		var levelStructure = new Array();
		levelStructure = [	[x,o,o,o,o],
							[o,o,o,o,o],
							[x,o,o,o,o],
							[o,o,o,o,o]]

		var testLevel = new level(levelStructure, null,null, testPiece);
	
		ok(testLevel.isObstructedLeft(), "We expect this location to return true");

		testLevel.dropActive();
		ok(!testLevel.isObstructedLeft(), "We expect this location to return false");

		testLevel.dropActive();	
		ok(testLevel.isObstructedLeft(), "We expect this location to return true");

		testLevel.moveActiveRight();
		equals(testLevel.isObstructedLeft(), false, "0 units to the left, we expect the value to be false");
		
		testLevel.moveActiveLeft();
		equals(testLevel.isObstructedLeft(), true, "1 units to the left, we expect the value to be true");
			
	});

	test('Test isObstructedRight function', function() {

		var testPiece = new piece(
		    [[1,1,1],
			[0,1,0]],
			null, 0, 1
		);

		var x = "#336699";
		var o = undefined;

		var levelStructure = new Array();
		levelStructure = [	[o,o,o,o,x],
							[o,o,o,x,o],
							[o,o,o,o,o],
							[o,o,o,o,o]]

		var testLevel = new level(levelStructure, null,null, testPiece);		
	
		ok(testLevel.isObstructedRight(), "We expect this location to return true");

		testLevel.moveActiveLeft();
			
		ok(!testLevel.isObstructedRight(), "We expect this location to return false");

		testLevel.dropActive();
		
		ok(testLevel.isObstructedRight(), "We expect this location to return true");

			
	});

	test('Test isObstructedBottom function', function() {

		var testPiece = new piece(
		    [[1,1,1],
			[0,1,0]],
			null, 0, 1
		);

		var x = "#336699";
		var o = undefined;

		var levelStructure = new Array();
		levelStructure = [	[o,o,o,o,o],
							[o,o,o,o,o],
							[o,o,o,o,o],
							[o,o,x,o,o]]

		var testLevel = new level(levelStructure, null,null, testPiece);		
	
		ok(!testLevel.isObstructedBottom(), "We expect this location to return false");

		testLevel.dropActive();
			
		ok(testLevel.isObstructedBottom(), "We expect this location to return true");

		testLevel.moveActiveLeft();
			
		ok(!testLevel.isObstructedBottom(), "We expect this location to return false");
			
	});

	test('Test getFullRows function', function() {

		var x = "#336699";
		var o = undefined;

		var levelStructure = new Array();
		levelStructure = [	[o,o,o,o,o],
							[x,x,x,x,x],
							[o,o,o,o,o],
							[x,x,x,x,x]]

		var testLevel = new level(levelStructure, 5,5);
		var i;

		result = testLevel.getFullRows();
				
		equals(result[0], 1, "We expect this to equal 1 the index of the first full row");
		equals(result[1], 3, "We expect this to equal 3 the index of the next full row");
			
	});

	test('Test clearRows function', function() {

		var testLevel = new level(null, 5,5);
		var i;
		
		for(i = 0; i < testLevel.getStructure()[0].length; i++){
			testLevel.getStructure()[2][i] = "#336699";	
		}

		testLevel.clearRows([2]);

		for(i = 0; i < testLevel.getStructure()[0].length; i++){
			equals(testLevel.getStructure()[2][i], undefined, "We expect the space at index " + i + " to be undefined");
		}
				
		
		equals(testLevel.getStructure().length, 5, "We expect the length to still be 5");
			
	});
	
	module("Piece Module", {

	});	

	test("Test piece array creation", function() {
		var testPiece = new piece([[true, true], [true, true]]);	
		equals(testPiece.getStructure()[1][1], true, "We expect the array location to be true" );		
	});
	
	test('Test piece rotate counter-clock-wise', function() {
		var testPiece = new piece([[true, false], [false, true]]);
		testPiece.rotate('ccw');
		equals(testPiece.getStructure()[0][0], false, "We expect this location to be false" );
		equals(testPiece.getStructure()[0][1], true, "We expect this location to be true" );
		equals(testPiece.getStructure()[1][0], true, "We expect this location to be true" );
		equals(testPiece.getStructure()[1][1], false, "We expect this location to be false" );		
	});
	
	test('Test "T-piece" rotate clock-wise', function() {
		var testPiece = new piece(
		       [[1,1,1],
			[0,1,0]]
		);
		
		/* Expected Result
		  
		[[0,1],
		 [1,1],
		 [0,1]] */
		
		testPiece.rotate('cw');
		
		equals(testPiece.getStructure()[0][0], 0, "We expect this location to be 0" );
		equals(testPiece.getStructure()[0][1], 1, "We expect this location to be 0" );
		equals(testPiece.getStructure()[1][0], 1, "We expect this location to be 0" );
		equals(testPiece.getStructure()[1][1], 1, "We expect this location to be 1" );
		equals(testPiece.getStructure()[2][0], 0, "We expect this location to be 0" );
		equals(testPiece.getStructure()[2][1], 1, "We expect this location to be 0" );
	});
	
	
	
});