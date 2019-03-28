import GameManager from '../data/GameManager';

export default class SimpleButton extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key, fn = null, param = null, text = ""){
    super(scene, x, y, key);
    scene.add.existing(this);
    this._scene = scene;
    this._canExecute = false;
    this._scale = 1;
    this._event = fn;
    this._param = param;
    this._text = scene.add.text(
      this.x,
      this.y,
      text,
      {
        fontFamily: 'monospace',
        color: '#000000',
        fontSize: '22px',
        align: 'center',
      }
    );
    this._text.setOrigin(0.5);

		// Setup EventHandler Button
    this.setInteractive({useHandCursor: true})
    .on('pointerdown', () => {
      this._canExecute = true;
      this.animateButton();
    })
    .on('pointerup', () => {
      if (this._canExecute){
        this.eventHandler();
        this._canExecute = false;
      }
    })
    .on('pointerover', () => {
      this._canExecute = false;
    });
    console.log("SimpleButton created.\n" +
      "IMPORTANT! Need to setup GameManager.emitter\nIn index.js");
  } // End of constructor

  animateButton(){
    this._scene.tweens.add({
      targets: [this, this._text],
      scaleY: .9 * this._scale,
      scaleX: .85 * this._scale,
      ease: 'Expo.easeOut',
      duration: 100,
      yoyo: true,
      onComplete: this.setScale.bind(this, this._scale)
    });
  }

  setEventEmit(fn, param = null){
    this._event = fn;
    this._param = param;
  }

  setLabelStyle(config){
    this._text.setStyle(config);
  }

  setPos(x, y){
    this.x = x, this._text.x = x;
    this.y = y, this._text.y = y - (this.displayHeight / 2);
  }

  setLabel(text){
    this._text.setText(text);
  }

  // @Override
  setScale(val){
    this._scale = val;
    super.setScale(val);
    if (this._text != ''){
      this._text.setScale(val);
    }
  }

  eventHandler(){
    this._scene.time.addEvent({
      delay: 50,
      callback: this.onAction.bind(this),
      loop: false
    });
  }

  // Implementing emitter, means need to import GameManager class
  // otherwise, .call
  onAction(){
		if (this._event != null && GameManager.emitter != null){
      GameManager.emitter.emit(this._event, this._param);
    }
    else if (GameManager.emitter == null) {
      console.log("GameManager.emitter as 'Phaser.Events.EventEmitter()' is null");
    }
		else{
			console.log("callback is null");
		}
  } // End of onAction

}
