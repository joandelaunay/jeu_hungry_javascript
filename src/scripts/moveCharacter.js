import Character from "./character";



export default class MoveCharacter extends Character{

    constructor(imgSrc,X,Y,deltax,deltay,width,height) {
       super(imgSrc,X,Y,width,height);
       this.deltaX = deltax;
       this.deltaY = deltay;
       this.expPoints;
    }

    move(canvas){
        this.x += this.deltaX;
        this.y += this.deltaY;
    }




}