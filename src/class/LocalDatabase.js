import GameManager from "../data/GameManager";

export default class LocalDatabase {
  constructor(key = 'localData') {
    this._key = key;
    this.getData(key, true);
    // this.deleteData('localScore');
  }

  setKey(newKey){
    this._key = newKey;
  }

  setHighscore(){
    let newHighscore = false;
    if (this.getData(this._key)){
      let currScore = GameManager.score;
      if (currScore > this.getData(this._key)){
        this.saveData(this._key, currScore);
        console.log("New Highscore!");
        newHighscore = true;
      }
    }
    return newHighscore;
  }

  saveData(key, value){
    localStorage.setItem(key, value);
    if (this.getData(key)){
      console.log("Data " + key + " saved");
    }
    else {
      console.log("Data " + key + " not saved!");
    }
  }

  getData(key, init = false){
    let data = localStorage.getItem(key);
    if (data === null){
      data = GameManager.score;
      console.log("Not found: " + key);
      if (init){
        this.saveData(this._key, data);
      }
    }
    return data;
  }

  deleteData(key){
    let data = this.getData(key);
    if (data){
      localStorage.removeItem(key);
      console.log("Data " + key + " deleted!");
    }
    else {
      console.log("Data " + key + " not deleted!");
    }
  }
}
