var piece = function(structure, color, top, left){	
	
	var structure = structure || [[1]];
	var top = (-1 * structure.length)
	var left = (left - structure[0].length +1);
	var height = structure.length;
	var width = structure[0].length;
	var color = color || '#000000';

	this.getStructure = function(){
		return structure.slice(0); // Return copy
	}

	this.getTop = function() {
		return top;
	}

	this.getLeft = function() {
		return left;
	}

	this.getWidth = function() {
		return structure[0].length;
	}

	this.getHeight = function() {
		return structure.length;
	}

	this.getColor = function() {
		return color;
	}

	this.drop = function() {
		top = top + 1;
	}

	this.moveLeft = function() {
		left = left - 1;
	}

	this.moveRight = function() {
		left = left + 1;
	}

	this.setLeft = function(increment) {
		left = increment;
	}
	
	this.rotate = function(direction){
		
		var temp = new Array(structure[0].length);
		var i, j;
		for(i = 0; i < temp.length; ++i){
			temp[i] = new Array(structure.length);
			for (j = 0; j < temp[0].length; ++j){
				if(direction === 'ccw'){
					temp[i][j] = structure[j][temp.length - i - 1];
				}else if(direction === 'cw'){
					temp[i][j] = structure[temp[0].length - j - 1][i];
				}				
			}
		}
		structure = temp;
	}
}

var level = function(width, height, p){
	
	this.structure = new Array(height);
	this.width = width;
	this.height = height;

	
	var i;
	
	for (i = 0; i < height; ++i){
		this.structure[i] = new Array(width);
	}
	
	this.createPiece = function(){

		var left = Math.floor(width/2);
		var num = Math.floor(Math.random()*7);

		switch(num)
		{
			case 0:
				return new piece([[1],[1],[1],[1]], '#8FEBE9', 0, left);
				break;
			case 1:
				return new piece([[0,1,1],[1,1,0]], '#3ED936', 0, left);
				break;
			case 2:
				return new piece([[1,1,0],[0,1,1]], '#F23E22', 0, left);
				break;
			case 3:
				return new piece([[1,1,1],[0,1,0]], '#B21DCC', 0, left);
				break;
			case 4:
				return new piece([[0,1],[0,1],[1,1]], '#194CC2', 0, left);
				break;
			case 5:
				return new piece([[1,0],[1,0],[1,1]], '#F2B022', 0, left);
				break;
			case 6:
				return new piece([[1,1],[1,1]], '#F2ED50', 0, left);
				break;
		}
	}
	
	this.active = p || this.createPiece();	

	this.isObstructedLeft = function(){
		if(this.active.getLeft() <= 0){
			return true;
		}

		var pieceStructure = this.active.getStructure();

		for(i = 0; i < this.active.getHeight(); i++){
			for(j = 0; j < this.active.getWidth(); j++){
				if(pieceStructure[i][j] === 1){
					var top = this.active.getTop();
					if(top < 0) top = 0;
					if(this.structure[top + i][this.active.getLeft() +j -1] != undefined){
						return true;
					}
					break;
				}
			}
		}
		return false;		
	}

	this.isObstructedRight = function(){
		if(this.active.getLeft() + this.active.getWidth() >= width){
			return true;
		}

		var pieceStructure = this.active.getStructure();

		for(i = 0; i < this.active.getHeight(); i++){
			for(j = (this.active.getWidth() -1); j >= 0; j--){
				if(pieceStructure[i][j] === 1){
					var top = this.active.getTop();
					if(top < 0) top = 0;
					if(this.structure[top + i][this.active.getLeft() + j + 1] != undefined){
						return true;
					}
					break;
				}
			}
		}
		return false;		
	}

	this.isObstructedBottom = function(){
		var j, nextRow, pieceStructure = this.active.getStructure();
		for (i = (this.active.getHeight() - 1); i >= 0; i--){
			nextRow = 1 + i + this.active.getTop();
			if(nextRow >= height){
				return true;
			}
			if(nextRow < 0){
				break;
			}
			for(j = 0; j <= (this.active.getWidth() -1); j++){
				if(pieceStructure[i][j] === 1){
					if(this.structure[nextRow][this.active.getLeft() + j] != undefined){
						return true;
					}
				}
			}
		}
		return false;	
	}

	this.placeActive = function(){
		var j, pieceStructure = this.active.getStructure();
		for(i = 0; i < this.active.getHeight(); ++i){
			for (j = 0; j < this.active.getWidth(); ++j){
				if(pieceStructure[i][j] == 1){
					if((i + this.active.getTop()) >= 0){
						this.structure[i + this.active.getTop()][j + this.active.getLeft()] = this.active.getColor();
					}	
				}
			}
		}
	}

	this.getFullRows = function(){
		var j, result = [];
		for(i = 0; i < height; i++){
			for(j = 0; j < width; j++){
				if(this.structure[i][j] === undefined){
					break;
				}else if(j === (width -1)){
					result.push(i);
				}
			}
		}
		return result;
	}

	this.clearRows = function(rows){
		for(i=0; i < rows.length; i++){
			this.structure.splice(rows[i],1);
			this.structure.unshift(new Array(width))
		}	
	}
}

