import GameManager from '../data/GameManager';
import CONST from '../data/const';

export default class SceneBoot extends Phaser.Scene {
  constructor() {
    super('SceneBoot');
  }

  preload(){
    // Load images and sounds
    this.load.image('logo', 'assets/logo.png');

    // Preload loading bar
    let styleText = {
      font: '21px monospace',
      fill: CONST.colors.black
    };
    let assetText = this.make.text({
      x: GameManager.width / 2,
      y: (GameManager.height / 2 - 70),
      text: '',
      style: styleText
    })
    .setOrigin(.5);
    this.make.text({x: assetText.x, y: assetText.y - 32, text: 'PLEASE WAIT', style: styleText})
    .setOrigin(.5);
    let loadingText = this.make.text({
      x: assetText.x,
      y: assetText.y + 32,
      text: '',
      style: styleText
    })
    .setOrigin(.5);
    this.load.on('progress', value => {
      console.log(`Loading: ${parseInt(value * 100)} %`);
      loadingText.setText(`${parseInt(value * 100)} %`);
    });
    this.load.on('fileprogress', file => {
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', () => {
      assetText.destroy();
      loadingText.destroy();
    });
    // End of loading
  }

  create(){
    // Define our objects
    console.log("Ready SceneBoot!");
    this.scene.start('SceneMain');
  }
}
