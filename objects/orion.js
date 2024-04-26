class Orion {
    constructor(img, positions, width=120, height=150) {
        this.img = img;
        this.positions = positions;
        this.width = width;
        this.height = height;
    }

    draw(posIdx) {
        push();
        tint(255, 175);
        image(this.img, this.positions[posIdx].pos.x, this.positions[posIdx].pos.y, this.width, this.height);
        pop();
    }

}