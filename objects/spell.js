const colors = {
  fire: {
    fill: [131, 92, 197],
    shadow: "#ff6e00",
    falloff: 0.6,
    shades: ["#ffff00", "#ee6600", "#eeee00", '#aabb00']
  },
  water: {
    fill: [0, 0, 255],
    shadow: "#4474FC",
    falloff: 0.6,
    shades: ["#2274FF", "#4474CC", "#2474AC"]
  },
  poison: {
    fill: [100, 10, 255],
    shadow: "#00ff00",
    falloff: 1,
    shades: ["#00ddaa", "#22ee00", "#11ff00"]
  },
};

class Spell {
  constructor(type, angle, x, y, castSpells, catchSpells) {
    this.tailLength = 12;
    this.ghostSize = 20;
    this.incrX = 0;
    this.baseX = x;
    this.baseY = y;

    this.ghostX = x;
    this.ghostY = y;
    this.tail = [];
    this.stars = [];

    this.type = type;
    this.angle = (angle * 3.14) / 180;

    this.alive = true;
    this.state = "active";

    this.catchSpells = catchSpells;

    if (type === "fire") {
      castSpells?.at(0).setVolume(1, 0);
      castSpells?.at(0).play();
    } else if (type === "water") {
      castSpells?.at(1).setVolume(1, 0);
      castSpells?.at(1).play();
    }

    this.weights = Array.from({ length: 5 }, () => Math.random() * 20);
  }

  detectCollision(helper, cx, cy, rad) {
    let x = helper.pos.x;
    let y = helper.pos.y;
    let r = helper.r / 2;

    let distance = dist(cx, cy, x, y);
    return distance < r + rad;
  }

  detectCollisionWithBasket(astronaut, cx, cy, rad) {
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
      if (spellsCollected[this.type]) {
        if (spellsCollected[this.type][0] < spellsCollected[this.type][1]) {
          spellsCollected[this.type][0]++;
        } else {
          damageSound.setVolume(1, 0);
          life -= 40;
        }
      } else {
        damageSound.setVolume(1, 0);
        life -= 40;
      }

      if (this.type === "fire") {
        catchSpells?.at(0).setVolume(1, 0);
        catchSpells?.at(0).play();
      } else if (this.type === "water") {
        catchSpells?.at(1).setVolume(1, 0);
        catchSpells?.at(1).play();
      }

      return;
    }

    if (
      this.detectCollisionWithBasket(
        astronaut,
        this.ghostX,
        this.ghostY,
        this.ghostSize / 2
      )
    ) {
      this.alive = false;
      life -= 20;
    }
    push();

    var incrY = 0;
    for (var i = 0; i < 5; i++) {
      incrY += this.weights[i] * sin(this.incrX / 100);
    }

    this.ghostX =
      this.baseX + this.incrX * cos(this.angle) - incrY * sin(this.angle);
    this.ghostY =
      this.baseY + this.incrX * sin(this.angle) + incrY * cos(this.angle);

    if (this.incrX > width) {
      this.alive = false;
    }

    this.incrX += Math.random() * 2 + 1;

    // Add a point to the beginning of the array.
    this.tail.unshift({ x: this.ghostX, y: this.ghostY });
    if (this.tail.length > this.tailLength) {
      let pos = this.tail.pop()

      if(this.stars.length == 0 || dist(this.stars[0].x, this.stars[0].y, pos.x, pos.y) > 50){
        let scale = Math.random() * 1.5 + .2;
        let colorIdx = Math.random() * colors[this.type]['shades'].length;
        colorIdx = Math.floor(colorIdx);
        this.stars.unshift(new Star(pos.x + Math.random() * 20 - 10, pos.y + Math.random() * 20 - 5, scale, colors[this.type]['shades'][colorIdx]));


        scale = Math.random() * .7 + .1;
        colorIdx = Math.random() * colors[this.type]['shades'].length;
        colorIdx = Math.floor(colorIdx);
        this.stars.unshift(new Star(pos.x + Math.random() * 30, pos.y + Math.random() * 30 - 15, scale, colors[this.type]['shades'][colorIdx]));

        scale = Math.random() * .7 + .1;
        colorIdx = Math.random() * colors[this.type]['shades'].length;
        colorIdx = Math.floor(colorIdx);
        this.stars.unshift(new Star(pos.x + Math.random() * 30 , pos.y + Math.random() * 30 - 15, scale, colors[this.type]['shades'][colorIdx]));
      }

      if(this.stars.length >= 15) this.stars.pop();
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
    for(let i = 0; i < this.stars.length; i++){
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

class Star{
  constructor(x, y, scale, color){
    this.x = x;
    this.y = y;
    this.radius1 = 3;
    this.radius2 = 6;
    this.color = color;
    this.scale = scale;
  }

  draw(npoints=5) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;

    push();
    translate(this.x, this.y);
    scale(this.scale);

    fill(this.color);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx =  cos(a) * this.radius2;
      let sy =  sin(a) * this.radius2;
      vertex(sx, sy);
      sx =  cos(a + halfAngle) * this.radius1;
      sy =  sin(a + halfAngle) * this.radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);

    pop();
  }
}
