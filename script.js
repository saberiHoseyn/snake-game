

const gameCanvas = document.querySelector("#game-convas");
const ctx = gameCanvas.getContext("2d");
const elScore = document.querySelector(".game-body .score");

document.addEventListener("keydown" , (event)=> chengeDirection(event))

let snake = [
    { x : 150 , y : 150 },
    { x : 140 , y : 150 },
    { x : 130 , y : 150 },
    { x : 120 , y : 150 },
    { x : 110 , y : 150 }
];

let foodX;
let foodY;
let dx = 10;
let dy = 0;
let chengingDirection = false;
let score = 0;

elScore.innerHTML = score;
createLocationFoodRandom();
main();


















function createCanvas() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'blue'

    ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height);
    ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height);
}

function createSnake(){
    snake.forEach(snakePart => {
        ctx.fillStyle = 'lightgreen';
        ctx.strokeStyle = 'black';
    
        ctx.fillRect(snakePart.x , snakePart.y , 10 , 10);
        ctx.strokeRect(snakePart.x , snakePart.y , 10 , 10);
    });
};

function createLocationFoodRandom(){
    randomNumber = (max , min)=> Math.round((Math.random()*(max - min)+min)/10)*10; 

    foodX = randomNumber(gameCanvas.height - 10 , 0);
    foodY = randomNumber(gameCanvas.height - 10 , 0);

    snake.forEach(snakePart => {
        if(foodX === snakePart.x && foodY === snakePart.y){
            createLocationFoodRandom();
        };
    });
};

function drawFood() {
    
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';

    ctx.fillRect(foodX , foodY , 10 , 10);
    ctx.strokeRect(foodX , foodY , 10 , 10);
}

function advanceSnake() {   
    const head = { x : (snake[0].x + dx) , y : (snake[0].y + dy)}
    
    if(head.x === foodX && head.y === foodY){
        score += 10;
        elScore.innerHTML = score;
        createLocationFoodRandom();

    }else{
        snake.pop();
    }
    snake.unshift(head);

    createCanvas();
    drawFood();
    createSnake();
};

function main() {
    setTimeout( ()=>{[chengingDirection = false , advanceSnake() , main()]},200)
};

function chengeDirection(event) {
    const keyPressed = event.keyCode;
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;

    if(chengingDirection) return;
    
    chengingDirection = true;

    if( keyPressed === leftKey && dx !== 10 ){
        dx = -10;
        dy = 0;
    }

    if( keyPressed === rightKey && dx !== -10 ){
        dx = 10;
        dy = 0;
    }

    if( keyPressed === upKey && dy !== 10 ){
        dx = 0;
        dy = -10;
    }
    
    if( keyPressed === downKey && dy !== -10 ){
        dx = 0;
        dy = 10;
    }
}




