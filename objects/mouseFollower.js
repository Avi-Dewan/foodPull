class MouseFollower {
  constructor() {
    // console.log(this.type, x, y);
    this.tailLength = 12;
    this.ghostSize = 20;

    this.ghostX = mouseX;
    this.ghostY = mouseY;
    this.tail = [];
    this.stars = [];

    this.type = 'fire';
  }

  draw() {
    this.ghostX = mouseX;
    this.ghostY = mouseY;
    // Add a point to the beginning of the array.
    this.tail.unshift({ x: this.ghostX, y: this.ghostY });
    if (this.tail.length > this.tailLength) {
      let pos = this.tail.pop();

      if (
        this.stars.length == 0 ||
        dist(this.stars[0].x, this.stars[0].y, pos.x, pos.y) > 50
      ) {
        let scale = Math.random() * 1.5 + 0.2;
        let colorIdx = Math.random() * colors[this.type]["shades"].length;
        colorIdx = Math.floor(colorIdx);
        this.stars.unshift(
          new Star(
            pos.x + Math.random() * 20 - 10,
            pos.y + Math.random() * 20 - 5,
            scale,
            colors[this.type]["shades"][colorIdx]
          )
        );

        scale = Math.random() * 0.7 + 0.1;
        colorIdx = Math.random() * colors[this.type]["shades"].length;
        colorIdx = Math.floor(colorIdx);
        this.stars.unshift(
          new Star(
            pos.x + Math.random() * 30,
            pos.y + Math.random() * 30 - 15,
            scale,
            colors[this.type]["shades"][colorIdx]
          )
        );

        scale = Math.random() * 0.7 + 0.1;
        colorIdx = Math.random() * colors[this.type]["shades"].length;
        colorIdx = Math.floor(colorIdx);
        this.stars.unshift(
          new Star(
            pos.x + Math.random() * 30,
            pos.y + Math.random() * 30 - 15,
            scale,
            colors[this.type]["shades"][colorIdx]
          )
        );
      }

      if (this.stars.length >= 15) {
        this.stars.pop();
        this.stars.pop();
        this.stars.pop();
      };
    }

    drawingContext.shadowColor = colors[this.type]["shadow"];

    // Loop over the tail and draw the points.
    for (var index = 0; index < this.tail.length; index++) {
      let reverseIndex = this.tail.length - index;
      let mass = reverseIndex * 2;
      const tailPoint = this.tail[index];

      drawingContext.shadowBlur = mass;

      // Tail gets smaller and more transparent.
      const pointSize = (this.ghostSize * reverseIndex) / this.tail.length;
      const pointAlpha = (255 * reverseIndex) / this.tail.length;

      stroke(0);
      strokeWeight(mass);
      fill(
        colors[this.type]["fill"][0],
        colors[this.type]["fill"][1],
        colors[this.type]["fill"][2],
        pointAlpha
      );

      ellipse(
        tailPoint.x,
        tailPoint.y,
        pointSize * colors[this.type]["falloff"]
      );
    }

    pop();

    strokeWeight(0);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].draw();
    }

    // let s = new Star(100, 100, 10, 20, '#FF0000')
    // s.draw();

    // Draw the ghost's face.
    // fill(255,255,255);
    // ellipse(this.ghostX - this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX + this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX, this.ghostY + this.ghostSize * .2, this.ghostSize * .2);
  }
}
