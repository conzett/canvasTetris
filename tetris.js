var level = function(width, height){
	
	this.structure = new Array(height);
	
	var i;
	for (i = 0; i < this.structure.length; ++i){
		this.structure[i] = new Array(width);
	}
	
	
}

var piece = function(structure, top, left){
	
	this.structure = structure || [[true]];
	this.top = top || 0;
	this.left = left || 0;
	
	this.rotateRight = function(){
		var temp = new Array(this.structure.length);
		var i, j;
		for(i = 0; i < temp.length; ++i){
			temp[i] = new Array(temp.length);
			for (j = 0; j < temp.length; ++j){
				temp[i][j] = this.structure[temp.length - j - 1][i];
			}
		}
		this.structure = temp;
	}
	
	this.rotateLeft = function(){
		var temp = new Array(this.structure.length);
		var i, j;
		for(i = 0; i < temp.length; ++i){
			temp[i] = new Array(temp.length);
			for (j = 0; j < temp.length; ++j){
				temp[i][j] = this.structure[i][temp.length - j - 1];
			}
		}
		this.structure = temp;
	}
}