/* Buttons */
const upBtn = document.querySelector(".upBtn")
const downBtn = document.querySelector(".downBtn")
const leftBtn = document.querySelector(".leftBtn")
const rightBtn = document.querySelector(".rightBtn")
const restBtn = document.querySelector(".restBtn")
const fightBtn = document.querySelector(".fightBtn")
const fast1Btn = document.querySelector(".fast-1-Btn")
const fast2Btn = document.querySelector(".fast-2-Btn")
const resursBtn = document.querySelector(".resursBtn")

/* Results */
const characterName = document.querySelector(".character")
const xpos = document.querySelector(".x-position")
const ypos = document.querySelector(".y-position")
const coolEl = document.querySelector(".coolDown")
const hpEl = document.querySelector(".hp")

//Use node index.js in the terminal for execute the script.
//Warning: Firefox does not fully support the editor. Please use a chromimum-based web browser such as Chrome, Brave or Edge.
//This script is a basic example of a player's movement. You can load other examples by clicking on "Load example".
const server = "https://api.artifactsmmo.com";

//Your token is automatically set
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZlbmRlbGFub3JpbmRlckBob3RtYWlsLnNlIiwicGFzc3dvcmRfY2hhbmdlZCI6IiJ9.W2t8AIJ_tDwYl01Qv-R8W_RJG_csNyKqiZ9ReTqtwK4";

//Put your character name here
const character = "Jinx";

/*globala variables */
let x = 0
let y = 0
let coolDownTimer = 5

/* eventlisteners */
upBtn.addEventListener("click",()  => {
    console.log("up")
    movement(x, (y - 1))
})
downBtn.addEventListener("click",()  => {
    console.log("down")
    movement(x, (y + 1))
})
rightBtn.addEventListener("click",()  => {
    console.log("right")
    movement((x + 1), y)
})
leftBtn.addEventListener("click",()  => {
    console.log("left")
    movement((x - 1), y)
})
fast1Btn.addEventListener("click",()  => {
    console.log("Byggnad 1")
    moveToBuildingOne()
})
fast2Btn.addEventListener("click",()  => {
    console.log("Byggnad 1")
    moveToBuildingTwo()
})
restBtn.addEventListener("click", rest)
fightBtn.addEventListener("click", fight)
resursBtn.addEventListener("click", resource)

 /* characterdata */
async function getCharacter() {
    const url = server + "/characters/" + character

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const hp = data.data.hp

         x = data.data.x
         y = data.data.y 

         
          hpEl.innerText = "Ditt hp är: " + hp
          

         characterName.innerText = "Player: " + character
         xpos.innerText = "Din x position är: " + x
         ypos.innerText = "Din y position är: " + y
         console.log("xpos element:", xpos);
         console.log("ypos element:", ypos);
  
    } catch (error) {
      console.log(error);
    }
    console.log("Gotten all characterdata")
}
getCharacter()

/* Movement function */
async function movement(gotoX, gotoY) {
      
  const url = server + '/my/' + character +'/action/move'

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: `{"x":${gotoX},"y":${gotoY}}` 
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data)

    console.log(`x: ${data.data.character.x}, y: ${data.data.character.y}`);

    x = data.data.destination.x
    y = data.data.destination.y
    coolDownTimer = data.data.cooldown.remaining_seconds

    xpos.innerText = data.data.character.x
    ypos.innerText = data.data.character.y 


    if(coolDownTimer > 0) {
        coolDown()
    }

  } catch (error) {
    console.log(error);
  }
}

/* Function resting */
async function rest() {
      
    const url = server + '/my/' + character +'/action/rest'
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
    
      console.log(data)
  
      coolDownTimer = data.data.cooldown.remaining_seconds
  
      if(coolDownTimer > 0) {
          coolDown()
      }
  
    } catch (error) {
      console.log(error);
    }
    }

/* Function fighting */
async function fight() {
      
    const url = server + '/my/' + character +'/action/fight'
      
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
        },
    };
      
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        console.log(data)
      
        coolDownTimer = data.data.cooldown.remaining_seconds
      
        if(coolDownTimer > 0) {
            coolDown()
        }
      
    } catch (error) {
        console.log(error);
    }
}

/* Function Gathering */
async function resource() {
      
    const url = server + '/my/' + character +'/action/gathering'
      
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
        },
    };
      
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        console.log(data)
      
        coolDownTimer = data.data.cooldown.remaining_seconds
      
        if(coolDownTimer > 0) {
            coolDown()
        }
      
    } catch (error) {
        console.log(error);
    }
}

 /* Function for moving to biulding 1 */
 async function moveToBuildingOne() {
      
    const url = server + '/my/' + character +'/action/move'
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: `{"x": 1,"y": 1}` 
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      console.log(data)
  
      console.log(`x: ${data.data.character.x}, y: ${data.data.character.y}`);
  
      x = data.data.destination.x
      y = data.data.destination.y
      coolDownTimer = data.data.cooldown.remaining_seconds
  
      xpos.innerText = data.data.character.x
      ypos.innerText = data.data.character.y 
  
  
      if(coolDownTimer > 0) {
          coolDown()
      }
  
    } catch (error) {
      console.log(error);
    }
}

 /* Function for moving to biulding 2 */
async function moveToBuildingTwo() {
      
    const url = server + '/my/' + character +'/action/move'
      
    const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: `{"x": 2,"y": 3}` 
        };
      
    try {
        const response = await fetch(url, options);
        const data = await response.json();
      
        console.log(data)
      
        console.log(`x: ${data.data.character.x}, y: ${data.data.character.y}`);
      
        x = data.data.destination.x
        y = data.data.destination.y
        coolDownTimer = data.data.cooldown.remaining_seconds
      
        xpos.innerText = data.data.character.x
        ypos.innerText = data.data.character.y 
      
      
        if(coolDownTimer > 0) {
            coolDown()
        }
      
    } catch (error) {
          console.log(error);
    }
}

/* Function for cooldown timer */
function coolDown() {
    coolEl.innerText = `Cooldown timer: ${coolDownTimer}`
    if(coolDownTimer > 0) {
        setTimeout(coolDown, 1000)
        coolDownTimer --
        console.log(coolDownTimer)
    }
    else {
        console.log("cooldown complete")
        }
}
  
