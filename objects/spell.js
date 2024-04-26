const colors = {
  'fire': {
    'fill': [131, 92, 197],
    'shadow': "#ff6e00",
    'falloff': .6
  },
  'water': {
    'fill': [0, 0, 255],
    'shadow': "#4474FC",
    'falloff': .6
  },
  'poison': {
    'fill': [100, 10, 255],
    'shadow': "#3333ff",
    'falloff': 1
  }
}

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

    this.xs = [x, x+600, x+1200, x+1600];
    this.ys = [y, y+400, y+400, y]
    this.t = 0;
  }

  detectCollision(helper, cx, cy, rad) {
    let x = helper.pos.x;
    let y = helper.pos.y;
    let r = helper.r / 2;

    let distance = dist(cx, cy, x, y);
    return distance < r + rad;
  }

  draw(helper) {
    push();

    this.ghostX = Math.pow(1-this.t, 3) * this.xs[0]
    + Math.pow(1-this.t, 2) * this.t * this.xs[1]
    + (1-this.t) * this.t*this.t * this.xs[2]
    + Math.pow(this.t, 3) * this.xs[3];


    this.ghostY = Math.pow(1-this.t, 3) * this.ys[0]
    + Math.pow(1-this.t, 2) * this.t * this.ys[1]
    + (1-this.t) * this.t*this.t * this.ys[2]
    + Math.pow(this.t, 3) * this.ys[3];


    console.log(this.ghostX, this.ghostY);

    this.t += .005;

    if(this.t > 1){
      this.alive = false;
    }

    // Add a point to the beginning of the array.
    this.tail.unshift({ x: this.ghostX, y: this.ghostY });
    // If the array is too big, remove the last point.
    if (this.tail.length > this.tailLength) {
      this.tail.pop();
    }

    drawingContext.shadowColor = colors[this.type]['shadow'];

    // Loop over the tail and draw the points.
    for (var index = 0; index < this.tail.length; index++) {
      let reverseIndex = this.tail.length - index;
      let mass = reverseIndex * 1.5;
      const tailPoint = this.tail[index];

      drawingContext.shadowBlur = mass;

      // Tail gets smaller and more transparent.
      const pointSize = this.ghostSize * reverseIndex / this.tail.length;
      const pointAlpha = 255 * reverseIndex / this.tail.length;

      stroke(0);
      strokeWeight(mass);
      fill(colors[this.type]['fill'][0], colors[this.type]['fill'][1], colors[this.type]['fill'][2], pointAlpha);
      
      ellipse(tailPoint.x, tailPoint.y, pointSize * colors[this.type]['falloff']);

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

    pop();

    // Draw the ghost's face.
    // fill(255,255,255);
    // ellipse(this.ghostX - this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX + this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX, this.ghostY + this.ghostSize * .2, this.ghostSize * .2);
  }
}
