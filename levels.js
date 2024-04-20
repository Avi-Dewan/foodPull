const style = `overflow: hidden;
border-right: .15em solid gray;
white-space: nowrap;
margin: 0 auto;
letter-spacing: .1em;
animation: 
  typing 3s steps(40, end),
  blink-caret .75s step-end infinite;`
const className = `flex items-center justify-left font-bold text-lg`

const getCurrentLevel = (index) => { 
  const levels = [
  { 
    id: 1,
    astronautPos: createVector(50,10),
    planets: [],
    earthPos: createVector(1000, 400),
    helper: {pos: createVector(300, 500), r: 80 },
    instruction: `<p class="flex font-bold text-lg" style="${style}">Move your mouse to pull yourself.</p>`
  },
  { 
    id: 2,
    astronautPos: createVector(100,100),
    planets: [
      {pos: createVector(300, 300), type: "poisonous", r: 80 },
      {pos: createVector(550, 200), type: "", r: 60},  
    ],
    earthPos: createVector(900, 400),
    helper: {pos: createVector(300, 450), r: 80 },
    instruction: `<p class="${className}" style="${style}">Avoid the poisonous planet. <span class-"inline"><img src="./assets/poison.png" width="30px"/></span></p>`
  },
  { 
    id: 3,
    astronautPos: createVector(100,150),
    planets: [
      {pos: createVector(300, 350), type: "poisonous", r: 80},
      {pos: createVector(600, 400), type: "", r: 80},
      {pos: createVector(450, 170), type: "", r: 80},
      {pos: createVector(950, 170), type: "", r: 80},  
    ],
    earthPos: createVector(900, 400),
    helper: {pos: createVector(250, 250), r: 80 },
    instruction: `<p class="${className}" style="${style}">Best of luck!</p>`
  },
  {
    id: 4, 
    astronautPos: createVector(1000,100),
    planets: [
      {pos: createVector(400, 400), type: "", r: 120},
      {pos: createVector(550, 360), type: "increase", r: 70},
      {pos: createVector(650, 250), type: "poisonous", r: 40},
    ],
    earthPos: createVector(1000, 500),
    helper: {pos: createVector(450, 50), r: 80 },
    instruction: `<p class="${className}" style="${style}">Touch the 'plus' planet to increase your gavitational pull. <span class-"inline"><img src="./assets/plus.png" width="20px"/></span></p>`
  },
  {
    id: 5, 
    astronautPos: createVector(100,150),
    planets: [
      {pos: createVector(200, 150), type: "", r: 20},
      {pos: createVector(300, 50), type: "", r: 40},
      {pos: createVector(800, 300), type: "", r: 50},
      {pos: createVector(300, 360), type: "increase", r: 80},
      {pos: createVector(450, 520), type: "poisonous", r: 40},
      {pos: createVector(450, 280), type: "poisonous", r: 40},
    ],
    earthPos: createVector(1000, 500),
    helper: {pos: createVector(450, 50), r: 80 },
    instruction: `<p class="${className}" style="${style}">Best of luck</p>`
  },
  {
    id: 6, 
    astronautPos: createVector(20,230),
    planets: [
      {pos: createVector(50, 170), type: "poisonous", r: 50},
      {pos: createVector(50, 340), type: "poisonous", r: 50},
      {pos: createVector(120, 350), type: "poisonous", r: 50},
      {pos: createVector(130, 175), type: "poisonous", r: 30},  
      {pos: createVector(200, 150), type: "poisonous", r: 55},
      {pos: createVector(200, 370), type: "poisonous", r: 50},
      {pos: createVector(335, 170), type: "poisonous", r: 50},
      {pos: createVector(330, 440), type: "poisonous", r: 50},

      {pos: createVector(400, 170), type: "poisonous", r: 50},
      {pos: createVector(400, 440), type: "poisonous", r: 50},

      {pos: createVector(480, 190), type: "poisonous", r: 50},

      {pos: createVector(600, 220), type: "", r: 80},
      {pos: createVector(700, 105), type: "", r: 100},

      {pos: createVector(500, 140), type: "decrease", r: 40},
      {pos: createVector(100, 540), type: "increase", r: 65},


    ],
    earthPos: createVector(1000, 530),
    helper: {pos: createVector(300, 80), r: 87 },
    instruction: `<p class="${className}" style="${style}">Touch the 'minus' planet to decrease your size. <span class-"inline"><img src="./assets/minus.png" width="20px"/></span></p>`
  },
  {
    id: 7, 
    astronautPos: createVector(100,250),
    planets: [
      {pos: createVector(200, 150), type: "", r: 60},
      {pos: createVector(300, 50), type: "", r: 70},
      {pos: createVector(800, 300), type: "", r: 90},
      {pos: createVector(300, 500), type: "", r: 40},
      {pos: createVector(200, 400), type: "", r: 50},
      {pos: createVector(300, 300), type: "poisonous", r: 60},
      {pos: createVector(300, 200), type: "", r: 40},
      {pos: createVector(900, 400), type: "poisonous", r: 40},
      {pos: createVector(500, 450), type: "poisonous", r: 80},
      {pos: createVector(600, 250), type: "increase", r: 60},

    ],
    earthPos: createVector(1000, 500),
    helper: {pos: createVector(450, 50), r: 80 },
    instruction: `<p class="${className}" style="${style}">Remember, the bigger is not always the better.</p>`
  },
  {
    id: 8, 
    astronautPos: createVector(20,20),
    planets: [
      {pos: createVector(150, 170), type: "lessBumpy", r: 30},
      {pos: createVector(200, 140), type: "lessBumpy", r: 35},
      {pos: createVector(240, 80), type: "lessBumpy", r: 35},
      {pos: createVector(280, 30), type: "lessBumpy", r: 30},
      {pos: createVector(310, 20), type: "lessBumpy", r: 30},
      {pos: createVector(350, 10), type: "lessBumpy", r: 30},



      {pos: createVector(20, 400), type: "lessBumpy", r: 30},
      {pos: createVector(53, 400), type: "lessBumpy", r: 30},
      {pos: createVector(86, 400), type: "lessBumpy", r: 30},
      {pos: createVector(120, 400), type: "lessBumpy", r: 30},
      {pos: createVector(160, 400), type: "lessBumpy", r: 30},
      {pos: createVector(195, 360), type: "lessBumpy", r: 35},

      {pos: createVector(235, 300), type: "lessBumpy", r: 35},
      {pos: createVector(280, 250), type: "lessBumpy", r: 33},
      {pos: createVector(320, 240), type: "lessBumpy", r: 30},
      {pos: createVector(350, 210), type: "lessBumpy", r: 30},
      {pos: createVector(380, 180), type: "lessBumpy", r: 35},
      {pos: createVector(415, 180), type: "lessBumpy", r: 30},
      {pos: createVector(450, 150), type: "lessBumpy", r: 35},
      {pos: createVector(500, 150), type: "lessBumpy", r: 30},

      {pos: createVector(550, 150), type: "lessBumpy", r: 30},
      {pos: createVector(590, 150), type: "lessBumpy", r: 30},
      {pos: createVector(630, 150), type: "lessBumpy", r: 30},
      {pos: createVector(670, 150), type: "lessBumpy", r: 30},
      {pos: createVector(720, 150), type: "lessBumpy", r: 30},
      {pos: createVector(770, 150), type: "lessBumpy", r: 30},
      {pos: createVector(820, 150), type: "lessBumpy", r: 30},
      {pos: createVector(870, 150), type: "lessBumpy", r: 30},
      {pos: createVector(920, 150), type: "lessBumpy", r: 30},
      {pos: createVector(960, 169), type: "lessBumpy", r: 30},

      {pos: createVector(1000, 190), type: "lessBumpy", r: 35},
      {pos: createVector(1040, 230), type: "lessBumpy", r: 30},
      {pos: createVector(1040, 270), type: "lessBumpy", r: 30},
      {pos: createVector(1040, 320), type: "lessBumpy", r: 35},
      {pos: createVector(1040, 370), type: "lessBumpy", r: 30},
      {pos: createVector(1040, 400), type: "lessBumpy", r: 30},
      {pos: createVector(1040, 440), type: "lessBumpy", r: 30},
      {pos: createVector(1040, 480), type: "lessBumpy", r: 30},

      {pos: createVector(1000, 480), type: "lessBumpy", r: 30},
      {pos: createVector(960, 480), type: "lessBumpy", r: 30},
      {pos: createVector(910, 480), type: "lessBumpy", r: 35},
      {pos: createVector(870, 480), type: "lessBumpy", r: 30},
      {pos: createVector(820, 480), type: "lessBumpy", r: 35},
      {pos: createVector(960, 480), type: "lessBumpy", r: 30},
      {pos: createVector(910, 480), type: "lessBumpy", r: 35},
      {pos: createVector(870, 480), type: "lessBumpy", r: 30},
      {pos: createVector(820, 480), type: "lessBumpy", r: 35},
      {pos: createVector(780, 480), type: "lessBumpy", r: 35},
      {pos: createVector(750, 480), type: "lessBumpy", r: 30},
      {pos: createVector(710, 480), type: "lessBumpy", r: 35},
      {pos: createVector(670, 480), type: "lessBumpy", r: 30},
      {pos: createVector(620, 480), type: "lessBumpy", r: 35},
      {pos: createVector(580, 480), type: "lessBumpy", r: 35},
      {pos: createVector(530, 480), type: "lessBumpy", r: 35},
      {pos: createVector(490, 480), type: "lessBumpy", r: 35},
      {pos: createVector(450, 480), type: "lessBumpy", r: 30},
      {pos: createVector(410, 480), type: "lessBumpy", r: 35},
      {pos: createVector(370, 480), type: "lessBumpy", r: 30},
      {pos: createVector(320, 480), type: "lessBumpy", r: 35},


      {pos: createVector(700, 220), type: "poisonous", r: 50},
      {pos: createVector(1100, 50), type: "increase", r: 50},


      
    ],
    earthPos: createVector(900, 300),
    earthRad: 40,
    helper: {pos: createVector(90, 300), r: 80 },
    instruction: `<p class="${className}" style="${style}">Can you complete the game?</p>`
  },
];

  return levels[index];
}