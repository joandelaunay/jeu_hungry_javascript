import MoveCharacter from "./moveCharacter";
import HungriesImgSrc from './assets/images/hungry.png';
import Greedy from "./greedy";
import Fruits from "./fruits";


export default class Hungries extends MoveCharacter{

    static HUNGRIES_WIDTH = 64;
    static HUNGRIES_HEIGHT = 57;

    constructor(canvas){
        let aleaX = Hungries.alea(canvas.width-Hungries.HUNGRIES_WIDTH);
        let aleaY = Hungries.alea(canvas.height-Hungries.HUNGRIES_HEIGHT);
        super(HungriesImgSrc,aleaX,aleaY,5,5,64,57);
        this.target = null;
        this.fruitsEaten = 0;
    }

    static alea(n){
        return Math.floor(Math.random()*n);
    }
    
    collisionHungries(listFruits,player){
        listFruits = listFruits.filter( element => this.collisionWith(element) );
        this.fruitsEaten += listFruits.length;
        if(this.collisionWith(player)){
            return true;
        }
        else{
            return false;
        }
    }


    move(canvas){
        this.deltaX = (this.target.x - this.x) / Math.sqrt(((this.target.x - this.x)**2 + (this.target.y - this.y)**2));
        this.deltaY = (this.target.y - this.y) * 150 / ((this.target.x - this.x)**2 + (this.target.y - this.y)**2);
        this.x = Math.max(0, Math.min(canvas.width - Hungries.HUNGRIES_WIDTH, this.x + this.deltaX));
        this.y = Math.max(0, Math.min(canvas.height - Hungries.HUNGRIES_HEIGHT, this.y + this.deltaY));
    }


}