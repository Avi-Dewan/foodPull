const style = `overflow: hidden;
border-right: .15em solid gray;
white-space: nowrap;
margin: 0 auto;
letter-spacing: .1em;
animation: 
  typing 3s steps(40, end),
  blink-caret .75s step-end infinite;`;
const className = `flex items-center justify-left font-bold text-lg`;

const getCurrentLevel = (index) => {
  const levels = [
    {
      id: 1,
      astronautPos: createVector(100, 500),
      planets: [],
      earthPos: createVector(1000, 400),
      helper: { pos: createVector(450, 500), r: 80 },
      foods: [
        {
          pos: createVector(650, 300),
          type: "carrot",
          width: 50,
          height: 70,
        },
      ],
      orionPos: [],
      orionAppearance: [],
      cycleTime: 0,
      basketCollectables: {
        carrot: 1,
      },
      helperCollectables: {},
      instruction: `<p class="flex font-bold text-lg" style="${style}">Move your mouse to pull the basket. Collect all the foods in the basket as per recipe on top left corner.</p>`,
    },
    {
      id: 2,
      astronautPos: createVector(100, 500),
      planets: [],
      earthPos: createVector(1000, 400),
      helper: { pos: createVector(450, 500), r: 80 },
      foods: [
        {
          pos: createVector(650, 300),
          type: "eggs",
          width: 50,
          height: 70,
        },
      ],
      orionPos: [
        { pos: createVector(20, 50), rotation: 0, type: "fire" },
        { pos: createVector(1200, 150), rotation: 140, type: "water" },
        { pos: createVector(700, 700), rotation: 270, type: "fire" },
        { pos: createVector(1500, 700), rotation: 190, type: "water" },
      ],
      orionAppearance: [100, 350, 600, 850, 1000],
      cycleTime: 1000,
      basketCollectables: {
        eggs: 1,
      },
      helperCollectables: {
        fire: 2,
        water: 3,
      },
      instruction: `<p class="flex font-bold text-lg" style="${style}"> Cannot cook without fire & water? Collect spells by the alien ship.. But too much is harmful ! (Top right corner) </p>`,
    },
    {
      id: 3,
      astronautPos: createVector(100, 500),
      planets: [],
      earthPos: createVector(1000, 400),
      helper: { pos: createVector(450, 500), r: 80 },
      foods: [
        {
          pos: createVector(650, 300),
          type: "turkey",
          width: 50,
          height: 70,
        },
      ],
      orionPos: [
        { pos: createVector(20, 50), rotation: 0, type: "fire" },
        { pos: createVector(1200, 150), rotation: 140, type: "poison" },
        { pos: createVector(20, 500), rotation: 10, type: "water" },
        { pos: createVector(600, 50), rotation: 30, type: "poison" },
      ],
      orionAppearance: [100, 350, 600, 900, 1000],
      cycleTime: 1000,
      basketCollectables: {
        turkey: 1,
      },
      helperCollectables: {
        fire: 2,
        water: 1,
      },
      instruction: `<p class="flex font-bold text-lg" style="${style}"> Beware of poison spells(Green spells)! Overflow of spells are poisonous as well! </p>`,
    },
    {
      id: 4,
      astronautPos: createVector(100, 500),
      planets: [],
      earthPos: createVector(1000, 400),
      helper: { pos: createVector(450, 500), r: 80 },
      foods: [
        {
          pos: createVector(200, 150),
          type: "turkey",
          width: 60,
          height: 78,
        },
        {
          pos: createVector(650, 300),
          type: "carrot",
          width: 50,
          height: 70,
        },
        {
          pos: createVector(800, 150),
          type: "eggs",
          width: 50,
          height: 70,
        },
      ],
      orionPos: [
        { pos: createVector(1500, 700), rotation: 190, type: "fire" },
        { pos: createVector(1200, 150), rotation: 40, type: "poison" },
        { pos: createVector(20, 500), rotation: 10, type: "water" },
        { pos: createVector(700, 700), rotation: 270, type: "fire" },
        { pos: createVector(600, 50), rotation: 30, type: "poison" },
      ],
      orionAppearance: [100, 350, 600, 900, 1000, 1100],
      cycleTime: 1100,
      basketCollectables: {
        carrot: 1,
        turkey: 1,
        eggs: 1,
      },
      helperCollectables: {
        fire: 1,
        water: 1,
      },
      instruction: `<p class="flex font-bold text-lg" style="${style}">ALL Foods! Collect all the foods..</p>`,
    },
    {
      id: 5,
      astronautPos: createVector(100, 100),
      planets: [
        { pos: createVector(300, 500), type: "poisonous", r: 85 },
        { pos: createVector(550, 200), type: "", r: 95 },
        { pos: createVector(1000, 700), type: "poisonous", r: 100 },
      ],
      earthPos: createVector(1200, 150),
      helper: { pos: createVector(300, 450), r: 90 },
      foods: [
        {
          pos: createVector(200, 150),
          type: "lettuce",
          width: 35,
          height: 45,
        },
        {
          pos: createVector(600, 300),
          type: "eggs",
          width: 50,
          height: 40,
        },
        {
          pos: createVector(800, 500),
          type: "potato",
          width: 50,
          height: 40,
        },
      ],
      orionPos: [
        { pos: createVector(1500, 700), rotation: 190, type: "fire" },
        { pos: createVector(1200, 150), rotation: 40, type: "poison" },
        { pos: createVector(20, 500), rotation: 10, type: "water" },
        { pos: createVector(1500, 150), rotation: 140, type: "poison" },
        { pos: createVector(700, 700), rotation: 270, type: "fire" },
        { pos: createVector(600, 50), rotation: 30, type: "poison" },
      ],
      orionAppearance: [100, 350, 600, 900, 1000, 1200, 1300],
      cycleTime: 1300,
      basketCollectables: {
        lettuce: 1,
        eggs: 1,
        potato: 1,
      },
      helperCollectables: {
        fire: 1,
        water: 1,
      },
      instruction: `<p class="${className}" style="${style}">Avoid the poisonous planet. <span class-"inline"><img src="./assets/poison.png" width="30px"/></span></p>`,
    },
    {
      id: 6,
      astronautPos: createVector(100, 150),
      planets: [
        { pos: createVector(300, 350), type: "poisonous", r: 80 },
        { pos: createVector(600, 550), type: "", r: 80 },
        { pos: createVector(450, 170), type: "", r: 80 },
        { pos: createVector(950, 170), type: "", r: 80 },
        { pos: createVector(1000, 500), type: "poisonous", r: 60 },
      ],
      earthPos: createVector(1300, 700),
      helper: { pos: createVector(250, 250), r: 80 },
      foods: [
        {
          pos: createVector(200, 150),
          type: "turkey",
          width: 50,
          height: 60,
        },
        {
          pos: createVector(450, 300),
          type: "potato",
          width: 35,
          height: 45,
        },
        {
          pos: createVector(900, 250),
          type: "lettuce",
          width: 35,
          height: 45,
        },
        {
          pos: createVector(1300, 250),
          type: "eggs",
          width: 35,
          height: 45,
        },
      ],
      orionPos: [
        { pos: createVector(1500, 700), rotation: 190, type: "fire" },
        { pos: createVector(1200, 150), rotation: 40, type: "poison" },
        { pos: createVector(20, 500), rotation: 10, type: "water" },
        { pos: createVector(1500, 150), rotation: 140, type: "poison" },
        { pos: createVector(700, 700), rotation: 270, type: "fire" },
        { pos: createVector(600, 50), rotation: 30, type: "poison" },
      ],
      orionAppearance: [100, 350, 600, 900, 1000, 1200, 1300],
      cycleTime: 1300,
      basketCollectables: {
        lettuce: 1,
        eggs: 1,
        turkey: 1,
        potato: 1,
      },
      helperCollectables: {
        fire: 1,
      },
      instruction: `<p class="${className}" style="${style}">Best of luck!</p>`,
    },
    {
      id: 7,
      astronautPos: createVector(1000, 100),
      planets: [
        { pos: createVector(400, 400), type: "", r: 120 },
        { pos: createVector(550, 360), type: "increase", r: 70 },
        { pos: createVector(650, 250), type: "poisonous", r: 40 },
        { pos: createVector(1000, 700), type: "poisonous", r: 80 },
      ],
      earthPos: createVector(1450, 500),
      helper: { pos: createVector(450, 50), r: 80 },
      foods: [
        {
          pos: createVector(710, 220),
          type: "carrot",
          width: 40,
          height: 50,
        },
        {
          pos: createVector(260, 360),
          type: "eggs",
          width: 40,
          height: 45,
        },
        {
          pos: createVector(880, 480),
          type: "turkey",
          width: 50,
          height: 60,
        },
      ],
      orionPos: [
        { pos: createVector(1500, 700), rotation: 190, type: "fire" },
        { pos: createVector(1200, 150), rotation: 40, type: "poison" },
        { pos: createVector(20, 500), rotation: 10, type: "water" },
        { pos: createVector(1500, 150), rotation: 140, type: "poison" },
        { pos: createVector(700, 700), rotation: 270, type: "fire" },
        { pos: createVector(600, 50), rotation: 30, type: "poison" },
      ],
      orionAppearance: [100, 350, 600, 900, 1000, 1200, 1300],
      cycleTime: 1300,
      basketCollectables: {
        lettuce: 1,
        eggs: 1,
      },
      helperCollectables: {
        fire: 1,
      },
      instruction: `<p class="${className}" style="${style}">Touch the 'plus' planet to increase your gavitational pull. <span class-"inline"><img src="./assets/plus.png" width="20px"/></span></p>`,
    },
    {
      id: 8,
      astronautPos: createVector(100, 150),
      planets: [
        { pos: createVector(200, 130), type: "", r: 30 },
        { pos: createVector(400, 120), type: "", r: 50 },
        { pos: createVector(1200, 250), type: "", r: 90 },
        { pos: createVector(300, 360), type: "increase", r: 80 },
        { pos: createVector(450, 520), type: "poisonous", r: 40 },
        { pos: createVector(450, 280), type: "poisonous", r: 40 },
      ],
      earthPos: createVector(1300, 700),
      helper: { pos: createVector(450, 50), r: 80 },
      foods: [
        {
          pos: createVector(200, 300),
          type: "lettuce",
          width: 30,
          height: 40,
        },
        {
          pos: createVector(450, 400),
          type: "broccoli",
          width: 35,
          height: 45,
        },
        {
          pos: createVector(800, 520),
          type: "eggs",
          width: 45,
          height: 55,
        },
      ],
      orionPos: [
        { pos: createVector(1500, 700), rotation: 190, type: "fire" },
        { pos: createVector(1200, 150), rotation: 40, type: "poison" },
        { pos: createVector(20, 500), rotation: 10, type: "water" },
        { pos: createVector(1500, 150), rotation: 140, type: "poison" },
        { pos: createVector(700, 700), rotation: 270, type: "fire" },
        { pos: createVector(600, 50), rotation: 30, type: "poison" },
      ],
      orionAppearance: [100, 350, 600, 900, 1000, 1200, 1300],
      cycleTime: 1300,
      basketCollectables: {
        lettuce: 1,
        broccoli: 1,
        eggs: 1,
      },
      helperCollectables: {
        fire: 1,
      },
      instruction: `<p class="${className}" style="${style}">Best of luck</p>`,
    },
    // {
    //   id: 9,
    //   astronautPos: createVector(100, 250),
    //   planets: [
    //     { pos: createVector(200, 150), type: "", r: 60 },
    //     { pos: createVector(300, 50), type: "", r: 70 },
    //     { pos: createVector(800, 300), type: "", r: 90 },
    //     { pos: createVector(300, 500), type: "", r: 40 },
    //     { pos: createVector(200, 400), type: "", r: 50 },
    //     { pos: createVector(300, 200), type: "", r: 40 },
    //     { pos: createVector(900, 400), type: "poisonous", r: 40 },
    //     { pos: createVector(500, 450), type: "poisonous", r: 80 },
    //     { pos: createVector(600, 250), type: "increase", r: 60 },
    //   ],
    //   earthPos: createVector(1000, 500),
    //   helper: { pos: createVector(450, 50), r: 80 },
    //   foods: [
    //     {
    //       pos: createVector(300, 300),
    //       type: "turkey",
    //       width: 50,
    //       height: 60,
    //     },
    //     {
    //       pos: createVector(630, 350),
    //       type: "eggs",
    //       width: 50,
    //       height: 60,
    //     },
    //     {
    //       pos: createVector(830, 400),
    //       type: "carrot",
    //       width: 50,
    //       height: 60,
    //     },
    //   ],
    //   orionPos: [
    //     { pos: createVector(1500, 700), rotation: 190, type: "fire" },
    //     { pos: createVector(1200, 150), rotation: 40, type: "poison" },
    //     { pos: createVector(20, 500), rotation: 10, type: "water" },
    //     { pos: createVector(1500, 150), rotation: 140, type: "poison" },
    //     { pos: createVector(700, 700), rotation: 270, type: "fire" },
    //     { pos: createVector(600, 50), rotation: 30, type: "poison" },
    //   ],
    //   orionAppearance: [100, 350, 600, 900, 1000, 1200, 1300],
    //   cycleTime: 1300,
    //   basketCollectables: {
    //     lettuce: 1,
    //     eggs: 1,
    //   },
    //   helperCollectables: {
    //     fire: 1,
    //   },
    //   instruction: `<p class="${className}" style="${style}">Remember, the bigger is not always the better.</p>`,
    // },
    {
      id: 9,
      astronautPos: createVector(20, 230),
      planets: [
        { pos: createVector(50, 170), type: "poisonous", r: 50 },
        { pos: createVector(50, 350), type: "poisonous", r: 50 },
        { pos: createVector(120, 360), type: "poisonous", r: 50 },
        { pos: createVector(130, 175), type: "poisonous", r: 30 },
        { pos: createVector(200, 150), type: "poisonous", r: 55 },
        { pos: createVector(200, 380), type: "poisonous", r: 50 },
        { pos: createVector(335, 170), type: "poisonous", r: 50 },
        { pos: createVector(350, 460), type: "poisonous", r: 50 },

        { pos: createVector(400, 170), type: "poisonous", r: 50 },
        { pos: createVector(400, 440), type: "poisonous", r: 50 },

        { pos: createVector(480, 190), type: "poisonous", r: 50 },

        { pos: createVector(600, 220), type: "", r: 80 },
        { pos: createVector(700, 105), type: "", r: 100 },

        { pos: createVector(500, 140), type: "decrease", r: 40 },
        { pos: createVector(100, 540), type: "increase", r: 65 },
      ],
      earthPos: createVector(1000, 530),
      helper: { pos: createVector(300, 80), r: 87 },
      foods: [
        {
          pos: createVector(200, 190),
          type: "turkey",
          width: 50,
          height: 60,
        },
        {
          pos: createVector(300, 230),
          type: "broccoli",
          width: 40,
          height: 50,
        },
      ],
      orionPos: [
        { pos: createVector(1500, 700), rotation: 190, type: "fire" },
        { pos: createVector(1200, 150), rotation: 40, type: "poison" },
        { pos: createVector(20, 500), rotation: 10, type: "water" },
        { pos: createVector(1500, 150), rotation: 140, type: "poison" },
        { pos: createVector(700, 700), rotation: 270, type: "fire" },
        { pos: createVector(600, 50), rotation: 30, type: "poison" },
      ],
      orionAppearance: [100, 350, 600, 900, 1000, 1200, 1300],
      cycleTime: 1300,
      basketCollectables: {
        turkey: 1,
        broccoli: 1,
      },
      helperCollectables: {
        fire: 1,
        water: 1,

      },
      instruction: `<p class="${className}" style="${style}"> Hint: Using (-) planet decrease your size, get out of the poison zone, get bigger using (+) and control the foods.  </p>`,
    },
  ];

  return levels[index];
};
