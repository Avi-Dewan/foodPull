const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 800;

// images
let astronautImg;
let orionImg;
let earthImg;
let lifeImg;
let poisonImg;
let helperImg;
let foodImgs = {};
let plusImg;
let plusPlanetImg;
let minusImg;
let minusPlanetImg;
let totalPlanetImage = 7;
let spellImages = {};
let potImg;
let potFireImg;
let potFoodImg;
let potFireFoodImg;

let currentSpells = [];

// sounds
let bgSound;
let astronautBounceSound;
let bounceSound;
let gulpSound;
let winSound;
let failedSound;
let clickSound;
let collectSound;
let castSpells = []; // 0-> fire, 1 -> water, 2 -> poison
let catchSpells = [];
let damageSound;

// characters
let foods = [];
let planets = [];
let astronaut;
let orion;
let helper;
let earth;
let planetImg = [];
let randomPos = [];
let loopCount = 0;
let notiText = "";

// stat variables
let run = false;
let currentLevel = 0;
let newMenu = true;
let pauseMenu = false;
let level;
let life = 200;
let foodsCollected = {};
let spellsCollected = {};

// buttons
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const continueBtn = document.getElementById("continueBtn");
const notificationBtn = document.getElementById("notificationBtn");

// show/hide div
const notificationText = document.getElementById("notificationText");
const menu = document.getElementById("menu");
const pauseMenuBox = document.getElementById("pauseMenu");
const levelBox = document.getElementById("levelBox");
const pauseResetMenu = document.getElementById("pauseReset");
const notificationBox = document.getElementById("notification");
const instructionBox = document.getElementById("instruction");

const levelButtons = [...Array(8)].map((_, idx) => {
  return document.getElementById(`lvl${idx + 1}`);
});

levelButtons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    currentLevel = idx + 1;
    startGame();
  });
});

notificationBtn.addEventListener("click", () => {
  notificationBox.style.display = "none";
  notificationBtn.style.display = "none";
  handleResetBtn();
});

pauseBtn.addEventListener("click", () => {
  pauseMenu = true;
  menu.style.display = "flex";
  levelBox.style.display = "none";
  pauseMenuBox.style.display = "flex";
  run = false;
  pauseResetMenu.style.display = "none";
  instructionBox.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  handleResetBtn();
});

continueBtn.addEventListener("click", () => {
  run = true;
  menu.style.display = "none";
  pauseResetMenu.style.display = "flex";
  instructionBox.style.display = "flex";
  draw();
});

function handleResetBtn() {
  notiText = "";
  menu.style.display = "flex";
  pauseMenuBox.style.display = "none";
  levelBox.style.display = "flex";
  run = false;
  pauseResetMenu.style.display = "none";
  instructionBox.style.display = "none";
}

function startGame() {
  level = getCurrentLevel(currentLevel - 1);
  startNewLevel();
  pauseResetMenu.style.display = "flex";
  instructionBox.style.display = "flex";
  run = true;
  menu.style.display = "none";
  draw();
}

