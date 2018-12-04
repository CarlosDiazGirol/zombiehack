function Zombie(ctx) {
  this.ctx = ctx;

  this.animation = [];
  for (i=0; i<9; i++){
    var image = new Image();
    image.src = 'assets/img/zombie/skeleton-move_' + i + '.png';
    this.animation.push( image );
  }
  for (i=8; i>2; i--){
    var image = new Image();
    image.src = 'assets/img/zombie/skeleton-move_' + i + '.png';
    this.animation.push( image );
  }

  this.frameIndex = 0;
  this.animationCount = 0;

  this.w = 65;
  this.h = 70;

  this.speed = ZOMBIE_SPEED + (Math.random() * 0.2);
  this.angle = 0;

  this.x = Math.random() * ((this.ctx.canvas.width -20) - 20) + 20;
  this.y = Math.random() * ((this.ctx.canvas.height -20) - 20) + 20;
}

Zombie.prototype.updateZombieAngle = function( player ) {
var canvasPosition = this.ctx.canvas.getBoundingClientRect();
var delta_x = player.x - this.x;
var delta_y = player.y - this.y;
this.angle = Math.atan2(delta_y, delta_x);
}

Zombie.prototype.draw = function() {
this.animationCount++;
if (this.animationCount % 2 == 0) this.frameIndex++;
if (this.frameIndex >= this.animation.length) this.frameIndex = 0;
this.ctx.save();
this.ctx.translate(this.x, this.y);
this.ctx.rotate(this.angle );
this.ctx.drawImage(
  this.animation[this.frameIndex],
  -this.animation[this.frameIndex].width/2,
  -this.animation[this.frameIndex].height/2
);
this.ctx.restore();

// Dibuja un circulo alrededor del zombie
// this.ctx.beginPath();
// this.ctx.strokeStyle = '#FF0000';
// this.ctx.arc(this.x, this.y,40,0,2*Math.PI);
// this.ctx.stroke();  
};

Zombie.prototype.move = function() {
this.y += Math.sin( this.angle ) * this.speed ;
this.x += Math.cos( this.angle ) * this.speed;
};

Zombie.prototype.animate = function() {
this.img.frameIndex++;
if (this.img.frameIndex === this.img.frames) {
  this.img.frameIndex = 0;
}
};

Zombie.prototype.colision = function(player) {
  var a = player.x - this.x;
  var b = player.y - this.y;
  var distance = Math.sqrt( a*a + b*b );
  if (distance < CONTACT_DISTANCE) {
    return true;
  } else {
    return false;
  }
};