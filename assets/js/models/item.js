function Item(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "assets/img/bullet.png";
  
    this.w = 10;
    this.h = 30;

    this.x = Math.random() * ((this.ctx.canvas.width -20) - 20) + 20;
    this.y = Math.random() * ((this.ctx.canvas.height -20) - 20) + 20;
}
   
Item.prototype.draw = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y, 
      this.w, 
      this.h
    )
};

