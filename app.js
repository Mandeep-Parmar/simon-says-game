let gameSequence = [];
let userSequence = [];
let colors = ["green", "red", "yellow", "blue"];

let level = 0;
let started = false;
let highScore = 0;

let center = document.querySelector(".center");
let instruction = document.querySelector(".instruction");
let highScoreText = document.querySelector("#high-score")

center.addEventListener("click", function(){
    if (!started){
        started = true;
        levelUp();
    }
});

function buttonFlash(btn){
    btn.classList.add("flash");

    setTimeout( function() {
        btn.classList.remove("flash");
    }, 500);
}

// Lock user input during system flash
// without this, user can click buttons while the system is flashing. (3 changes)
let acceptingInput = false;

function levelUp(){
    userSequence = []; // reset user input for new level
    acceptingInput = false;

    level++;
    center.innerText = `Level ${level}`;
    instruction.innerText = ""; // hide after start

    let randomIdx = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomIdx];

    let randomButton = document.querySelector(`.${randomColor}`);

    gameSequence.push(randomColor);

    // system flash
    setTimeout(() => {
        buttonFlash(randomButton);
        acceptingInput = true;
    }, 500);
}

function checkAns(i){
    if(userSequence[i] === gameSequence[i]){
        if(userSequence.length === gameSequence.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";
        }, 150);
        setTimeout(reset, 500); //Allows user to see mistake
    }
}

function buttonPress(){
    if (!started || !acceptingInput) return; // ignore clicks before game starts

    let btn = this;
    buttonFlash(btn);

    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    let currentIdx = userSequence.length - 1;
    checkAns(currentIdx);
}

let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click", buttonPress);
}

function reset(){
    let score = level - 1;

    if(score > highScore){
        highScore = score;
        highScoreText.innerText = `High Score: ${highScore}`;
    }

    center.innerHTML = `
        <div style="font-size: 1.1rem; font-weight: 600;">Game Over</div>
        <div style="font-size: 0.95rem; opacity: 0.85;">Score: ${score}</div>
        <div style="font-size: 0.8rem; opacity: 0.6;">Tap to Restart</div>
    `;
    instruction.innerText = "Press center to start the game."

    gameSequence = [];
    userSequence = [];
    started = false;
    acceptingInput = false;
    level = 0;

}
