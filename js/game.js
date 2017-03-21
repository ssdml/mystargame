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
  	this._pageControl.mainPage();	
  }
}

class StarControl extends PIXI.Container {
	constructor(app) {
		super();
		this.border = 0;
		this._numCols = 12;
		this._numRows = 10;
		this._starsArray = [];
		this._app = app;
		this._init();
	}

	_init() {
		this.width = this._app.screen.width - 2 * this.border;
		this.height = this._app.screen.height - 2 * this.border;

		this.x = this.border;
		this.y = this.border;

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
		alert(i);
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
		}
	}
}
