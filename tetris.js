Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

var piece = function(structure, color, top, left){	
	
	var structure = structure || [[1]];
	var top = (-1 * structure.length)
	var left = (left - structure[0].length +1);
	var height = structure.length;
	var width = structure[0].length;
	var color = color || '#000000';

	this.getStructure = function(){
		return structure.clone();
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
	
	var structure = new Array(height);
	var width = width;
	var height = height;	
	var i;
		
	var createPiece = function(){

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

	var active = p || createPiece();

	for (i = 0; i < height; ++i){
		structure[i] = new Array(width);
	}

	this.getWidth = function() {
		return structure[0].length;
	}

	this.getHeight = function() {
		return structure.length;
	}

	this.getStructure = function(){
		return structure.clone();
	}

	this.moveActiveLeft = function() {
		if(!this.isObstructedLeft()){
			active.moveLeft();
		}
	}

	this.moveActiveRight = function() {
		if(!this.isObstructedRight()){
			active.moveRight();	
		}
	}

	this.dropActive= function() {
		if(!this.isObstructedBottom()){
			active.drop();
		}		
	}

	this.rotateActive = function() {
		active.rotate('cw');
		if(active.getLeft() + active.getWidth() >= width){
			active.setLeft(width - active.getWidth());
		}
	}

	this.getActive = function() {
		return active.clone();
	}

	this.isObstructedLeft = function(){
		if(active.getLeft() <= 0){
			return true;
		}

		var pieceStructure = active.getStructure();

		for(i = 0; i < active.getHeight(); i++){
			for(j = 0; j < active.getWidth(); j++){
				if(pieceStructure[i][j] === 1){
					var top = active.getTop();
					if(top < 0) top = 0;
					if(structure[top + i][active.getLeft() +j -1] != undefined){
						return true;
					}
					break;
				}
			}
		}
		return false;		
	}

	this.isObstructedRight = function(){
		if(active.getLeft() + active.getWidth() >= width){
			return true;
		}

		var pieceStructure = active.getStructure();

		for(i = 0; i < active.getHeight(); i++){
			for(j = (active.getWidth() -1); j >= 0; j--){
				if(pieceStructure[i][j] === 1){
					var top = active.getTop();
					if(top < 0) top = 0;
					if(structure[top + i][active.getLeft() + j + 1] != undefined){
						return true;
					}
					break;
				}
			}
		}
		return false;		
	}

	this.isObstructedBottom = function(){
		var j, nextRow, pieceStructure = active.getStructure();
		for (i = (active.getHeight() - 1); i >= 0; i--){
			nextRow = 1 + i + active.getTop();
			if(nextRow >= height){
				return true;
			}
			if(nextRow < 0){
				break;
			}
			for(j = 0; j <= (active.getWidth() -1); j++){
				if(pieceStructure[i][j] === 1){
					if(structure[nextRow][active.getLeft() + j] != undefined){
						return true;
					}
				}
			}
		}
		return false;	
	}

	this.placeActive = function(){
		var j, pieceStructure = active.getStructure();
		for(i = 0; i < active.getHeight(); ++i){
			for (j = 0; j < active.getWidth(); ++j){
				if(pieceStructure[i][j] == 1){
					if((i + active.getTop()) >= 0){
						structure[i + active.getTop()][j + active.getLeft()] = active.getColor();
					}	
				}
			}
		}
		active = createPiece();
	}

	this.getFullRows = function(){
		var j, result = [];
		for(i = 0; i < height; i++){
			for(j = 0; j < width; j++){
				if(structure[i][j] === undefined){
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
			structure.splice(rows[i],1);
			structure.unshift(new Array(width))
		}	
	}
}

var game = function(canvas, level, score, time){
	
	var canvas = canvas || document.getElementById('level'),
		level = level || new level(8, 16),
		levelNumber = 0,
		linesCleared = 0,
		score = score || 0,
		time = time || 100,
		status = "play",
		increment = 20,
		img = new Image();

	canvas.width = (level.getWidth() * increment);
	canvas.height = (level.getHeight() * increment);
	img.src = 'block.png';
	
	window.addEventListener('keydown', function(event) {
		
		switch (event.keyCode) {
			case 37:
				level.moveActiveLeft();			
				break;
			case 38:
				level.rotateActive();
				break;
			case 39:
				level.moveActiveRight();				
				break;
			case 40:
				level.dropActive();		
				break;
			case 19:
				this.pause();		
				break;
			case 80:
				this.pause();		
				break;
		}
		
	}, false );

	this.pause = function() {
		if(status === "play"){
			status = "stop";
		}else{
			status = "play";
			renderLoop();
			dropLoop();
		}
	}
	
	var drawActive = function(){		
		var i, j, x = increment,
			piece = level.getActive(),
			pieceStructure,
			pieceLeft,
			pieceTop;

		pieceStructure = piece.getStructure();
		pieceLeft = piece.getLeft()
		pieceTop = piece.getTop();
		context.fillStyle = piece.getColor();

		for (i = 0; i < piece.getHeight(); ++i){
			for (j = 0; j < piece.getWidth(); ++j){
				if(pieceStructure[i][j] === 1){
					context.fillRect(
						(j + pieceLeft) * x,
						(i + pieceTop) * x,
						x, x
					);
					context.drawImage(img,
						(j + pieceLeft) * x,
						(i + pieceTop) * x);
				}
			}
		}
	}

	var drawLevel = function(){
		var i, j, x = increment, levelStructure = level.getStructure();
		for (i = 0; i < level.getHeight(); ++i){
			for (j = 0; j < level.getWidth(); ++j){
				if(levelStructure[i][j] != undefined ){
					context.fillStyle = levelStructure[i][j];
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
	
	var dropLoop = function(){
		if(level.isObstructedBottom()){
			var piece = level.getActive();
			if(piece.getTop() < 0){
				status = "stop";
				console.log("game over");
			}
			level.placeActive();
		}else{
			level.dropActive();	
		}

		var fullRows = level.getFullRows();

		switch(fullRows.length)
		{
		case 1:
			score += (40*(levelNumber +1));
			break;
		case 2:
			score += (100*(levelNumber +1));
			break;
		case 3:
			score += (300*(levelNumber +1));
			break;
		case 4:
			score += (1200*(levelNumber +1));
			break;
		}

		document.getElementById("score").innerHTML = score;
		linesCleared += fullRows.length;
		levelNumber = Math.floor(linesCleared/10);
		level.clearRows(fullRows);

		if( status !== "stop" ){
			setTimeout ( dropLoop, (500 - (levelNumber * 10)));
		}		
	}
	
	var renderLoop = function(){
		context.clearRect(0, 0, level.getWidth() * increment, level.getHeight() * increment);
		context.fillStyle = "rgb(0, 31, 0)";
		drawActive();
		drawLevel();
		if( status !== "stop" ){
			setTimeout ( renderLoop, 40);
		}
	}
	
	if (canvas.getContext) {
		var context = canvas.getContext('2d');
		renderLoop();
		dropLoop();
	} else {
		//insert warning about not supported canvas
	}
}