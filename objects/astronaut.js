class Astronaut {

    maxVel = 2.5

    constructor(img, pos, k) {
        this.img = img;
        this.height = 50;
        this.width = 25;
        this.pos = pos;
        this.resultant = createVector(0,0);
        this.k = k;
        this.vel = createVector(0,0);
        this.a = createVector(0,0);
        this.poisonous = 0;
    }

    draw() {

        // this.drawTrace(planets);
        let x = this.pos.x;
        let y= this.pos.y;
        let resetX = false;
        let resetY = false;
        
        if (x > CANVAS_WIDTH-this.width) {x = CANVAS_WIDTH-this.width; resetX = true;}
        if (y > CANVAS_HEIGHT-this.height) {y = CANVAS_HEIGHT-this.height; resetY = true}
        if (x < 0) {x = 0; resetX = true}
        if (y < 0) {y = 0; resetY = true}

        if (resetX || resetY) {
            life -= 20;
            if (life <= 0) life = 0;
        }

        this.pos = createVector(x,y);
        let velx = this.vel.x;
        let vely = this.vel.y;

        if (resetX) velx = - 0.1*velx;
        if (resetY) vely = -0.1*vely;
        this.vel = createVector(velx, vely)

        if(this.poisonous > 0) {
            push();
            tint(0, 255, 0, max(0,255-this.poisonous));
            fill(220);
            image(this.img, x, y, this.width, this.height);
            pop()
        } else {
            stroke(220)
            image(this.img, x, y, this.width, this.height);
        }

        this.pos.add(this.vel);

        this.vel.add(p5.Vector.div(this.resultant,100));

        let vx = this.vel.x;
        let vy = this.vel.y;
        if (vx > this.maxVel) vx = this.maxVel;
        if (vy > this.maxVel) vy = this.maxVel;
        if (vx < -this.maxVel) vx = -this.maxVel;
        if (vy < -this.maxVel) vy = -this.maxVel;
        this.vel = createVector(vx, vy);

    }

    detectCollision(planet) {
        // TODO: better collision detect: https://editor.p5js.org/mrbombmusic/sketches/l95s9fZJY
        // return dist(this.center().x, this.center().y, planet.pos.x, planet.pos.y) < planet.r;
        let cx = planet.pos.x;
        let cy = planet.pos.y;
        let rad = planet.r / 2;

        let rx = this.pos.x;
        let ry = this.pos.y;
        let rw = this.width;
        let rh = this.height;

        let testX = cx;
        let testY = cy;

        if (cx < rx)         testX = rx;      // test left edge
        else if (cx > rx+rw) testX = rx+rw;   // right edge
        if (cy < ry)         testY = ry;      // top edge
        else if (cy > ry+rh) testY = ry+rh;   // bottom edge
  
        let d = dist(cx, cy, testX, testY);
  
        if (d <= rad) {
            return true;
        }
        return false;
    } 

    drawTrace(planets) {
        this.resultant = createVector(0,0);
        planets.forEach(planet => {
            let force = this.evaluateForce(planet);
            if (p5.Vector.mag(force) > 0.6) {
                this.resultant.add(force);
                strokeWeight(2);

                let opacity = min(2, p5.Vector.mag(force))*120;
                let strokeWidth = min(2, p5.Vector.mag(force))*3.5;
                strokeWeight(strokeWidth);

                if (planet.type === "earth") {
                    stroke(100, 255, 100, opacity);
                } else if (planet.type === "helper" || planet.type === "poisonous") {
                    stroke(255, 100, 100, opacity);
                } else {
                    stroke(100, 100, 255, opacity);
                }

                drawingContext.setLineDash([3,6]);
                line(planet.pos.x, planet.pos.y, this.center().x, this.center().y);
            }
        });

        let opacity = min(2, p5.Vector.mag(this.vel))*120;
        let strokeWidth = min(2, p5.Vector.mag(this.vel))*1.5;
        strokeWeight(strokeWidth);
        const endPoint = p5.Vector.add(this.center(), p5.Vector.mult(this.vel, 80));
        stroke(200, 200, 200, opacity);
        drawingContext.setLineDash([30,0]);
        line(this.center().x, this.center().y, endPoint.x, endPoint.y);
        circle(endPoint.x, endPoint.y, strokeWidth*2);
    }

    center() {
        return createVector(this.pos.x + this.width/2, this.pos.y + this.height/2);
    }

    evaluateForce(planet) {
        const d = dist(this.center().x, this.center().y, planet.pos.x, planet.pos.y);
        const force = this.k * (planet.r * planet.r * planet.r) / (d * d);
        const displacement = p5.Vector.sub(planet.pos, this.center());
        const forceVector = p5.Vector.mult(displacement, force);

        return forceVector;
    }

}