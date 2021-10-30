

const gameCanvas = document.querySelector("#game-convas");
const ctx = gameCanvas.getContext("2d");



let snake = [
    { x : 150 , y : 150 },
    { x : 140 , y : 150 },
    { x : 130 , y : 150 },
    { x : 120 , y : 150 },
    { x : 110 , y : 150 }
];

let foodX;
let foodY;


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
            createFood();
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
    const head = { x : (snake[0].x +10) , y : snake[0].y}
    
    snake.unshift(head);
    snake.pop();
    createCanvas();
    drawFood();
    createSnake();
};

function main() {
    setTimeout( ()=>{[advanceSnake(),main()]},100)
};




