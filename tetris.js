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
}

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