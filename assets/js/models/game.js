function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");

  this.intervalId = undefined;
  this.background = new Background(this.ctx);
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
    if (this.drawCounter % 500 === 0 && this.items.length < MAX_BULLETS) { // draw bullets
      console.log('entra')
     this.items.push(new Item(this.ctx))
    }
    if (this.drawCounter % 200 === 0 && this.zombies.length < MAX_ZOMBIES) { // draw zombies
      this.zombies.push(new Zombie(this.ctx))
    }

    this.zombies.forEach(function(zombie){
      if (zombie.colision(this.player)) {
        this.gameOver();
      }
    }.bind(this));

    this.player.bullets.forEach(function(bullet){
      this.zombies.forEach(function(zombie) {
        if (bullet.colision(zombie)) {
          var bulletIndex = this.items.indexOf(bullet);
          var zombieIndex = this.items.indexOf(zombie);
          this.player.bullets.splice(bulletIndex, 1);
          this.zombies.splice(zombieIndex, 1);
        }
      }.bind(this))
    }.bind(this));

    this.items.forEach(function(item){
      if (this.player.ammo <= 4 && item.colision(this.player)) {
        var itemIndex = this.items.indexOf(item);
        console.log('cogida')
        this.player.ammo++
        this.items.splice(itemIndex, 1);
        $('#bullets ul').append('<li><img src="assets/img/bullet.png"></li>');
        console.log('subida');
      }
    }.bind(this));

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
  var _this = this;
  this.zombies.forEach(function(zombie){
    zombie.updateZombieAngle( _this.player );
    zombie.move();
  })
  this.player.move();
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