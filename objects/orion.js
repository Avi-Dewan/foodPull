let fade = 0;
let posIdx = -1;

class Orion {
  constructor(
    img,
    positions,
    orionAppearance,
    cycleTime,
    castSpells,
    catchSpells,
    width = 100,
    height = 120
  ) {
    this.img = img;
    this.positions = positions;
    this.width = width;
    this.height = height;
    this.orionAppearance = orionAppearance;
    this.cycleTime = cycleTime;

    this.castSpells = castSpells;
    this.catchSpells = catchSpells;
  }

  draw(currentSpells) {
    posIdx = -1;
    for (let i = 0; i < this.orionAppearance?.length - 1; i++) {
      if (
        frameCount % this.cycleTime > this.orionAppearance[i] &&
        (frameCount % this.cycleTime) - this.orionAppearance[i] < 200
      ) {
        posIdx = i;
      }
    }

    push();

    if (posIdx >= 0) {
      translate(this.positions[posIdx].pos.x, this.positions[posIdx].pos.y);
      rotate((this.positions[posIdx].rotation * PI) / 180);

      // only god knows
      tint(
        175,
        Math.min(
          Math.min(
            (((frameCount % this.cycleTime) - this.orionAppearance[posIdx]) *
              255) /
              40,
            ((this.orionAppearance[posIdx] +
              200 -
              (frameCount % this.cycleTime)) *
              255) /
              40
          ),
          255
        )
      );
      image(this.img, 0, 0, this.width, this.height);
      pop();

      let x = this.width;
      let y = 45;
      let theta = (this.positions[posIdx].rotation * PI) / 180;

      if ((frameCount % this.cycleTime) - this.orionAppearance[posIdx] === 50) {
        console.log("first");
        currentSpells.push(
          new Spell(
            this.positions[posIdx].type,
            90 - this.positions[posIdx].rotation,
            this.positions[posIdx].pos.x + x * cos(theta) - y * sin(theta),
            this.positions[posIdx].pos.y + x * sin(theta) + y * cos(theta),
            this.castSpells,
          this.catchSpells
          )
        );
      }

      //   if (fade < 255) fade += 3;
    }

    // ellipse(
    //   this.positions[posIdx].pos.x + x * cos(theta) - y * sin(theta),
    //   this.positions[posIdx].pos.y + x * sin(theta) + y * cos(theta),
    //   10,
    //   10
    // );
  }
}
