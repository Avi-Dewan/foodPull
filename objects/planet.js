class Planet {
  constructor(pos, vel, r, img, type = "") {
    this.pos = pos;
    this.vel = vel;
    this.acc = createVector(0, 0);
    this.r = r;
    this.type = type;
    this.img = img;
    this.move = true;
    this.collidedLoopCount = false;
    this.maxVel = 2;

    if (this.type === "poisonous") {
      this.img = poisonImg;
    } else if (this.type === "increase") {
      this.img = plusPlanetImg;
    } else if (this.type === "decrease") {
      this.img = minusPlanetImg;
    }
  }

  draw(astronaut, foods) {
    if (this.type === "poisonous") this.img = poisonImg;
    this.handleCollision(astronaut, foods);
    // this.update();
    if (this.img) {
      if (this.type === "earth") {
        image(
          spellsCollected["fire"]?.at(0) > 0 ? potFireImg : potImg,
          this.pos.x - this.r / 2 - 10,
          this.pos.y - this.r / 2 - 10,
          this.r + 20,
          this.r + 20
        );
      } else if (this.type === "poisonous") {
        image(
          this.img,
          this.pos.x - this.r / 2,
          this.pos.y - this.r / 2,
          this.r,
          this.r
        );
      } else if (this.type === "helper") {
        let x = this.pos.x;
        let y = this.pos.y;

        let resetX = false;
        let resetY = false;

        if (x > CANVAS_WIDTH - this.r / 2) {
          x = CANVAS_WIDTH - this.r / 2;
          resetX = true;
        }
        if (y > CANVAS_HEIGHT - this.r / 2) {
          y = CANVAS_HEIGHT - this.r / 2;
          resetY = true;
        }
        if (x < this.r / 2) {
          x = this.r / 2;
          resetX = true;
        }
        if (y < this.r / 2) {
          y = this.r / 2;
          resetY = true;
        }

        this.pos = createVector(x, y);

        let velx = this.vel.x;
        let vely = this.vel.y;

        if (resetX) velx = 0;
        if (resetY) vely = 0;
        this.vel = createVector(velx, vely);

        blendMode(BLEND);
        image(
          this.img,
          this.pos.x - this.r / 2,
          this.pos.y - this.r / 2,
          this.r,
          this.r
        );
        blendMode(SCREEN);
      } else {
        image(
          this.img,
          this.pos.x - this.r / 2,
          this.pos.y - this.r / 2,
          this.r,
          this.r
        );
      }
    }
    if (this.type === "increase") {
      let size = min(this.r - 10, 20);
      blendMode(BLEND);
      image(plusImg, this.pos.x - size / 2, this.pos.y - size / 2, size, size);
      blendMode(SCREEN);
    }
    if (this.type === "decrease") {
      let size = min(this.r - 10, 20);
      blendMode(BLEND);
      image(minusImg, this.pos.x - size / 2, this.pos.y - size / 2, size, size);
      blendMode(SCREEN);
    }
    noStroke();
    noFill();
    circle(this.pos.x, this.pos.y, this.r);
  }

  update(planets) {
    if (this.type === "helper") {
      let displacement = p5.Vector.sub(createVector(mouseX, mouseY), this.pos);

      if (p5.Vector.mag(displacement) < 10) {
        displacement = createVector(0, 0);
        this.vel = createVector(0, 0);
      } else {
        displacement.normalize();
      }

      this.acc = p5.Vector.mult(displacement, 0.5);

      let vx = this.vel.x;
      let vy = this.vel.y;
      if (vx > this.maxVel) vx = this.maxVel;
      if (vy > this.maxVel) vy = this.maxVel;
      if (vx < -this.maxVel) vx = -this.maxVel;
      if (vy < -this.maxVel) vy = -this.maxVel;
      this.vel = createVector(vx, vy);

      planets.forEach((planet) => {
        if (planet.type !== "helper") {
          let d = dist(planet.pos.x, planet.pos.y, this.pos.x, this.pos.y);
          if (2 * d < this.r + planet.r) {
            let pushForce = p5.Vector.sub(this.pos, planet.pos);
            this.acc.add(p5.Vector.mult(pushForce, 0.1));
            this.handlePlanetCollision(planet);
          }
        }
      });

      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }
  }

  handleCollision(astronaut, foods) {
    if (!astronaut.detectCollision(this)) {
      return;
    }

    let allGrabbed = true;
    Object.keys(foodsCollected).forEach((key) => {
      if (foodsCollected[key][0] !== foodsCollected[key][1]) allGrabbed = false;
    });
    Object.keys(spellsCollected).forEach((key) => {
      if (spellsCollected[key][0] !== spellsCollected[key][1])
        allGrabbed = false;
    });

    if (this.type === "earth" && allGrabbed) {
      winSound.setVolume(1, 0);
      winSound.play();
      astronaut.vel = createVector(0, 0);
      if (astronaut.poisonous === 0) {
        notiText = "Congrats! Zorgons returned earth with the foods.";
      }
      astronaut.poisonous += 5;
      // TODO: prompt
    } else if (this.type === "earth") {
      astronaut.vel = createVector(0, 0);
      if (astronaut.poisonous === 0) {
        notiText = "Zorgons has missed some someting";
      }
      astronaut.poisonous += 5;
      failedSound.setVolume(1, 0);
      failedSound.play();
    } else if (this.type == "helper") {
      astronaut.vel = createVector(0, 0);
      if (astronaut.poisonous === 0)
        notiText = "Zorgon you poissoned the food!";
      astronaut.poisonous += 5;
      failedSound.setVolume(1, 0);
      failedSound.play();
    } else if (this.type == "poisonous") {
      astronaut.vel = createVector(0, 0);
      if (astronaut.poisonous === 0)
        notiText = "Oh no! The foods became poisonous.";
      astronaut.poisonous += 5;
      failedSound.setVolume(1, 0);
      failedSound.play();
    } else if (this.type == "lessBumpy") {
      life -= 0.3;

      if (life <= 0) life = 0;

      if (astronaut.vel.mag() < 1) {
        astronaut.vel.mult(-1.3);
      } else {
        astronaut.vel.mult(-0.5);
        // console.log(astronaut.vel.mag());
      }

      astronautBounceSound.play();

      astronaut.a = createVector(0, 0);
    } else {
      astronautBounceSound.play();
      life -= 20;
      if (life <= 0) life = 0;
      astronaut.vel.mult(-1);
      astronaut.a = createVector(0, 0);
    }
  }

  handlePlanetCollision(planet) {
    if (this.type === "helper") {
      if (planet.type === "earth") {
        astronaut.vel = createVector(0, 0);
        if (astronaut.poisonous === 0)
          notiText = "Oh no! The Zorgons cannot live in the earth.";
        astronaut.poisonous = 260;
        showNotification();
        failedSound.setVolume(1, 0);
        failedSound.play();
      } else if (planet.type === "splitter") {
        //split function
      } else if (planet.type === "increase") {
        let area = PI * this.r * this.r + PI * planet.r * planet.r;
        let radius = sqrt(area / PI);
        this.r = radius;
        this.removeObjectFromArray(planets, planet);
        gulpSound.play();
      } else if (planet.type === "decrease") {
        this.r -= planet.r / 3;
        this.removeObjectFromArray(planets, planet);
        gulpSound.play();
      } else if (planet.type === "speedup") {
        // this.vel += (planet.r*100) ;
        // this.removeObjectFromArray(planets, planet);
      } else if (planet.type === "speedDown") {
        // this.vel -= (planet.r);
        // this.removeObjectFromArray(planets, planet);
      } else {
        bounceSound.play();
      }
    }
  }

  calculateLineValue(slope, yIntercept, pos) {
    return slope * pos.x + yIntercept - pos.y;
  }

  removeObjectFromArray(objects, objectToRemove) {
    let index = objects.indexOf(objectToRemove); // Find the index of the object in the array
    if (index !== -1) {
      objects.splice(index, 1); // Remove the object from the array
    }
  }
}