function preload() {
  astronautImg = loadImage("./assets/basket.png");
  earthImg = loadImage("./assets/earth.png");
  for (let i = 0; i < totalPlanetImage; i++) {
    planetImg.push(loadImage(`./assets/planet${i + 1}.png`));
  }
  lifeImg = loadImage("./assets/life.png");
  poisonImg = loadImage("./assets/poison.png");
  helperImg = loadImage("./assets/ufo.png");

  orionImg = loadImage("./assets/orion.png");

  foodImgs["broccoli"] = loadImage("./assets/broccoli.png");
  foodImgs["carrot"] = loadImage("./assets/carrot.png");
  foodImgs["eggs"] = loadImage("./assets/eggs.png");
  foodImgs["lettuce"] = loadImage("./assets/lettuce.png");
  foodImgs["potato"] = loadImage("./assets/potato.png");
  foodImgs["turkey"] = loadImage("./assets/turkey.png");

  spellImages["fire"] = loadImage("./assets/fire.png");
  spellImages["water"] = loadImage("./assets/water-drop.png");

  plusImg = loadImage("./assets/plus.png");
  minusImg = loadImage("./assets/minus.png");
  plusPlanetImg = loadImage("./assets/plusPlanet.png");
  minusPlanetImg = loadImage("./assets/minusPlanet.png");
  bgSound = loadSound("./assets/sounds/bg3.mp3");
  astronautBounceSound = loadSound("./assets/sounds/astronautBounce2.mp3");
  bounceSound = loadSound("./assets/sounds/bounce.wav");
  gulpSound = loadSound("./assets/sounds/gulp2.mp3");
  winSound = loadSound("./assets/sounds/win2.mp3");
  failedSound = loadSound("./assets/sounds/failed.mp3");
  clickSound = loadSound("./assets/sounds/click.mp3");
  collectSound = loadSound("./assets/sounds/collect_food.mp3");

  damageSound = loadSound("./assets/sounds/damage.mp3");

  potImg = loadImage("./assets/pot.png");
  potFireImg = loadImage("./assets/pot-fire.png");
  potFoodImg = loadImage("./assets/pot-food.png");
  potFireFoodImg = loadImage("./assets/pot-fire-food.png");

  for (let i = 0; i < 2; i++) {
    castSpells.push(loadSound(`./assets/sounds/cast-${i}.mp3`));
    catchSpells.push(loadSound(`./assets/sounds/catch-${i}.mp3`));
  }
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let i = 0; i < 100; i++) {
    let pos = createVector(random(width), random(height));
    randomPos.push({ pos: pos, opacity: random(255), size: random(5) });
  }

  helper = new Planet(
    createVector(600, 400),
    createVector(0, 0),
    80,
    helperImg,
    "helper"
  );
  earth = new Planet(
    createVector(800, 400),
    createVector(0, 0),
    80,
    earthImg,
    "earth"
  );

  planets.push(helper);
  planets.push(
    new Planet(createVector(100, 100), createVector(0, 0), 70, planetImg[0])
  );
  planets.push(
    new Planet(
      createVector(400, 400),
      createVector(0, 0),
      70,
      planetImg[1],
      "poisonous"
    )
  );
  planets.push(earth);

  console.log(foodImgs);
  astronaut = new Astronaut(
    astronautImg,
    createVector(150, 450),
    0.0003,
    foodImgs
  );

  orion = new Orion(orionImg, [
    { pos: createVector(20, 50), rotation: 0 },
    { pos: createVector(20, 500), rotation: 0 },
    { pos: createVector(600, 50), rotation: 0 },
  ]);

  // noLoop();

  bgSound.loop();
  bgSound.setVolume(0);

  bounceSound.setVolume(0.3);

  // spell = new Spell("", -80, 700, 500);
  // currentSpells.push(spell);

  // spell = new Spell("", 80, 400, 500);
  // currentSpells.push(spell);
}

function startNewLevel() {
  frameCount = 0;
  life = 200;
  planets = [];
  foods = [];
  currentSpells = [];

  Object.keys(level.basketCollectables).forEach((key) => {
    foodsCollected[key] = [0, level.basketCollectables[key]];
  });

  console.log(foodsCollected);

  Object.keys(level.helperCollectables).forEach((key) => {
    spellsCollected[key] = [0, level.helperCollectables[key]];
  });

  instructionBox.innerHTML = level.instruction;

  bgSound.play();
  bgSound.setVolume(0.5, 0);
  failedSound.setVolume(0, 0.2);
  winSound.setVolume(0, 0.2);

  helper = new Planet(
    level.helper.pos,
    createVector(0, 0),
    level.helper.r,
    helperImg,
    "helper"
  );
  let earthRadius = level.earthRad;

  if (earthRadius === undefined) earthRadius = 80;
  earth = new Planet(
    level.earthPos,
    createVector(0, 0),
    earthRadius,
    earthImg,
    "earth"
  );

  planets.push(helper);
  level.planets.forEach((planet) => {
    let randomIndex = Math.floor(random(totalPlanetImage));
    planets.push(
      new Planet(
        planet.pos,
        createVector(0, 0),
        planet.r,
        planetImg[randomIndex],
        planet.type
      )
    );
  });
  planets.push(earth);

  level.foods.forEach((food) => {
    foods.push(
      new Food(
        foodImgs[food.type],
        food.pos.x,
        food.pos.y,
        food.width,
        food.height,
        food.type,
        astronaut
      )
    );
  });
  console.log(foods);

  astronaut = new Astronaut(astronautImg, level.astronautPos, 0.0003, foodImgs);
  orion = new Orion(
    orionImg,
    level.orionPos,
    level.orionAppearance,
    level.cycleTime,
    castSpells,
    catchSpells
  );
}

