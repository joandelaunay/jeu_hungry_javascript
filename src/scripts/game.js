import Greedy from './greedy';
import Fruits from './fruits';
import KeyManager from './keyManager';
import Hungries from './hungries';
import greedyImg from './assets/images/greedy.png';


export default class Game {

   #canvas;

   constructor(canvas) {
      this.#canvas = canvas;
      this.context = this.#canvas.getContext("2d");
      this.player = new Greedy(this.canvas.width/2,this.canvas.height/2);
      this.request = null;
      this.keyManager = new KeyManager();
      this.listFruits = [];
      this.listHungries = [];
      this.spawnFruitsInterval;
      this.score = document.getElementById("score");
      this.life = document.getElementById("lifes");
   }

   /** donne accès au canvas correspondant à la zone de jeu */
   get canvas() {
      return this.#canvas;
   }

   /* fonction principal pour l'animation, les collisions et les mouvements du jeu */
   animate(){
      if(this.player.lifePoints <= 0){
        this.context.clearRect(0, 0,this.canvas.width, this.canvas.height);
        window.alert("Game Over !");
        this.restart();
      }
      else{
        this.context.clearRect(0, 0,this.canvas.width, this.canvas.height);
        this.updateInfo();

        // vérifie toutes les collisions
        this.player.collisionGreedy(this.listFruits,this.listHungries);
        this.listHungries = this.listHungries.filter( element => !element.collisionHungries(this.listFruits,this.player) );
        this.listFruits = this.listFruits.filter( element => !element.despawn && !element.collisionFruits(this.listHungries,this.player) );

        // partie d'affichage et de déplacement du joueur
        this.player.handleMoveKeys(this.keyManager);
        this.player.move(this.canvas);
        this.player.draw(this.context);


        // partie d'affichage et de déplacement du hungries
        if(this.listHungries.length == 0){
          this.spawnHungries();
        }
        this.listHungries.forEach( element => this.updateHungriesNumber(element) );
        this.listHungries.forEach( element => this.chooseTarget(element) );       
        this.listHungries.forEach( element => element.move(this.canvas) );
        this.listHungries.forEach( element => element.draw(this.context) );
   

        // partie d'affichage et de déplacement du fruits
        this.listFruits.forEach( element => element.draw(this.context) );


        this.request = window.requestAnimationFrame(this.animate.bind(this));

      }
   }

   startAndStop() {
      if(!this.request){
        this.request = window.requestAnimationFrame(this.animate.bind(this));
        this.spawnFruitsInterval = setInterval(this.spawnFruits.bind(this),1000);
      }
      else{
        window.cancelAnimationFrame(this.request);
        this.request = null;
        clearInterval(this.spawnFruitsInterval);
      }
   }


   keyDownActionHandler(event) {
      switch (event.key) {
          case "ArrowLeft":
          case "Left":
              this.keyManager.leftPressed();
              break;
          case "ArrowRight":
          case "Right":
              this.keyManager.rightPressed();
              break;
          case "ArrowUp":
          case "Up":
              this.keyManager.upPressed();
              break;
          case "ArrowDown":
          case "Down":
              this.keyManager.downPressed();
              break;
          default: return;
      }
      event.preventDefault();
   }

  keyUpActionHandler(event) {
      switch (event.key) {
          case "ArrowLeft":
          case "Left":
            this.keyManager.leftReleased();
            break;
          case "ArrowRight":
          case "Right":
            this.keyManager.rightReleased();
            break;
          case "ArrowUp":
          case "Up":
              this.keyManager.upReleased();
              break;
          case "ArrowDown":
          case "Down":
              this.keyManager.downReleased();
              break;
          default: return;
      }
      event.preventDefault();
   }


  /* fait apparaitre les fruits sur le jeu */
  spawnFruits(){
    this.listFruits.push(new Fruits(this.canvas));
  }

  /* vérifie si un hungrie a assez mangé de fruits pour en fairer apparaitre un autre */
  updateHungriesNumber(hungries){
    if(hungries.fruitsEaten >= 7){
      hungries.fruitsEaten = 0;
      this.spawnHungries();
    }
  }

  /* fait apparaitre un hungrie en jeu */
  spawnHungries(){
    this.listHungries.push(new Hungries(this.canvas));
  }

  /* choisit un nombre aléatoire entre 0 et n exclus */
  static alea(n){
    return Math.floor(Math.random()*n);
  }

  /* prend un hungrie en paramètre et lui choisit une cible */
  chooseTarget(hungries){
    if(this.listFruits.length == 0){
      hungries.target = this.player;
    }
    else{
      if(!this.listFruits.includes(hungries.target)){
        hungries.target = this.listFruits[Game.alea(this.listFruits.length)];
      }
    }
  }

  /* rafraichit le score du joueur ainsi que son nombre de vies restantes */
  updateInfo(){
    this.score.textContent = this.player.score;
    const n = this.life.childElementCount - this.player.lifePoints;
    let childs = document.querySelectorAll("#lifes img");
    for(let i = 0; i < n; i++){
      childs[i].style.display = "none";
    }
  }

  /* remet le score à 0 ainsi que la vie du personnage à 3 */
  restartInfo(){
    let childs = document.querySelectorAll("#lifes img");
    for(let i = 0; i < 3; i++){
      childs[i].style.display = "inline";
    }
    this.score.textContent = this.player.score;
  }

  /* fonction qui remet une partie à 0 lorsque le joueur a perdu */
  restart(){
    this.startAndStop();
    clearInterval(this.spawnFruitsInterval);
    this.listFruits = [];
    this.listHungries = [];
    this.player.lifePoints = 3;
    this.player.score = 0;
    this.player.x = 100;
    this.player.y = 100;
    this.keyManager = new KeyManager();
    this.restartInfo();
  }

}