var game = function(canvas, level, score, time){
	
	this.canvas = canvas || document.getElementById('level');
	this.level = level || new level(8, 16);
	this.levelNumber = 0;
	this.linesCleared = 0;
	this.score = score || 0;
	this.time = time || 100;
	this.status = "play";
	this.increment = 20;
	this.canvas.width = this.level.width * this.increment;
	this.canvas.height = this.level.height * this.increment;

	var that = this;
	var img = new Image();
	img.src = 'block.png';
	
	window.addEventListener('keydown', function(event) {
		
		switch (event.keyCode) {
			case 37:
				if(!that.level.isObstructedLeft()){
					that.level.active.moveLeft();
				}				
				break;
			case 38:
				that.level.active.rotate('cw');

				if(that.level.active.getLeft() + that.level.active.getWidth() >= that.level.width){
					that.level.active.setLeft(that.level.width - that.level.active.getWidth());
				}

				break;
			case 39:
				if(!that.level.isObstructedRight()){
					that.level.active.moveRight();
				}				
				break;
			case 40:
				if(!that.level.isObstructedBottom()){
					that.level.active.drop();
				}				
				break;
			case 19:
				that.pause();		
				break;
			case 80:
				that.pause();		
				break;
		}
		
	}, false );

	this.pause = function() {
		if(that.status === "play"){
					that.status = "stop";
				}else{
					that.status = "play";
					that.renderLoop();
					that.dropLoop();
		}
	}
	
	this.drawActive = function(){		
		var i, j, x = that.increment, structure = that.level.active.getStructure();	
		
		context.fillStyle = that.level.active.getColor();	
		for (i = 0; i < that.level.active.getHeight(); ++i){
			for (j = 0; j < that.level.active.getWidth(); ++j){
				if(structure[i][j] === 1){
					context.fillRect(
						(j + that.level.active.getLeft()) * x,
						(i + that.level.active.getTop()) * x,
						x, x
					);
					context.drawImage(img,
						(j + that.level.active.getLeft()) * x,
						(i + that.level.active.getTop()) * x);
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
					context.drawImage(img,
						j * x,
						i * x);
				}
			}
		}
	}
	
	this.dropLoop = function(){
		if(that.level.isObstructedBottom()){
			if(that.level.active.getTop() < 0){
				that.status = "stop";
				console.log("game over");
			}
			that.level.placeActive();
			that.level.active = that.level.createPiece();
		}else{
			that.level.active.drop();	
		}

		var fullRows = that.level.getFullRows();

		switch(fullRows.length)
		{
		case 1:
			that.score += (40*(that.levelNumber +1));
			break;
		case 2:
			that.score += (100*(that.levelNumber +1));
			break;
		case 3:
			that.score += (300*(that.levelNumber +1));
			break;
		case 4:
			that.score += (1200*(that.levelNumber +1));
			break;
		}

		document.getElementById("score").innerHTML = that.score;
		that.linesCleared += fullRows.length;
		that.levelNumber = Math.floor(that.linesCleared/10);
		that.level.clearRows(fullRows);

		if( that.status !== "stop" ){
			setTimeout ( that.dropLoop, (500 - (that.levelNumber * 10)));
		}		
	}
	
	this.renderLoop = function(){
	
		context.clearRect(0, 0, that.level.width * that.increment, that.level.height * that.increment);
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
		this.renderLoop();
		this.dropLoop();
	} else {
		//insert warning about not supported canvas
	}
}