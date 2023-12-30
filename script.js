let blocks = document.querySelectorAll(".area");

let snake = [[0,3],[0,2],[0,1]];

let current = 24;
let currentXY = [4,2];
function goUp() {
    len = snake.length;
    let lastValue = snake[len-1];
    newValue = [lastValue[0],lastValue[1]]
    if (newValue[1] == 0){
        newValue[1] = 9
    } else {
        newValue[1] = (newValue[1]-1)
    };
    snake.push(newValue);
    if (newValue[0] == currentXY[0] && newValue[1] == currentXY[1]){
       addApple() 
    } else {
        snake.shift();
    }
    drawSnake()
    checkSnake()
}
function goDown() {
    len = snake.length;
    let lastValue = snake[len-1];
    newValue = [lastValue[0],lastValue[1]]
    if (newValue[1] == 9){
        newValue[1] = 0
    } else {
        newValue[1]= (newValue[1]+1)
    };
    snake.push(newValue);
    if (newValue[0] == currentXY[0] && newValue[1] == currentXY[1]){
       addApple() 
    } else {
        snake.shift();
    }
    drawSnake()
    checkSnake()
}
function goLeft() {
    len = snake.length;
    let lastValue = snake[len-1];
    newValue = [lastValue[0],lastValue[1]]
    if (newValue[0] == 0){
        newValue[0] = 9
    } else {
        newValue[0]= (newValue[0]-1)
    };
    snake.push(newValue);
    if (newValue[0] == currentXY[0] && newValue[1] == currentXY[1]){
       addApple() 
    } else {
        snake.shift();
    }
    drawSnake()
    checkSnake()
}
function goRight() {
    len = snake.length;
    let lastValue = snake[len-1];
    newValue = [lastValue[0],lastValue[1]]
    if (newValue[0] == 9){
        newValue[0] = 0
    } else {
        newValue[0]= (newValue[0]+1)
    };
    snake.push(newValue);
    if (newValue[0] == currentXY[0] && newValue[1] == currentXY[1]){
       addApple() 
    } else {
        snake.shift();
    }
    drawSnake()
    checkSnake()
}
function drawSnake(){
    blocks.forEach((el)=>{
        el.style.background = 'green';
    })
    blocks[current].style.background = 'blue'
    snake.forEach((target) => {
        let targetBlock = target[0]+target[1]*10
        blocks[targetBlock].style.background = 'red';
    });
}
function checkSnake(){
    let len = snake.length
    let k
    for(let i = 0; i < len; i++){
        k = 0
        for(let j = 0; j < len; j++){
            if (snake[i][0] == snake[j][0] && snake[i][1] == snake[j][1]){
                k+=1
            }
        }
        console.log(k)
        if (k > 1){
            location.reload(true)
            alert('You ate yourself')
            break;
        }
    }
}
function game() {
    let interval = setInterval(goRight,500);
    window.addEventListener("keydown", function(e) {
        clearInterval(interval)
        if (e.key == "ArrowRight") {
            interval = setInterval(goRight,500);
        } else if (e.key == "ArrowLeft") {
            interval = setInterval(goLeft,500);
        } else if (e.key == "ArrowUp") {   
            interval = setInterval(goUp,500);
        } else if (e.key == "ArrowDown") {  
            interval = setInterval(goDown, 500);
        }
});
}

let start_button = document.querySelector('button')
start_button.addEventListener('click', game)

function addApple(){
    let applePositionX = Math.floor(Math.random()*9);
    let applePositionY = Math.floor(Math.random()*9);
    let applePosition = [applePositionX,applePositionY];
    let num = applePositionX + 10*applePositionY
    snake.forEach(el => {
        if (el[0] == applePosition[0] && el[1] == applePosition[1]){
        } else {
            addApple()
            return
        }
        blocks[num].style.background = 'blue';
        current = num
        currentXY = applePosition
    })
}
