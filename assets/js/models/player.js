function Player(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "assets/img/player.png";
  
    this.w = 44;
    this.h = 82;
  
    this.x = this.ctx.canvas.width / 2;
    this.y = this.ctx.canvas.height / 2;

    this.vx = 0;
    this.vy = 0;

    this.setListeners();
  }
   
Player.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
};
  
Player.prototype.move = function() {

  this.x += this.vx;
  this.y += this.vy;
  if (this.x > this.ctx.canvas.width - this.w || this.x <= 0 ){
    this.vx = 0;
  };
  if (this.y > this.ctx.canvas.height - this.h || this.y <= 0 ){
    this.vy = 0;
  };
};


Player.prototype.animate = function() {


};
  
Player.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.vx = 3;
      break;
    case KEY_LEFT:
      this.vx = -3;
      break;
    case KEY_UP:
      this.vy = -3;
      break;
    case KEY_DOWN:
      this.vy = 3;
      break;
  }
};

Player.prototype.onKeyUp = function(event) {
  this.vx = 0;
  this.vy = 0;
};

Player.prototype.setListeners = function() {
  document.addEventListener('keydown', this.onKeyDown.bind(this));
  document.addEventListener("keyup", this.onKeyUp.bind(this));
};