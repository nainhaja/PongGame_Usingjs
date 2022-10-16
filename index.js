import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player_paddle"));
const computerPaddle = new Paddle(document.getElementById("computer_paddle"));
const playerScoreElem = document.getElementById("player_score")
const computerScoreElem = document.getElementById("computer_score")

let lastTime

function update(time) {
    if (lastTime != null)
    {
        const delta = time - lastTime
        
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        if (isLose()) {
            handleLose()
        }
        
    }
    lastTime = time
    window.requestAnimationFrame(update)  
}

function isLose() 
{
    const rect = ball.rect()
    return (rect.right >= window.innerWidth || rect.left <= 0)
}

function handleLose(){
    const rect = ball.rect()

    if (rect.right >= window.innerWidth)
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    else 
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)