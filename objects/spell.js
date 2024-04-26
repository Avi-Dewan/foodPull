class Spell {
  constructor(type, angle, x, y, castSpells, catchSpells) {
    this.tailLength = 12;
    this.ghostSize = 20;
    this.wiggliness = 6;
    this.floatiness = 7;

    this.ghostX = x;
    this.ghostY = y;
    this.tail = [];

    this.doDraw = 0;

    this.type = type;
    this.angle = (angle * 3.14) / 180;

    this.alive = true;

    this.catchSpells = catchSpells;

    if (type === "fire") {
      castSpells?.at(0).setVolume(1, 0);
      castSpells?.at(0).play();
    } else if (type === "water") {
      castSpells?.at(1).setVolume(1, 0);
      castSpells?.at(1).play();
    }
  }

  detectCollision(helper, cx, cy, rad) {
    let x = helper.pos.x;
    let y = helper.pos.y;
    let r = helper.r / 2;

    let distance = dist(cx, cy, x, y);
    return distance < r + rad;
  }

  draw(helper) {
    // The cos() function gives us a value that bounces between -1 and 1.
    // We can use that to create animations!
    if (this.doDraw === 2) {
      this.doDraw = 0;

      this.ghostY +=
        cos(frameCount / 10) * this.wiggliness +
        this.floatiness * cos(this.angle);
      this.ghostX += this.floatiness * sin(this.angle);

      // If the ghost goes above the top of the canvas, move it back to the bottom.
      if (
        this.ghostY < -this.ghostSize ||
        this.ghostY >= height - this.ghostSize
      ) {
        this.alive = false;
      }
      if (
        this.ghostX < -this.ghostSize ||
        this.ghostX >= width - this.ghostSize
      ) {
        this.alive = false;
      }

      // Add a point to the beginning of the array.
      this.tail.unshift({ x: this.ghostX, y: this.ghostY });
      // If the array is too big, remove the last point.
      if (this.tail.length > this.tailLength) {
        this.tail.pop();
      }
    } else {
      this.doDraw = this.doDraw + 1;
    }

    strokeWeight(4);
    if (this.type === "fire") {
      stroke("#FF421D");
    } else if (this.type === "water") {
      stroke("#3E7FFF");
    } else if (this.type === "poison") {
      stroke("#8327C5");
    }

    // Loop over the tail and draw the points.
    for (var index = 0; index < this.tail.length; index++) {
      const tailPoint = this.tail[index];

      // Tail gets smaller and more transparent.
      const pointSize =
        (this.ghostSize * (this.tail.length - index)) / this.tail.length;
      const pointAlpha = (255 * (this.tail.length - index)) / this.tail.length;

      if (this.type === "fire") {
        fill(255, 169, 0, pointAlpha);
      } else if (this.type === "water") {
        fill(101, 185, 255, pointAlpha);
      } else if (this.type === "poison") {
        fill(131, 92, 197, pointAlpha);
      }
      ellipse(tailPoint.x, tailPoint.y, pointSize);

      if (
        this.detectCollision(helper, tailPoint.x, tailPoint.y, pointSize / 2)
      ) {
        this.alive = false;
        console.log("collision detected");

        if (this.type === "fire") {
          catchSpells?.at(0).setVolume(1, 0);
          catchSpells?.at(0).play();
        } else if (this.type === "water") {
          catchSpells?.at(1).setVolume(1, 0);
          catchSpells?.at(1).play();
        }
      }
    }

    // Draw the ghost's face.
    // fill(255,255,255);
    // ellipse(this.ghostX - this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX + this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX, this.ghostY + this.ghostSize * .2, this.ghostSize * .2);
  }
}
