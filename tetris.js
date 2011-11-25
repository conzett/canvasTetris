var piece = function(structure, color, top, left){	
	
	this.structure = structure || [[1]];
	this.top = top || 0;
	this.left = left || 0;
	this.color = color || '#000000';
	
	this.rotate = function(direction){
		
		var temp = new Array(this.structure[0].length);
		var i, j;
		for(i = 0; i < temp.length; ++i){
			temp[i] = new Array(this.structure.length);
			for (j = 0; j < temp[0].length; ++j){
				if(direction === 'ccw'){
					temp[i][j] = this.structure[j][temp.length - i - 1];
				}else if(direction === 'cw'){
					temp[i][j] = this.structure[temp[0].length - j - 1][i];
				}				
			}
		}
		this.structure = temp;
	}
}

var level = function(width, height, _piece){
	
	this.structure = new Array(height);	
	
	this.pieces = [
		new piece(
		       [[1],
			[1],
			[1],
			[1]],
		       '#8FEBE9'
		),
		new piece(
		       [[0,1,1],
			[1,1,0]],
		       '#3ED936'
		),
		new piece(
		       [[1,1,0],
			[0,1,1]],
		       '#F23E22'
		),
		new piece(
		       [[1,1,1],
			[0,1,0]],
		       '#B21DCC'
		),
		new piece(
		       [[0,1],
			[0,1],
			[1,1]],
		       '#194CC2'
		),
		new piece(
		       [[1,0],
			[1,0],
			[1,1]],
		       '#F2B022'
		),
		new piece(
		       [[1,1],
			[1,1]],
		       '#F2ED50'
		)
	];
	
	var i;
	
	for (i = 0; i < this.structure.length; ++i){
		this.structure[i] = new Array(width);
	}
	
	this.createPiece = function(){
		var p = this.pieces[Math.floor(Math.random()*this.pieces.length)];
		p.left = Math.floor((this.structure[0].length - p.structure[0].length)/2);
		p.top = 0; //reset these since we're referencing existing objects
		return p;
	}
	
	this.active = _piece || this.createPiece();
	
	this.checkInBoundsLeft = function(){		
		if(this.active.left <= 0){
			return false;
		}
		return true;
	}
	
	this.checkInBoundsRight = function(){		
		if(this.active.left + this.active.structure[0].length >= this.structure[0].length){
			return false;
		}
		return true;
	}
	
	this.checkInBoundsBottom = function(){	
		if(this.active.top + this.active.structure.length >= this.structure.length){
			return false;
		}
		return true;
	}

	this.isObstructedLeft = function(){
		for(i = 0; i < this.active.structure.length; i++){
			for(j = 0; j < this.active.structure[i].length; j++){
				if(this.active.structure[i][j] === 1){
					if(this.structure[this.active.top + i][this.active.left +j -1] != undefined){
						return true;
					}
					break;
				}
			}
		}
		return false;		
	}

	this.isObstructedRight = function(){
		
	}

	this.isObstructedBottom = function(){
		
	}

	this.placeActive = function(){
		var j;
		for(i = 0; i < this.active.structure.length; ++i){
			for (j = 0; j < this.active.structure[i].length; ++j){
				if(this.active.structure[i][j] == 1){
					this.structure[i + this.active.top][j + this.active.left] = this.active.color;	
				}
			}
		}
	}
}

var game = function(canvas, level, score, time){
	
	this.canvas = canvas || document.getElementById('level');
	this.level = level || new level(8, 16);
	this.score = score || 0;
	this.time = time || 100;
	this.status = "play";
	this.fps = 0;
	this.increment = 20;
	this.canvas.width = this.level.structure[0].length * this.increment;
	this.canvas.height = this.level.structure.length * this.increment;
	var that = this;
	
	window.addEventListener('keydown', function(event) {
		
		switch (event.keyCode) {
			case 37:
				if(that.level.checkInBoundsLeft() &&
					!that.level.isObstructedLeft()){
					that.level.active.left -= 1;	
				}				
				break;
			case 38:
				that.level.active.rotate('cw');
				if(!that.level.checkInBoundsRight()){
					that.level.active.left =
						(that.level.structure[0].length - that.level.active.structure[0].length);	
				}
				if(!that.level.checkInBoundsBottom()){
					that.level.active.top =
						(that.level.structure.length - that.level.active.structure.length);	
				}
				break;
			case 39:
				if(that.level.checkInBoundsRight()){
					that.level.active.left += 1;	
				}				
				break;
			case 40:
				if(that.level.checkInBoundsBottom()){
					that.level.active.top += 1;	
				}				
				break;
		}
		
	}, false );
	
	this.drawActive = function(){		
		var i, j, x = that.increment;
		
		context.fillStyle = that.level.active.color;
		
		for (i = 0; i < that.level.active.structure.length; ++i){
			for (j = 0; j < that.level.active.structure[i].length; ++j){
				if(that.level.active.structure[i][j] === 1){
					context.fillRect(
						(j + that.level.active.left) * x,
						(i + that.level.active.top) * x,
						x, x
					);
				}
			}
		}	
	}

	this.drawLevel = function(){
		var i, j, x = that.increment;

		for (i = 0; i < that.level.structure.length; ++i){
			for (j = 0; j < that.level.structure[i].length; ++j){
				if(that.level.structure[i][j] != undefined ){
					context.fillStyle = that.level.structure[i][j];
					context.fillRect(
						(j * x),
						(i * x),
						x, x
					);
				}
			}
		}
	}
	
	this.fpsLoop = function(){
		document.getElementById('fps').innerHTML = that.fps;
		that.fps = 0;
		setTimeout ( that.fpsLoop, 1000);
	}
	
	this.dropLoop = function(){
		if(that.level.checkInBoundsBottom()){
			that.level.active.top++;	
		}else{
			that.level.placeActive();
			that.level.active = that.level.createPiece();			
		}
		setTimeout ( that.dropLoop, 500);
	}
	
	this.renderLoop = function(){
	
		context.clearRect(0, 0, that.level.structure[0].length * that.increment, that.level.structure.length * that.increment);
		context.fillStyle = "rgb(0, 31, 0)";
		that.drawActive();
		that.drawLevel();
		if( that.status !== "stop" ){
			that.fps ++;
			setTimeout ( that.renderLoop, 40);
		}
	}
	
	if (this.canvas.getContext) {
		var context = this.canvas.getContext('2d');
		this.fpsLoop();
		this.renderLoop();
		this.dropLoop();
	} else {
		alert("Canvas Not Supported");
	}
}

var x = new level(16, 32);

var game = new game(null, x);