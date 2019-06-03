import GameManager from '../data/GameManager';
import SimpleButton from '../class/SimpleButton';
import CONST from '../data/const';

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  create(){
    // Define our objects
    console.log(`Ready SceneMain! ${GameManager.signature}`);

    GameManager.emitter.on(
      'event:clickStart', this.clickStart.bind(this)
    );

    let startBtn = new SimpleButton(
      this,
      GameManager.width * .5,
      GameManager.height * .3,
      'logo',
      'event:clickStart'
    );
    startBtn.setScale(.5);

    this.tweens.add({
      targets: startBtn,
      y: startBtn.y + 15,
      duration: 800,
      yoyo: true,
      loop: -1
    });

    this.add.text(
      GameManager.width/2, GameManager.height/2 + 120,
      "Welcome to Workshop\nFROM ZERO TO\nPHAS3R!", {
        color: 'black',
        font: `${CONST.fonts.big} ${CONST.fonts.default[1]}`
      })
    .setOrigin(0.5)
    .setAlign('center');
    this.add.text(1, GameManager.height - 15, "RPLGDC@2019", {color: 'black'});
  }

  clickStart(){
    console.log('Hello world!');
  }

  update(){
    // Running loop
  }
}
