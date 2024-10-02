import Character from "./character";
import citronImgSrc from './assets/images/citron.png';
import pommeImgSrc from './assets/images/pomme.png';
import ananasImgSrc from './assets/images/ananas.png';


export default class Fruits extends Character{

    static FRUITS_SIZE = 64;

    constructor(canvas){
        let imgAlea = [citronImgSrc,pommeImgSrc,ananasImgSrc];
        let aleaX = Fruits.alea(canvas.width-Fruits.FRUITS_SIZE);
        let aleaY = Fruits.alea(canvas.height-Fruits.FRUITS_SIZE);
        let aleaIndex = Fruits.alea(imgAlea.length)
        super(imgAlea[aleaIndex],aleaX,aleaY,64,64);
        this.despawn = false;
        this.despawnFunc = setTimeout(this.despawnFruit.bind(this),8000);
    }

    static alea(n){
        return Math.floor(Math.random()*n);
    }

    /* après 8 secondes le fruit disparait de lui même si il n'est pas mangé */
    despawnFruit(){
        this.despawn = true;
    }

    collisionFruits(listHungries,player){
        return this.collisionWith(player) || (listHungries.filter( element => this.collisionWith(element) ).length > 0);
    }


}