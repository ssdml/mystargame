'use strict';

class Main {
  constructor(gameConteiner) {

   	this._app = new PIXI.Application();
  	gameConteiner.appendChild(this._app.view);
  	this._pageControl = new PageControl(this._app);
  	this._pageControl.mainPage();	
  }
}



window.onload = function() {
	let gameConteiner = document.getElementById('mygame');
	let main = new Main(gameConteiner);
};
