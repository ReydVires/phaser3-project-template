import Phaser from 'phaser';
import GameManager from './data/GameManager';
import SceneMain from './scenes/SceneMain';
import SceneBoot from './scenes/SceneBoot';

let game;
let scenes = [];

// TODO: Add resize

window.onload = () => {
	scenes.push(SceneBoot);
	scenes.push(SceneMain);

	let config = {
		type: Phaser.CANVAS,
		parent: 'phaser-game',
		width: 480,
		height: 800,
		backgroundColor: '#fafafa',
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {y: 0},
				debug: true
			}
		},
		scene: scenes
	};
	game = new Phaser.Game(config);
	window.focus();
  resize();
  window.addEventListener("resize", resize, false);

	GameManager.height = config.height;
	GameManager.width = config.width;
	GameManager.emitter = new Phaser.Events.EventEmitter();
};

function resize() {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if(windowRatio < gameRatio){
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else{
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
