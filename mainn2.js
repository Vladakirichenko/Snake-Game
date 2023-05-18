const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const foodImg = new Image();
foodImg.src = 'img/food.png'

let score = 0;
let box = 32;

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}


let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}

const foodApearing = (food, arrSnake) => {
    for (let i = 0; i < arrSnake.length; i++) {
        if (food.x !== arrSnake[i].x && food.y !== arrSnake[i].y) {
          food = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box
            }
        }
    }
}

foodApearing(food, snake)


let dir;
const direction = (e) => {
    if (e.keyCode == 37 && dir != 'right') {
        dir = 'left'
    } else if (e.keyCode == 38 && dir != 'down') {
        dir = 'up'
    } else if (e.keyCode == 39 && dir != 'left') {
        dir = 'right'
    } else if (e.keyCode == 40 && dir != 'up') {
        dir = 'down'
    }
}

document.addEventListener('keydown', direction)

const eatTail = (head, arrSnake) => {
    for (let i = 0; i < arrSnake.length; i++) {
        if (head.x == arrSnake[i].x && head.y == arrSnake[i].y) {
            clearInterval(game);
            setTimeout(() => {
                document.location.assign('./index.html')
            }, 500)
        }
    }
}

const drawGame = () => {
    ctx.fillStyle = '#f2d291'
    ctx.fillRect(0, 0, 608, 608)

    ctx.drawImage(foodImg, food.x, food.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'blue' : 'yellow'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = 'white'
    ctx.font = '50px Arial'
    ctx.fillText(score, 80, 55)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX < box || snakeX > box * 17 || snakeY > box * 17 || snakeY < box * 3 ) {
        clearInterval(game);
        setTimeout(() => {
            document.location.assign('./index.html')
        }, 500 )
    }

    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    if (snakeX == food.x && snakeY == food.y) {
        score ++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        }
    } else {
        snake.pop()
    }
    eatTail(newHead, snake)
    snake.unshift(newHead)
}

let game = setInterval(drawGame, 100)
