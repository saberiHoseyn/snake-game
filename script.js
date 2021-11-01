
//Select canvas tag and context property "2D" for playground design
const gameCanvas = document.querySelector("#game-convas");
const ctx = gameCanvas.getContext("2d");

//Select the container of the game score
const elScore = document.querySelector(".game-body .score");


//The initial place for the snake body in the start
let snake = [
    { x : 150 , y : 150 },
    { x : 140 , y : 150 },
    { x : 130 , y : 150 },
    { x : 120 , y : 150 },
    { x : 110 , y : 150 }
];

//Define const number for the position x and y of food
let foodX;
let foodY;

//defined variable for changing direction x and y heads snake
let dx = 10;
let dy = 0;

//The Boolean variable "change direction" with an "false" default value
// is used to control the change direction of the snake's head
// with the arrowkeys only once per cycle.
// after click arrowkey, the variable in function "chengeDirection" will "true"
// and in per cycle by calling function "main" on setTimeout the variable will "false" again.
let chengingDirection = false;


let score = 0;
elScore.innerHTML = score;


document.addEventListener("keydown" , (event)=> chengeDirection(event));




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

//Rules set for using the arrowkeys to change the direction of the snake move
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

function didGameEnd() {
    
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitUpWall = snake[0].y < 0;
    const hitDownWall = snake[0].y > gameCanvas.height - 10;
    
    for (let i = 1; i < snake.length; i++){
        if( snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    };
    if (hitLeftWall || hitRightWall || hitUpWall || hitDownWall) return true;
    return false;
}


//sets Time out for continue if reply "didGameEnd" is false, otherwise prevents it from continue.
function main() {

    if(didGameEnd()) return;
    setTimeout( ()=>{[
        chengingDirection = false,
        advanceSnake(),
        main()
    ]}        , 100 )
};