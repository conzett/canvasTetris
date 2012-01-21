Object.prototype.clone = function () {
	'use strict';
	var newObj = (this instanceof Array) ? [] : {},
		i;

	for (i in this) {
		if (this.hasOwnProperty(i)) {
			if (this[i] && typeof this[i] === "object") {
				newObj[i] = this[i].clone();
			} else {
				newObj[i] = this[i];
			}
		}
	}

	return newObj;
};

var Piece = function (structure, color, top, left) {
	'use strict';
	structure = structure || [[1]];
	color = color || '#000000';

	if (top === null) {
		top = (-1 * structure.length);
	}

	if (left === null) {
		left = structure[0].length + 1;
	}

	this.getStructure = function () {
		return structure.clone();
	};

	this.getTop = function () {
		return top;
	};

	this.getLeft = function () {
		return left;
	};

	this.getWidth = function () {
		return structure[0].length;
	};

	this.getHeight = function () {
		return structure.length;
	};

	this.getColor = function () {
		return color;
	};

	this.drop = function () {
		top = top + 1;
	};

	this.moveLeft = function () {
		left = left - 1;
	};

	this.moveRight = function () {
		left = left + 1;
	};

	this.setLeft = function (increment) {
		left = increment;
	};

	this.rotate = function (direction) {

		var temp = new Array(structure[0].length),
			i,
			j;

		for (i = 0; i < temp.length; i += 1) {
			temp[i] = new Array(structure.length);
			for (j = 0; j < temp[0].length; j += 1) {
				if (direction === 'ccw') {
					temp[i][j] = structure[j][temp.length - i - 1];
				} else if (direction === 'cw') {
					temp[i][j] = structure[temp[0].length - j - 1][i];
				}
			}
		}
		structure = temp;
	};
};

