function Player(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "assets/img/player.png";
  
    this.x = this.ctx.canvas.width / 2;
    this.y = this.ctx.canvas.height / 2;

    this.mouse_x = 0;
    this.mouse_y = 0;

    this.vx = 0;
    this.vy = 0;

    this.speed = 1.5;
    this.angle = 0;

    this.pushed_keys = {};

    this.setListeners();
  }

Player.prototype.updatePlayerAngle = function() {
  var canvasPosition = this.ctx.canvas.getBoundingClientRect();
  var delta_x = (this.mouse_x - canvasPosition.left)  - this.x;
  var delta_y = (this.mouse_y - canvasPosition.top) - this.y;
  this.angle = Math.atan2(delta_y, delta_x);
}

Player.prototype.checkKeys = function() {
  if ( (this.pushed_keys[KEY_UP]    || this.pushed_keys[KEY_W] ) && this.y > (0 + this.speed)                      ) this.y -= this.speed;
  if ( (this.pushed_keys[KEY_DOWN]  || this.pushed_keys[KEY_S] ) && this.y < (this.ctx.canvas.height - this.speed) ) this.y += this.speed;
  if ( (this.pushed_keys[KEY_LEFT]  || this.pushed_keys[KEY_A] ) && this.x > (0 + this.speed)                      ) this.x -= this.speed;
  if ( (this.pushed_keys[KEY_RIGHT] || this.pushed_keys[KEY_D] ) && this.x < (this.ctx.canvas.width - this.speed)  ) this.x += this.speed;
}
   
Player.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(this.angle + (Math.PI/2)); // rotate
  this.ctx.drawImage(
    this.img,
    -this.img.width/2,
    -this.img.height/2
  );
  this.ctx.restore();
};
  
  
Player.prototype.move = function() {
  this.checkKeys();
  this.updatePlayerAngle();
};


Player.prototype.animate = function() {


};

Player.prototype.deleteBullet = function() {
  var bullets = document.querySelector('#bullets ul li');
  bullets.parentNode.removeChild(bullets);
}
  
Player.prototype.inputHandler = function(e) {
  var key       = e.keyCode;
  var eventType = e.type; // keyup, keydown o mousemove

  switch (eventType) {
    case 'keydown': 
      this.pushed_keys[ key ] = true;
      break;
    case 'keyup':
      this.pushed_keys[ key ] = false;
      break;    
    case 'mousemove':
      this.mouse_x = e.clientX;
      this.mouse_y = e.clientY;
      break;
      case 'click':
      this.deleteBullet();
      break;
  }
}


Player.prototype.setListeners = function() {
  document.addEventListener('mousemove', this.inputHandler.bind(this), false);
  document.addEventListener('click',     this.inputHandler.bind(this), false);
  document.addEventListener('keydown',   this.inputHandler.bind(this), false);
  document.addEventListener('keyup',     this.inputHandler.bind(this), false);
};
