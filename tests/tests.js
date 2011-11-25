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
		
		var testPiece = this.level.createPiece();
		ok(oneOrZero(testPiece.structure[1][1]), "We expect the random piece to be at least this large" );		
	});
	
	test("Test checkInBoundsLeft() method", function() {		
		
		var testLevel = new level(6,6, new piece());
		testLevel.active.left = 0;
		equals(testLevel.checkInBoundsLeft(), false, "0 units to the left, we expect the value to be false");
		
		testLevel.active.left = 1;
		equals(testLevel.checkInBoundsLeft(), true, "1 units to the left, we expect the value to be true");
		
	});
	
	test("Test checkInBoundsRight() method", function() {		
		
		var testLevel = new level(6,6, new piece());
		testLevel.active.left = 5;
		equals(testLevel.checkInBoundsRight(), false, "6 units to the left, we expect the value to be false");
		
		testLevel.active.left = 4;
		equals(testLevel.checkInBoundsRight(), true, "5 units to the left, we expect the value to be true");
		
	});
	
	test("Test checkInBoundsBottom() method", function() {		
		
		var testLevel = new level(6,6, new piece());
		
		testLevel.active.left = 0;
		testLevel.active.top = 5;
		equals(testLevel.checkInBoundsBottom(), false, "6 units from the top, expect the value to be false");
		
		testLevel.active.top = 4;
		equals(testLevel.checkInBoundsBottom(), true, "5 units from the top, expect the value to be true");
		
	});

	test('Test set piece function', function() {

		var color = "#336699";

		var testPiece = new piece(
		    [[1,1,1],
			[0,1,0]], color
		);

		testPiece.top = 2;
		testPiece.left = 2;

		var testLevel = new level(5,4, testPiece);		

		testLevel.placeActive();

		equals(testLevel.structure[2][2], color, "We expect this location to contain the color " + color );
		equals(testLevel.structure[2][3], color, "We expect this location to contain the color " + color );
		equals(testLevel.structure[2][4], color, "We expect this location to contain the color " + color );
		equals(testLevel.structure[3][2], undefined, "We expect this location to nothing");
		equals(testLevel.structure[3][3], color, "We expect this location to contain the color " + color );
		equals(testLevel.structure[3][4], undefined, "We expect this location to nothing");
		
	});

	test('Test isObstructedLeft function', function() {

		var testPiece = new piece(
		    [[1,1,1],
			[0,1,0]]
		);

		testPiece.top = 1;
		testPiece.left = 1;

		var testLevel = new level(5,4, testPiece);	

		testLevel.structure[1][0] = "#336699";		
		ok(testLevel.isObstructedLeft(), "We expect this location to return true");

		testLevel.structure[1][0] = undefined;		
		ok(!testLevel.isObstructedLeft(), "We expect this location to return false");

		testLevel.structure[2][1] = "#336699";		
		ok(testLevel.isObstructedLeft(), "We expect this location to return true");
			
	});

	test('Test isObstructedRight function', function() {

		var testPiece = new piece(
		    [[1,1,1],
			[0,1,0]]
		);

		testPiece.top = 1;
		testPiece.left = 1;

		var testLevel = new level(5,4, testPiece);		

		testLevel.structure[1][4] = "#336699";		
		ok(testLevel.isObstructedRight(), "We expect this location to return true");
		
		testLevel.structure[1][4] = undefined;		
		ok(!testLevel.isObstructedRight(), "We expect this location to return false");

		testLevel.structure[2][3] = "#336699";		
		ok(testLevel.isObstructedRight(), "We expect this location to return true");
			
	});

	test('Test isObstructedBottom function', function() {

		var testPiece = new piece(
		    [[1,1,1],
			[0,1,0]]
		);

		testPiece.top = 1;
		testPiece.left = 1;

		var testLevel = new level(5,4, testPiece);		

		testLevel.structure[3][2] = "#336699";		
		ok(testLevel.isObstructedBottom(), "We expect this location to return true");
		
		testLevel.structure[3][2] = undefined;		
		ok(!testLevel.isObstructedBottom(), "We expect this location to return false");

		testLevel.structure[2][1] = "#336699";		
		ok(testLevel.isObstructedBottom(), "We expect this location to return true");
			
	});

	test('Test getFullRows function', function() {

		var testLevel = new level(5,5);
		var i;

		testLevel.structure[0][2] = "#336699";
		
		for(i = 0; i < testLevel.structure[0].length; i++){
			testLevel.structure[2][i] = "#336699";	
		}

		for(i = 0; i < testLevel.structure[0].length; i++){
			testLevel.structure[4][i] = "#336699";	
		}

		result = testLevel.getFullRows();
				
		equals(2, 2, "We expect this to equl 2 the index of the first full row");
		equals(4, 4, "We expect this to equl 4 the index of the next full row");
			
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
			[0,1,0]]
		);
		
		/* Expected Result
		  
		[[0,1],
		 [1,1],
		 [0,1]] */
		
		testPiece.rotate('cw');
		
		equals(testPiece.structure[0][0], 0, "We expect this location to be 0" );
		equals(testPiece.structure[0][1], 1, "We expect this location to be 0" );
		equals(testPiece.structure[1][0], 1, "We expect this location to be 0" );
		equals(testPiece.structure[1][1], 1, "We expect this location to be 1" );
		equals(testPiece.structure[2][0], 0, "We expect this location to be 0" );
		equals(testPiece.structure[2][1], 1, "We expect this location to be 0" );
	});
	
	
	
});