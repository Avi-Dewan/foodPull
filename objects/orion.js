let fade = 0;

class Orion {
  constructor(img, positions, width = 100, height = 120) {
    this.img = img;
    this.positions = positions;
    this.width = width;
    this.height = height;
  }

  draw(posIdx) {
    push();

    translate(this.positions[posIdx].pos.x, this.positions[posIdx].pos.y);
    rotate((this.positions[posIdx].rotation * PI) / 180);

    tint(175, fade);
    image(this.img, 0, 0, this.width, this.height);
    pop();

    let x = this.width;
    let y = 45;
    let theta = (this.positions[posIdx].rotation * PI) / 180;

    ellipse(
      this.positions[posIdx].pos.x + x * cos(theta) - y * sin(theta),
      this.positions[posIdx].pos.y + x * sin(theta) + y * cos(theta),
      10,
      10
    );

    if (fade < 255) fade += 3;
  }
}
