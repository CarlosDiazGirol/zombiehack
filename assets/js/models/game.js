function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");
  
    this.intervalId = undefined;
    this.background = new Background(this.ctx);
    this.zombie = new Zombie(this.ctx);
    this.player = new Player(this.ctx);
    this.top = new Top(this.ctx);
    this.items = [];
    this.zombies = [];
    this.drawCounter = 0;
  }
  
  Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
      this.clear();
      this.drawCounter++;
      if (this.drawCounter % 500 === 0) { // draw bullets
       this.items.push(new Item(this.ctx))
      }
      if (this.drawCounter % 200 === 0) { // draw zombies
        this.zombies.push(new Zombie(this.ctx))
       }
      this.drawAll();
      this.checkGameOver();
      this.moveAll();
    }.bind(this), DRAW_INTERVAL_MS);
  };
  
  Game.prototype.drawAll = function(action) {
    this.background.draw();
    this.items.forEach(function(item){
      item.draw();
    })
    this.zombies.forEach(function(zombie){
      zombie.draw();
    })
    this.player.draw();
    this.top.draw();
  };
  
  Game.prototype.moveAll = function(action) { 
    this.player.move();
    this.zombie.move();
  };
  
  Game.prototype.checkGameOver = function() {
  };
  
  Game.prototype.gameOver = function() {
    clearInterval(this.intervalId);
  
    if (confirm("GAME OVER! Play again?")) {
      location.reload();
    }
  };
  
  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  };