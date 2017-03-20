'use strict';


class Main {
  constructor(gameConteiner) {

   	this._app = new PIXI.Application();
  	gameConteiner.appendChild(this._app.view);
  	this._pageControl = new PageControl(this._app);
  	this._pageControl.mainPage();
  	
  }

}


class PageControl {

	constructor(app){
		this._app = app;
	}

	mainPage(){
		this.delPage();
		this.page = new MainPage(this._app, this);
	}

	startPage(){
		alert("start");
	}

	delPage() {
		this._app.stage.removeChildren();
	}
}

class MainPage {

	constructor(app, pageControl) {
		this._app = app;
		this._pageControl = pageControl;
		this._setBackground('./img/bg_mainpage.png');
		this._addStartButton();
	}

	_setBackground(background_img){
		this._background = new PIXI.Sprite.fromImage(background_img);
		this._background.width = this._app.renderer.width;
		this._background.height = this._app.renderer.height;
		this._app.stage.addChild(this._background);
	}

	_addStartButton(){
		this._startButton = new StartButton(this._app);
		this._app.stage.addChild(this._startButton);
		this._startButton.on('click', this._pageControl.startPage);
	}
}

	class StartButton extends PIXI.Sprite{

		constructor(app){
			super();
			this._app = app;
			this._init();
		}

		_init() {
			this.interactive = true;
			this.buttonMode = true;

			this.texture = PIXI.Texture.fromImage('./img/btn_play.png');
			this.anchor.set(0.5);
			this.x = this._app.renderer.width / 2;
			this.y = this._app.renderer.height / 2;
			// this.on('pointerdown', alert("2"));
		}
	}


window.onload = function(){
	let gameConteiner = document.getElementById('mygame');
	let main = new Main(gameConteiner);
};
