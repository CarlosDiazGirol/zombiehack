function Bullet(ctx, x, y, dx, dy) {
    this.ctx = ctx;
  
    this.x = x;
    this.y = y;

    this.dx = dx;
    this.dy = dy;

    this.speed = 6;
    this.drawCount = 0;
}

Bullet.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.fillStyle = "#da9517";
  this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
  this.ctx.fill();
  this.ctx.closePath();
};

Bullet.prototype.update = function() {
  this.x += this.dx * this.speed;
  this.y += this.dy * this.speed;
}

Bullet.prototype.colision = function(zombie) {
  var a = zombie.x - this.x;
  var b = zombie.y - this.y;
  var distance = Math.sqrt( a*a + b*b );
  if (distance < CONTACT_DISTANCE) {
    return true;
  } else {
    return false;
  }
};




