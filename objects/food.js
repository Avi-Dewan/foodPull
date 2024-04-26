class Food {
  constructor(img, x, y, width, height, type) {
    this.img = img;
    this.pos = createVector(x, y);
    this.width = width;
    this.height = height;
    this.isGrabbed = false;
    this.type = type;
    this.foodsCollected = foodsCollected;
  }

  draw(astronaut) {
    if (!this.isGrabbed) this.detectCollision(astronaut);
    if (!this.isGrabbed)
      image(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }

  detectCollision(astronaut) {
    let x1 = astronaut.pos.x;
    let y1 = astronaut.pos.y;
    let x2 = x1 + astronaut.width;
    let y2 = y1 + astronaut.height;
    let foodX1 = this.pos.x;
    let foodY1 = this.pos.y;
    let foodX2 = foodX1 + this.width;
    let foodY2 = foodY1 + this.height;

    if (x1 < foodX2 && x2 > foodX1 && y1 < foodY2 && y2 > foodY1) {
      this.isGrabbed = true;
      astronaut.addFood(this.type);
      collectSound.setVolume(1, 0);
      collectSound.play();
    }
  }
}
