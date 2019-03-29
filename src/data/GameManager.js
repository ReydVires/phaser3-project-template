let instance = null;

class GameManager {
  constructor() {
    // Singleton implementation
    if (!instance || instance != this){
      instance = this;
      console.log('Singleton assign');
    }
    else {
      console.log('Singleton block [return]');
      return;
    }
    this.signature = 'Ahmad Arsyel';
    this.height = 0;
    this.width = 0;
    this.heightCenter = 0;
    this.widthCenter = 0;
    this.emitter = null;
    // Private get set
    this._score = 0;
  }

  get score(){
    return this._score;
  }

  set score(value){
    this._score = value;
  }
}

export default (new GameManager);
