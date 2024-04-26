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
    this.baseY = y;

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

    this.weights = Array.from({length: 10}, () => Math.random() * 20);
    this.waves = Array.from({length: 10}, () => Math.floor(Math.random() * 2));
  }

  detectCollision(helper, cx, cy, rad) {
    let x = helper.pos.x;
    let y = helper.pos.y;
    let r = helper.r / 2;

    let distance = dist(cx, cy, x, y);
    return distance < r + rad;
  }

  detectCollisionWithBasket(astronaut, cx, cy, rad){
    // TODO: better collision detect: https://editor.p5js.org/mrbombmusic/sketches/l95s9fZJY
    // return dist(this.center().x, this.center().y, planet.pos.x, planet.pos.y) < planet.r;
    let rx = astronaut.pos.x;
    let ry = astronaut.pos.y;
    let rw = astronaut.width;
    let rh = astronaut.height;

    let testX = cx;
    let testY = cy;

    if (cx < rx) testX = rx; // test left edge
    else if (cx > rx + rw) testX = rx + rw; // right edge
    if (cy < ry) testY = ry; // top edge
    else if (cy > ry + rh) testY = ry + rh; // bottom edge

    let d = dist(cx, cy, testX, testY);

    if (d <= rad / 2.0) {
      return true;
    }
    return false;
  }

  draw(helper, astronaut) {
    if (
      this.detectCollision(helper, this.ghostX, this.ghostY, this.ghostSize / 2)
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

      return ;
    }

    if(this.detectCollisionWithBasket(astronaut, this.ghostX, this.ghostY, this.ghostSize / 2)){
      this.alive = false;
    }
    push();

    this.ghostY = this.baseY;
    console.log(this.ghostY, this.baseY, sin(this.ghostX));
    for(var i = 0; i < 10; i++){
      if(this.waves[i] === 0){
        this.ghostY +=  this.weights[i] * cos(this.ghostX / 100);
      }
      if(this.waves[i] === 1){
        this.ghostY +=  this.weights[i] * sin(this.ghostX / 100);
      }
    }

    this.ghostX += Math.random() * 2 + 1;

    // Add a point to the beginning of the array.
    this.tail.unshift({ x: this.ghostX, y: this.ghostY });
    if (this.tail.length > this.tailLength) {
      this.tail.pop();
    }

    drawingContext.shadowColor = colors[this.type]['shadow'];

    // Loop over the tail and draw the points.
    for (var index = 0; index < this.tail.length; index++) {
      let reverseIndex = this.tail.length - index;
      let mass = reverseIndex * 2;
      const tailPoint = this.tail[index];

      drawingContext.shadowBlur = mass;

      // Tail gets smaller and more transparent.
      const pointSize = this.ghostSize * reverseIndex / this.tail.length;
      const pointAlpha = 255 * reverseIndex / this.tail.length;

      stroke(0);
      strokeWeight(mass);
      fill(colors[this.type]['fill'][0], colors[this.type]['fill'][1], colors[this.type]['fill'][2], pointAlpha);
      
      ellipse(tailPoint.x, tailPoint.y, pointSize * colors[this.type]['falloff']);  
    }

    pop();

    // Draw the ghost's face.
    // fill(255,255,255);
    // ellipse(this.ghostX - this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX + this.ghostSize * .2, this.ghostY - this.ghostSize * .1, this.ghostSize * .2);
    // ellipse(this.ghostX, this.ghostY + this.ghostSize * .2, this.ghostSize * .2);
  }
}
