function Zombie(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "assets/img/zombie.png";
    this.img.frames = 2;
    this.img.frameIndex = 0;
  
    this.w = 66;
    this.h = 91;

    this.x = Math.random() * ((this.ctx.canvas.width -20) - 20) + 20;
    this.y = Math.random() * ((this.ctx.canvas.height -20) - 20) + 20;
  
    this.vx = 0.3;
    this.vy = -0.3;

    this.enemies = []

    this.drawCount = 0;
}

Zombie.prototype.draw = function() {
  this.drawCount++;
  this.ctx.drawImage(
    this.img,
    this.img.width * this.img.frameIndex / this.img.frames, 0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y, 
    this.w, 
    this.h
  )
  if (this.drawCount % 30 === 0) {
    this.animate();
    this.drawCount = 0;
  }
};
  
Zombie.prototype.move = function() {
this.x += this.vx;
this.y += this.vy;
// this.colision();
};

Zombie.prototype.animate = function() {
  this.img.frameIndex++;
  if (this.img.frameIndex === this.img.frames) {
    this.img.frameIndex = 0;
  }
};

// Zombie.prototype.colision = function() {
//   this.player = new Player(this.ctx);
//   if (
//     this.x < this.player.x + this.player.w && 
//     this.x + this.w > this.player.x && 
//     this.y < this.w + this.player.h && 
//     this.h + this.y > this.player.y
//     ) {
//       alert('wow');
//   }
// }
