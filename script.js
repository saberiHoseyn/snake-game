

const gameCanvas = document.querySelector("#game-convas");
const ctx = gameCanvas.getContext("2d");


ctx.fillStyle = 'white';
ctx.strokeStyle = 'blue'

ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height);
ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height);

let snake = [
    { x : 150 , y : 150 },
    { x : 140 , y : 150 },
    { x : 130 , y : 150 },
    { x : 120 , y : 150 },
    { x : 110 , y : 150 }
];

let foodX;
let foodY;
createSnake();

createFood();




function createSnake(){
    snake.forEach(snakePart => {
        ctx.fillStyle = 'lightgreen';
        ctx.strokeStyle = 'black';
    
        ctx.fillRect(snakePart.x , snakePart.y , 10 , 10);
        ctx.strokeRect(snakePart.x , snakePart.y , 10 , 10);
    });
};

function createFood(){
    randomNumber = (max , min)=> Math.round((Math.random()*(max - min)+min)/10)*10; 

    foodX = randomNumber(gameCanvas.height - 10 , 0);
    foodY = randomNumber(gameCanvas.height - 10 , 0);

    snake.forEach(snakePart => {
        if(foodX === snakePart.x && foodY === snakePart.y){
            createFood()
        }
    });

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';

    ctx.fillRect(foodX , foodY , 10 , 10);
    ctx.strokeRect(foodX , foodY , 10 , 10);
};




