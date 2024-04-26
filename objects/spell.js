class Spell{
  constructor (type, angle, x, y) {
    this.tailLength = 15;
    this.ghostSize = 20;
    this.wiggliness = 8;
    this.floatiness = 7;  
    
    this.ghostX = x;
    this.ghostY = y;
    this.tail = [];

    this.doDraw = 0;

    this.type = type;
    this.angle = angle * 3.14 / 180;

    this.alive = true;
  }
  
  draw() {    
    // The cos() function gives us a value that bounces between -1 and 1.
    // We can use that to create animations!
    if(this.doDraw == 2){
      this.doDraw = 0;

      this.ghostY += cos(frameCount / 10) * this.wiggliness + this.floatiness * cos(this.angle);
      this.ghostX -= this.floatiness * sin(this.angle);

      // If the ghost goes above the top of the canvas, move it back to the bottom.
      if (this.ghostY < -this.ghostSize || this.ghostY >= height - this.ghostSize) {
        this.alive = false;
      }
      if (this.ghostX < -this.ghostSize || this.ghostX >= width - this.ghostSize) {
        this.alive = false;
      }
      
      // Add a point to the beginning of the array.
      this.tail.unshift({x: this.ghostX, y: this.ghostY});
      // If the array is too big, remove the last point.
      if (this.tail.length > this.tailLength) {
        this.tail.pop();
      }
  
    } else {
      this.doDraw = this.doDraw + 1;
    }

    push();
    // rotate(3.14/4);
  
    strokeWeight(4);
    stroke("#FF421D");
    // Loop over the tail and draw the points.
    for (var index = 0; index < this.tail.length; index++) {
      const tailPoint = this.tail[index];
  
      // Tail gets smaller and more transparent.
      const pointSize = this.ghostSize * (this.tail.length - index) / this.tail.length;
      const pointAlpha = 255 * (this.tail.length - index) / this.tail.length;
  
      fill(255, 169, 0, pointAlpha);
      ellipse(tailPoint.x, tailPoint.y, pointSize);
    }

    pop();
  
    // Draw the ghost's face.
    // fill(255,255,255);
    // ellipse(this.ghostX - this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX + this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX, this.ghostY + this.ghostSize * .2, this.ghostSize * .2);
  }
}