function draw() {
  // translate(-width / 2, -height / 2);
  blendMode(BLEND);
  background(10);
  blendMode(SCREEN);

  drawbg();

  Object.keys(foodsCollected).forEach((key, i) => {
    foodsCollected[key][0] = foods.filter(
      (food) => food.type === key && food.isGrabbed
    ).length;
  });

  Object.keys(foodsCollected).forEach((key, i) => {
    image(foodImgs[key], 20, 10 + 30 * i, 20, 20);
    textSize(16);
    fill(255);
    noStroke();
    text(
      `${foodsCollected[key][0]} / ${foodsCollected[key][1]}`,
      50,
      30 + 30 * i
    );
  });

  Object.keys(spellsCollected).forEach((key, i) => {
    image(spellImages[key], 1510, 10 + 30 * i, 20, 20);
    textSize(16);
    fill(255);
    noStroke();
    text(
      `${spellsCollected[key][0]} / ${spellsCollected[key][1]}`,
      1550,
      30 + 30 * i
    );
  });

  if (run)
    bgSound.setVolume(
      max(0.2, p5.Vector.mag(astronaut.vel) / astronaut.maxVel),
      0.2
    );

  if (astronaut.poisonous === 0) {
    astronaut.drawTrace(planets);
  }
  planets.forEach((planet) => {
    planet.draw(astronaut, foods);
  });
  astronaut.draw();
  foods.forEach((food) => {
    food.draw(astronaut);
  });

  if (astronaut.poisonous === 0) {
    orion.draw(currentSpells);
    image(lifeImg, width / 2 - 115, 10, 24, 24);
    drawingContext.setLineDash([30, 0]);
    strokeWeight(6);
    stroke(200);
    if (life !== 200) {
      line(
        width / 2 + 30 - 115 + max(0, life),
        20,
        width / 2 + 30 - 115 + 200,
        20
      );
    }
    stroke("#fc4f4f");
    line(width / 2 + 30 - 115, 20, width / 2 + 30 - 115 + max(0, life), 20);
  }
  helper.update(planets);

  if (life <= 0) {
    astronaut.vel = createVector(0, 0);
    notiText = "The food basket is not hulk!!";
    astronaut.poisonous += 5;
    failedSound.setVolume(1, 0);
    failedSound.play();
  }

  if (astronaut.poisonous > 0) {
    bgSound.setVolume(0, 1);
    pauseResetMenu.style.display = "none";
    instructionBox.style.display = "none";
    showNotification();
  }

  if (astronaut.poisonous >= 255) {
    astronaut.poisonous = 255;
    run = false;
  }

  currentSpells = currentSpells.filter((sp) => sp.alive);
  if (run) currentSpells.forEach((sp) => sp.draw(helper, astronaut));

  if (run) {
    loop();
  } else {
    noLoop();
  }
}

function drawbg() {
  randomPos.forEach((star) => {
    loopCount++;

    if (loopCount === 1000) {
      loopCount = 0;
    }

    let fromColor = color(240, 240, 240, random(240));
    let toColor = color(240, 240, 240, random(240));
    let interColor = lerpColor(fromColor, toColor, 0.33);
    fill(interColor);
    stroke(interColor);
    strokeWeight(1);
    circle(star.pos.x, star.pos.y, random(3));
  });

  strokeWeight(6);
  stroke(80, 80, 120, 200);
  noFill();
  drawingContext.setLineDash([5, 10, 30, 10]);
  rect(0, 0, width, height);
}

function showNotification() {
  fill(50, 50, 50, astronaut.poisonous);
  rect(0, 0, width, height);
  notificationBox.style.display = "flex";
  notificationText.innerText = notiText;
  notificationBtn.style.display = "block";
  menu.style.display = "none";
}

function mousePressed() {
  clickSound.play();
}
