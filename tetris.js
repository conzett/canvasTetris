var piece = function(structure, top, left){
	
	// structure should be a multidimensional
	// array of equal height and width
	
	this.structure = structure || [[true]];
	this.top = top || 0;
	this.left = left || 0;
	
	this.rotate = function(direction){
		
		var temp = new Array(this.structure.length);
		var i, j;
		for(i = 0; i < temp.length; ++i){
			temp[i] = new Array(temp.length);
			for (j = 0; j < temp.length; ++j){
				if(direction === 'ccw'){
					temp[i][j] = this.structure[i][temp.length - j - 1];
				}else if(direction === 'cw'){
					temp[i][j] = this.structure[temp.length - j - 1][i];
				}				
			}
		}
		this.structure = temp;
	}
}

var level = function(width, height){
	
	this.structure = new Array(height);
	this.pieces = [
		new piece(
		       [[0,0,1,0],
			[0,0,1,0],
			[0,0,1,0],
			[0,0,1,0]]
		),
		new piece(
		       [[0,0,0],
			[0,1,1],
			[1,1,0]]
		),
		new piece(
		       [[0,0,0],
			[1,1,0],
			[0,1,1]]
		),
		new piece(
		       [[0,0,0],
			[0,1,0],
			[1,1,1]]
		),
		new piece(
		       [[0,0,0],
			[1,0,0],
			[1,1,1]]
		),
		new piece(
		       [[0,0,0],
			[0,0,1],
			[1,1,1]]
		),
		new piece(
		       [[1,1],
			[1,1]]
		)
	];
	
	var i;
	for (i = 0; i < this.structure.length; ++i){
		this.structure[i] = new Array(width);
	}
	
	this.createPiece = function(){
		return this.pieces[Math.floor(Math.random()*this.pieces.length)];	
	}
	
	this.active = this.createPiece();
}

var game = function(canvas, level, score, time){
	
	this.canvas = canvas || document.getElementById('level');
	this.level = level || new level(300, 500);
	this.canvas.width = this.level.structure[0].length;
	this.canvas.height = this.level.structure.length;
	this.score = score || 0;
	this.time = time || 100;
	this.status = "play";
	this.fps = 0;
	var that = this;
	
	window.addEventListener('keydown', function(event) {
		
		switch (event.keyCode) {
			case 37:
				//left
				break;
			case 38:
				//up
				break;
			case 39:
				//right
				break;
			case 40:
				//down
				break;
		}
		
	}, false );
	
	this.fpsLoop = function(){
		document.getElementById('fps').innerHTML = that.fps;
		that.fps = 0;
		setTimeout ( that.fpsLoop, 1000);
	}
	
	this.renderLoop = function(){
	
		context.clearRect(0, 0, that.level.structure[0].length, that.level.structure.length);
		if( that.status !== "stop" ){
			that.fps ++;
			setTimeout ( that.renderLoop, 10);
		}
	}
	
	if (this.canvas.getContext) {
		var context = this.canvas.getContext('2d');
		this.fpsLoop();
		this.renderLoop();
	} else {
		alert("Canvas Not Supported");
	}
}

var x = new level(300, 500);

var game = new game(null, x);