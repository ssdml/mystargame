'use strict';

window.onload = function() {
	let gameConteiner = document.getElementById('mygame');
	let main = new Main(gameConteiner);
};

class Main {
  constructor(gameConteiner) {
  	let appWidth = 600;
  	let appHeight = Math.floor(appWidth / 6 * 7);
   	this._app = new PIXI.Application(appWidth, appHeight);
  	gameConteiner.appendChild(this._app.view);
  	this._pageControl = new PageControl(this._app);
  	// this._pageControl.mainPage();
  	this._pageControl.startPage();
  }
}

class StarControl extends PIXI.Container {
	constructor(app) {
		super();
		this.border = 0;
		this._numCols = 12;
		this._numRows = 10;
		this._starsArray = [];
		this._selected = [];
		this._app = app;
		this._init();
	}

	_init() {
		this.width = this._app.screen.width - 2 * this.border;
		this.height = this._app.screen.height - 2 * this.border;

		this.x = this.border;
		this.y = this.border;

		this._score = new Score();

		this._initStars();
	}

	_initStars() {
		this._starWidth = Math.floor((this._app.screen.width - 2 * this.border) / this._numCols);
		this._shift_down = (this._app.screen.height - 2 * this.border) - this._starWidth * this._numRows;
		for (let i = 0; i < this._numCols * this._numRows; i++){
			setTimeout(this._initStar.bind(this, i), i * 10);
		}
	}

	_initStar(i) {;
		let x = Math.floor(i % this._numCols) * this._starWidth + this.border;
		let y = Math.floor(i / this._numCols) * this._starWidth + this.border;
		y += this._shift_down;
		this._starsArray[i] = new Star(x, y, this._starWidth, i);
		this._starsArray[i].on('click', this._starClick.bind(this, i));
		this.addChild(this._starsArray[i]);
	}

	_starClick(i) {
		if (this._starsArray[i].getColor() < 100) {
			let same_color = this._getSameColor(i);
			if (same_color.length > 1) {
				this._deselectAll();
				this._selectArea(same_color);
			}
		}
		else {
			this._removeSelectedStars();
		}
	}

	_removeSelectedStars() {
		for (let i = 0; i < this._selected.length; i++) {
			this._starsArray[this._selected[i]].remove();
		}
		this._dropDown();
		this._dropLeft();
		this._score.add(this._selected.length);
	}

	_selectArea(same_color) {
		let self = this;
			same_color.forEach(function(elem) {
				let color = self._starsArray[elem].getColor();
				if (self._starsArray[elem].getColor() < 100)
					self._starsArray[elem].color(100 + color);
			});
		this._selected = same_color.sort();
	}

	_dropDown() {
		for (let i = 0; i < this._starsArray.length; i++) {
			if (this._starsArray[i].getColor() == 0) continue;
			let next_i = i + this._numCols;
			if (next_i in this._starsArray && this._starsArray[next_i].getColor() == 0) {
				let tmp = this._starsArray[i];
				this._starsArray[next_i] = tmp;
				console.log(next_i, this._starsArray[next_i].getColor());
				this._starsArray[next_i].down();
			}
		}
	}

	_dropLeft() {

	}

	_deselectAll() {
		for (let i = 0; i < this._starsArray.length; i++) {
			let clr = this._starsArray[i].getColor();
			if (clr > 100) {
				this._starsArray[i].color(clr - 100);
			}
		}
		this._selected = [];
	}

	_getSameColor(i) {
		let same_color = [i];
		let neighbors = [];
		let first_length = same_color.length;

		do {
			first_length = same_color.length;
			neighbors = [];
			for (let j = 0; j < same_color.length; j++) {
				neighbors = neighbors.concat(this._getNeighbors( same_color[j] ));
			}
			same_color = same_color.concat(neighbors);

			same_color = same_color.filter(function(val, ind, ar){
				return ar.indexOf(val) == ind;
			});

		} while (first_length < same_color.length)
		return same_color;
	}

	_getNeighbors(i) {
		let result = [i];
		let color = this._starsArray[i].getColor();
		let starsArray = this._starsArray;

		let numCols = this._numCols;
		function getRow(ind) {
			return Math.floor((ind) / numCols);
		}

		let row = getRow(i, this._numCols);

		[row == getRow(i+1) ? i+1 : -1, row == getRow(i-1) ? i-1 : -1, i+this._numCols, i-this._numCols].forEach(
			function(j){
				if (j in starsArray && starsArray[j].getColor() == color)
						result.push(j);
		});
		return result;
	}
}

class Star extends PIXI.Sprite {
	constructor(x, y, width, i) {
		super();
		this._i = i;
		this._init(x, y, width);
	}
	_init(x, y, width) {
		this.interactive = true;
		this.buttonMode = true;

		this.width = width;
		this.height = width;
		this.randomColor();
		this.anchor.set(0);
		this.x = x;
		this.y = y;
	}

	randomColor() {
		let rand =  Math.floor(Math.random() * 5) + 1;
		this.color(rand);
	}

	getColor() {
		return this._color;
	}

	remove() {
		this.texture = PIXI.Texture.fromImage('./img/diable.png');
		this._color = 0;
	}

	down() {
		this.y += this.height;
	}

	color(colorNum){
		switch(colorNum){
			case 1:
			this.texture = PIXI.Texture.fromImage('./img/star_1.png');
			this._color = colorNum;
			break;

			case 2:
			this.texture = PIXI.Texture.fromImage('./img/star_2.png');
			this._color = colorNum;
			break;

			case 3:
			this.texture = PIXI.Texture.fromImage('./img/star_3.png');
			this._color = colorNum;
			break;
		
			case 4:
			this.texture = PIXI.Texture.fromImage('./img/star_4.png');
			this._color = colorNum;
			break;
		
			case 5:
			this.texture = PIXI.Texture.fromImage('./img/star_5.png');
			this._color = colorNum;
			break;

			case 101:
			this.texture = PIXI.Texture.fromImage('./img/star_101.png');
			this._color = colorNum;
			break;

			case 102:
			this.texture = PIXI.Texture.fromImage('./img/star_102.png');
			this._color = colorNum;
			break;

			case 103:
			this.texture = PIXI.Texture.fromImage('./img/star_103.png');
			this._color = colorNum;
			break;
		
			case 104:
			this.texture = PIXI.Texture.fromImage('./img/star_104.png');
			this._color = colorNum;
			break;
		
			case 105:
			this.texture = PIXI.Texture.fromImage('./img/star_105.png');
			this._color = colorNum;
			break;
		}
	}
}

class Score {
	constructor(){
		this._score = 0;
	}
	add(n) {
		this._score += (n * 10);
	}
}