var Level = function (structure, width, height, p) {
	'use strict';
	var createPiece,
		active,
		i,
		j;

	if (structure === null || structure === undefined) {
		structure = [];
		for (i = 0; i < height; i += 1) {
			structure[i] = [];
			for (j = 0; j < width; j += 1) {
				structure[i].push(undefined);
			}
		}
	} else {
		width = structure[0].length;
		height = structure.length;
	}

	createPiece = function () {

		var left = Math.floor(width / 2),
			num = Math.floor(Math.random() * 7);

		switch (num) {
		case 0:
			return new Piece([[1], [1], [1], [1]], '#8FEBE9', null, left);
		case 1:
			return new Piece([[0, 1, 1], [1, 1, 0]], '#3ED936', null, (left - 2));
		case 2:
			return new Piece([[1, 1, 0], [0, 1, 1]], '#F23E22', null, (left - 2));
		case 3:
			return new Piece([[1, 1, 1], [0, 1, 0]], '#B21DCC', null, (left - 2));
		case 4:
			return new Piece([[0, 1], [0, 1], [1, 1]], '#194CC2', null, (left - 1));
		case 5:
			return new Piece([[1, 0], [1, 0], [1, 1]], '#F2B022', null, (left - 1));
		case 6:
			return new Piece([[1, 1], [1, 1]], '#F2ED50', null, (left - 1));
		}
	};

	active = p || createPiece();

	this.getWidth = function () {
		return structure[0].length;
	};

	this.getHeight = function () {
		return structure.length;
	};

	this.getStructure = function () {
		return structure.clone();
	};

	this.moveActiveLeft = function () {
		if (!this.isObstructedLeft()) {
			active.moveLeft();
		}
	};

	this.moveActiveRight = function () {
		if (!this.isObstructedRight()) {
			active.moveRight();
		}
	};

	this.dropActive = function () {
		if (!this.isObstructedBottom()) {
			active.drop();
		}
	};

	this.rotateActive = function () {
		active.rotate('cw');
		if (active.getLeft() + active.getWidth() >= width) {
			active.setLeft(width - active.getWidth());
		}
	};

	this.getActive = function () {
		return active.clone();
	};

	this.isObstructedLeft = function () {
		if (active.getLeft() <= 0) {
			return true;
		}

		var pieceStructure = active.getStructure(),
			top,
			j;

		for (i = 0; i < active.getHeight(); i += 1) {
			for (j = 0; j < active.getWidth(); j += 1) {
				if (pieceStructure[i][j] === 1) {
					top = active.getTop();
					if (top < 0) {
						top = 0;
					}
					if (structure[top + i][active.getLeft() + j - 1] !== undefined) {
						return true;
					}
					break;
				}
			}
		}
		return false;
	};

	this.isObstructedRight = function () {
		if (active.getLeft() + active.getWidth() >= width) {
			return true;
		}

		var pieceStructure = active.getStructure(),
			top,
			j;

		for (i = 0; i < active.getHeight(); i += 1) {
			for (j = (active.getWidth() - 1); j >= 0; j -= 1) {
				if (pieceStructure[i][j] === 1) {
					top = active.getTop();
					if (top < 0) {
						top = 0;
					}
					if (structure[top + i][active.getLeft() + j + 1] !== undefined) {
						return true;
					}
					break;
				}
			}
		}
		return false;
	};

	this.isObstructedBottom = function () {
		var pieceStructure = active.getStructure(),
			nextRow,
			j;

		for (i = (active.getHeight() - 1); i >= 0; i -= 1) {
			nextRow = 1 + i + active.getTop();
			if (nextRow >= height) {
				return true;
			}
			if (nextRow < 0) {
				break;
			}
			for (j = 0; j <= (active.getWidth() - 1); j += 1) {
				if (pieceStructure[i][j] === 1) {
					if (structure[nextRow][active.getLeft() + j] !== undefined) {
						return true;
					}
				}
			}
		}
		return false;
	};

	this.placeActive = function () {
		var pieceStructure = active.getStructure(),
			j;
		for (i = 0; i < active.getHeight(); i += 1) {
			for (j = 0; j < active.getWidth(); j += 1) {
				if (pieceStructure[i][j] === 1) {
					if ((i + active.getTop()) >= 0) {
						structure[i + active.getTop()][j + active.getLeft()] = active.getColor();
					}
				}
			}
		}
		active = createPiece();
	};

	this.getFullRows = function () {
		var result = [],
			j;
		for (i = 0; i < height; i += 1) {
			for (j = 0; j < width; j += 1) {
				if (structure[i][j] === undefined) {
					break;
				} else if (j === (width - 1)) {
					result.push(i);
				}
			}
		}
		return result;
	};

	this.clearRows = function (rows) {
		var newRow = [],
			j;
		for (i = 0; i < rows.length; i += 1) {
			structure.splice(rows[i], 1);
			for (j = 0; j < width; j += 1) {
				newRow.push(undefined);
			}
			structure.unshift(newRow);
		}
	};
};

