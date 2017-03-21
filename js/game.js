'use strict';

window.onload = function() {
	let gameConteiner = document.getElementById('mygame');
	let main = new Main(gameConteiner);
};

class Main {
  constructor(gameConteiner) {

   	this._app = new PIXI.Application();
  	gameConteiner.appendChild(this._app.view);
  	this._pageControl = new PageControl(this._app);
  	this._pageControl.mainPage();	
  }
}

class StarControl extends PIXI.Container {
	constructor(app) {
		super();
		this._wF = 12;
		this._hF = 10;
		this._starsArray = [];
		this._app = app;
		this._init();
	}
	_init() {
		this.width = this._app.screen.width;
		this.height = this._app.screen.height;

		this.x = 0;
		this.y = 0;

		this._initStars();
	}
	_initStars() {
		this._starWidth = this._app.screen.width / this._wF;
		for (let i = 0; i < this._wF * this._hF; i++){
			this._starsArray[i] = new Star(i, this._starWidth);
			this.addChild(this._starsArray[i]);
		}
		
	}
}

class Star extends PIXI.Sprite {
	constructor(i, width) {
		super();
		this._init(i, width);
	}
	_init(i, width) {
		this.width = width;
		this.height = width;
		this.texture = PIXI.Texture.fromImage('./img/star_1.png');
		this.anchor.set(0);
		this.x = i * width;
	}
}
