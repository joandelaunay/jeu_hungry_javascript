


export default class character{

    constructor(imgSrc,X,Y,width,height) {
        this.x = X;
        this.y = Y;
        this.image = this.#createImage(imgSrc);
        this.width = width;
        this.height = height;
    }
    
     /* crée l'objet Image à utiliser pour dessiner cette balle */
    #createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }

    draw(context){
        context.drawImage(this.image,this.x,this.y);
    }


    /* renvoie true si il y a une collision */
    collisionWith(character){
        let p1=[]
        let p2=[]
        p1.push(Math.max(this.x,character.x));
        p1.push(Math.max(this.y,character.y));
        p2.push(Math.min(this.x+this.width,character.x+character.width));
        p2.push(Math.min(this.y+this.height,character.y+character.height));
        if(p1[0]<p2[0] && p1[1]<p2[1]){
          return true;
        }
        else{
          return false;
        }
    }



}