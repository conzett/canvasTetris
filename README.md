#Canvas Tetris

Canvas Tetris was an attempt to reproduce the famous brick-dropping game in JavaScript and `canvas` using test-driven modular development from start to finish. Each component had tests written for it first and were then implemented and refactored incrementally.

OOP JavaScript practices were used throughout, with private members exposed via getters and setters. Components observe Demeters Law, and the dependency injection pattern is applied to all the game to allow easy mocking of objects for tests.

##Controls

- __Up arrow__ : Rotate Piece
- __Down arrow__ : Drop faster
- __Left arrow__ : Move piece left
- __Right arrow__ : Move piece right
- __p__ or __Pause__ : Pause game

##Game Objects

###Piece
Arguments

- __structure__ : A multidimensional array that makes up the piece. Default is  `[[1]]`
- __color__ : The color, in hex, of the piece. Default is `#000000`
- __top__ : Integer representing units from the top of the level. Default is the negative height of the piece
- __left__ : Integer representing units from the left side of the level. Default is the length of the piece

###Level
Arguments

- __structure__ : A multidimensional array that makes up the level. If `null` it will use the width and height arguments
- __width__ : Optional integer specifying the width of the level in lieu of a literal structure
- __height__ : Optional integer specifying the height of the level in lieu of a literal structure
- __piece__ : The default active piece. If null or undefined one will be generated randomly

###Game
Arguments

- __canvas__ : The canvas DOM element that will be used
- __level__ : A vlid level object
- __score__ : An integer that is the the starting score

##Creating a Game

Provide a basic HTML structure that includes a canvas element and optionally a level counter, a score counter, a "game over" element and an FPS counter:

	<canvas id="level"></canvas>
	<div id="gameover">Game Over</div>
	<div id="game-info">
		<p>Score: <span id="score"></span></p>
		<p>Level: <span id="level-number"></span></p>
	</div>
	<p id="fps-info">FPS: <span id="fps"></span></p>

With the basic structure in place, simply include the tetris.js file, and initialize a game using your desired options

	<script type="text/javascript">
		var x = new Level(null, 16, 32);
		var game = new Game(null, x);
	</script>

The example above created a new 16 x 32 level with all the options set to their defaults. For extra fun you can create custom levels and pass them to the game. The following example creates pink text pieces that say "coming soon" that interacts with the Tetris pieces:

	var structure = [];
	var x = "#ee3c96";
	var o = undefined;

	structure = [
		[o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,o,o,o,o,o,o,o,o,o],
		[o,x,x,o,o,x,x,o,o,x,x,x,o,x,o,o,o,o,x,x,o,o,o,x,x,x],
		[x,o,o,o,x,o,o,x,o,x,o,o,x,o,x,o,x,o,x,o,x,o,x,o,o,x],
		[x,o,o,o,x,o,o,x,o,x,o,o,x,o,x,o,x,o,x,o,x,o,x,o,o,x],
		[o,x,x,o,o,x,x,o,o,x,o,o,x,o,x,o,x,o,x,o,x,o,o,x,x,x],
		[o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x],
		[o,o,o,o,o,x,x,o,o,x,x,o,o,o,x,x,o,o,x,x,o,o,o,x,x,o],
		[o,o,o,o,x,o,o,o,x,o,o,x,o,x,o,o,x,o,x,o,x,o,o,o,o,o],
		[o,o,o,o,o,o,x,o,x,o,o,x,o,x,o,o,x,o,x,o,x,o,o,o,o,o],
		[o,o,o,o,x,x,o,o,o,x,x,o,o,o,x,x,o,o,x,o,x,o,o,o,o,o]
	]

	var l = new level(structure);
	var game = new game(null, l);

You can create any custom level you want as long as you make sure to set the empty spaces to `undefined` and the occupied level spaces to a color in hex.

##Browser Compatibility

Should work in all major modern browsers, guessing older versions of IE (8 and below) will not due to key binding issues as well as not natively supporting canvas.

##License

GNU GPL Version 3 http://www.gnu.org/copyleft/gpl.html