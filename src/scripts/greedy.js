import MoveCharacter from "./moveCharacter";
import greedyImgSrc from './assets/images/greedy.png';


export default class Greedy extends MoveCharacter{

    static GREEDY_SIZE = 64;

    constructor(x = 100,y = 100) {
        super(greedyImgSrc,x,y,5,5,64,64);
        this.lifePoints = 3;
        this.score = 0;
    }

    move(canvas){
        this.x = Math.max(0, Math.min(canvas.width - Greedy.GREEDY_SIZE, this.x + this.deltaX));
        this.y = Math.max(0, Math.min(canvas.height - Greedy.GREEDY_SIZE, this.y + this.deltaY));
    }

    stopMoving(){
        this.deltaX = 0;
        this.deltaY = 0;
    }

    moveLeft(){
        this.deltaX = -5;
    }
    
    moveRight(){
        this.deltaX = 5;
    }
    
    moveUp(){
        this.deltaY = -5;
    }

    moveDown(){
        this.deltaY = 5;
    }
    
    handleMoveKeys(keyManager) {
        this.stopMoving();
        this.stopMoving();   
        if (keyManager.left)  
           this.moveLeft();
        if (keyManager.right) 
           this.moveRight();
        if (keyManager.up)
           this.moveUp();
        if (keyManager.down) 
           this.moveDown();
    }

    collisionGreedy(listFruits,listHungries){
        listFruits = listFruits.filter( element => this.collisionWith(element) );
        this.score += listFruits.length * 100;
        listHungries = listHungries.filter( element => this.collisionWith(element) );
        this.lifePoints = this.lifePoints - listHungries.length;
    }




}