var Game = function (canvas, level, score) {
	'use strict';
	var	levelNumber = 0,
		linesCleared = 0,
		status = "play",
		increment = 20,
		fullRows = [],
		flash = true,
		fps = 0,
		img = new Image(),
		pause,
		drawActive,
		drawLevel,
		dropLoop,
		renderLoop,
		fpsLoop,
		context,
		gameOverElement,
		tempPiece;

	canvas = canvas || document.getElementById('level');
	level = level || new Level(null, 8, 16);
	canvas.width = (level.getWidth() * increment);
	canvas.height = (level.getHeight() * increment);
	score = score || 0;
	img.src = 'block.png';

	window.addEventListener('keydown', function (event) {
		switch (event.keyCode) {
		case 37:
			if (status === "play") {
				level.moveActiveLeft();					
			}
			break;
		case 38:
			if (status === "play" && !level.isObstructedBottom()) {				
				level.rotateActive();				
			}
			break;
		case 39:
			if (status === "play") {
				level.moveActiveRight();
			}
			break;
		case 40:
			if (status === "play") {
				level.dropActive();
			}
			break;
		case 19:
			pause();
			break;
		case 80:
			pause();
			break;
		}
	}, false);

	drawActive = function () {
		var i, j, x = increment,
			piece = level.getActive(),
			pieceStructure,
			pieceLeft,
			pieceTop;

		pieceStructure = piece.getStructure();
		pieceLeft = piece.getLeft();
		pieceTop = piece.getTop();
		context.fillStyle = piece.getColor();

		for (i = 0; i < piece.getHeight(); i += 1) {
			for (j = 0; j < piece.getWidth(); j += 1) {
				if (pieceStructure[i][j] === 1) {
					context.fillRect(
						(j + pieceLeft) * x,
						(i + pieceTop) * x,
						x,
						x
					);
					context.drawImage(img,
						(j + pieceLeft) * x,
						(i + pieceTop) * x);
				}
			}
		}
	};

	drawLevel = function () {
		var i, j, k, clear, x = increment, levelStructure = level.getStructure();

		if (flash) {
			flash = false;
		} else {
			flash = true;
		}

		for (i = 0; i < level.getHeight(); i += 1) {
			clear = false;
			for (k = 0; k < fullRows.length; k += 1) {
				if (i === fullRows[k]) {
					clear = true;
				}
			}
			for (j = 0; j < level.getWidth(); j += 1) {
				if (levelStructure[i][j] !== undefined) {
					if (clear && flash) {
						context.fillStyle = "#ffffff";
					} else {
						context.fillStyle = levelStructure[i][j];
					}
					context.fillRect((j * x), (i * x), x, x);
					if ((clear && !flash) || !clear) {
						context.drawImage(img, j * x, i * x);
					}
				}
			}
		}
	};

	dropLoop = function () {

		var scoreElement,
			levelNumberElement,
			piece;

		if (level.isObstructedBottom()) {
			piece = level.getActive();
			if (piece.getTop() < 0) {
				status = "stop";
				gameOverElement = document.getElementById('gameover');
				if (gameOverElement) {
					gameOverElement.style.display = 'block';
				}
			}
			level.placeActive();
		} else {
			level.dropActive();
		}

		linesCleared += fullRows.length;
		levelNumber = Math.floor(linesCleared / 10);
		level.clearRows(fullRows);

		scoreElement = document.getElementById("score");
		levelNumberElement = document.getElementById("level-number");

		if (scoreElement) {
			scoreElement.innerHTML = score;
		}

		if (levelNumberElement) {
			levelNumberElement.innerHTML = levelNumber;
		}

		fullRows = level.getFullRows();

		switch (fullRows.length) {
		case 1:
			score += (40 * (levelNumber + 1));
			break;
		case 2:
			score += (100 * (levelNumber + 1));
			break;
		case 3:
			score += (300 * (levelNumber + 1));
			break;
		case 4:
			score += (1200 * (levelNumber + 1));
			break;
		}

		if (status !== "stop") {
			setTimeout(dropLoop, (500 - (levelNumber * 15)));
		}
	};

	renderLoop = function () {
		context.clearRect(0, 0, level.getWidth() * increment, level.getHeight() * increment);
		context.fillStyle = "rgb(0, 31, 0)";
		drawActive();
		drawLevel();
		fps += 1;
		if (status !== "stop") {
			setTimeout(renderLoop, 32);
		}
	};

	fpsLoop = function () {
		var fpsElement = document.getElementById("fps");

		if (fpsElement) {
			fpsElement.innerHTML = fps;
		}

		if (status !== "stop") {
			fps = 0;
			setTimeout(fpsLoop, 1000);
		}
	};

	this.pause = function () {
		if (status === "play") {
			status = "stop";
		} else {
			status = "play";
			renderLoop();
			dropLoop();
			fpsLoop();
		}
	};

	pause = this.pause;

	if (canvas.getContext) {
		context = canvas.getContext('2d');
		gameOverElement = document.getElementById('gameover');

		if (gameOverElement) {
			gameOverElement.style.display = 'none';
		}

		renderLoop();
		fpsLoop();
		dropLoop();
	}
};