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
  }

Player.prototype.getPlayerAngle = function() {
  var delta_x = this.mouse_x - this.x;
  var delta_y = this.mouse_y - this.y;
  var angle   = Math.atan2(delta_y, delta_x);
  return angle;
}

Player.prototype.checkKeys = function() {
  if ( (this.pushed_keys[KEY_UP]    || this.pushed_keys[KEY_W] ) && this.y > (0 + this.speed)                      ) this.y -= this.speed;
  if ( (this.pushed_keys[KEY_DOWN]  || this.pushed_keys[KEY_S] ) && this.y < (this.ctx.canvas.height - this.speed) ) this.y += this.speed;
  if ( (this.pushed_keys[KEY_LEFT]  || this.pushed_keys[KEY_A] ) && this.x > (0 + this.speed)                      ) this.x -= this.speed;
  if ( (this.pushed_keys[KEY_RIGHT] || this.pushed_keys[KEY_D] ) && this.x < (this.ctx.canvas.width - this.speed)  ) this.x += this.speed;
}
   
Player.prototype.draw = function() {
  // this.ctx.save();
  // this.ctx.translate(this.x, this.y);
  // this.ctx.rotate(this.angle + (Math.PI/2)); // rotate
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    -this.img.width/2,
    -this.img.height/2
  );
  // this.ctx.restore();
};
  
  
Player.prototype.move = function() {
  this.checkKeys();
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

  document.getElementById('biohazard').addEventListener("mousemove", function(event) {
    Player.prototype.mouseCoordinates(event);
  });
};

Player.prototype.mouseCoordinates = function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var coor = "Coordinates: (" + x + "," + y + ")";
  console.log(coor);
}

// Player.prototype.deleteBullet = function() {
//   var bullet = document.querySelectorAll('bullets ul li');
//   var bullets = [];
//   for(var i = 0; bullet.lenght < i; i++) {
//     if (i === )
//   }
// };