const drawBall = (gameBoard, ballPos, dx, dy) => {
    const canvas = gameBoard.current;
    const ctx = canvas.getContext("2d");

    let currX = ballPos.x;
    let currY = ballPos.y;
    currX += dx;
    currY += dy;
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(currX, currY, 10, 0, Math.PI * 2, true);
    ctx.fill();
}

const clearCanvas = (gameBoard) => {
    const canvas = gameBoard.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawBoard = (gameBoard, defaultCanvasWidth, defaultCanvasHeight) => {
    // Create the canvas
    const canvas = gameBoard.current;
    // Set canvas size
    canvas.width = defaultCanvasWidth;
    canvas.height = defaultCanvasHeight;
    const ctx = canvas.getContext("2d");

    // Enable antialiasing
    ctx.imageSmoothingEnabled = true;

    // Draw background
    ctx.fillStyle = "#001F3F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw net
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFCC00";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    const players = [
        { name: "Player 1", score: 0 },
        { name: "Player 2", score: 0 },
    ];

    // Draw player names and scores
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText(players[0].name + ": " + players[0].score, 10, 30);
    ctx.textAlign = "right";
    ctx.fillText(players[1].name + ": " + players[1].score, canvas.width - 10, 30);

}

const drawPaddles = (gameBoard, leftPaddlePos, rightPaddlePos) => {
    const canvas = gameBoard.current;
    const ctx = canvas.getContext("2d");
    // Draw paddles
    const paddleWidth = 10;
    const paddleHeight = 80;
    const borderRadius = 10;

    ctx.fillStyle = "#00FF00";
    // Left paddle
    ctx.beginPath();
    ctx.moveTo(10, leftPaddlePos - paddleHeight / 2 + borderRadius);
    ctx.arcTo(10, leftPaddlePos - paddleHeight / 2, 10 + borderRadius, leftPaddlePos - paddleHeight / 2, borderRadius);
    ctx.lineTo(10 + paddleWidth, leftPaddlePos - paddleHeight / 2);
    ctx.arcTo(10 + paddleWidth, leftPaddlePos - paddleHeight / 2, 10 + paddleWidth, leftPaddlePos, borderRadius);
    ctx.lineTo(10 + paddleWidth, leftPaddlePos);
    ctx.arcTo(10 + paddleWidth, leftPaddlePos + paddleHeight / 2, 10 + paddleWidth - borderRadius, leftPaddlePos + paddleHeight / 2, borderRadius);
    ctx.lineTo(10, leftPaddlePos + paddleHeight / 2 - borderRadius);
    ctx.arcTo(10, leftPaddlePos + paddleHeight / 2, 10, leftPaddlePos + paddleHeight / 2 - borderRadius, borderRadius);
    ctx.closePath();
    ctx.fill();


    // Right paddle
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10 - paddleWidth, rightPaddlePos - paddleHeight / 2 + borderRadius);
    ctx.arcTo(canvas.width - 10 - paddleWidth, rightPaddlePos - paddleHeight / 2, canvas.width - 10, rightPaddlePos - paddleHeight / 2, borderRadius);
    ctx.lineTo(canvas.width - 10, rightPaddlePos - paddleHeight / 2);
    ctx.arcTo(canvas.width - 10, rightPaddlePos + paddleHeight / 2, canvas.width - 10 - paddleWidth,rightPaddlePos + paddleHeight / 2, borderRadius);
    ctx.lineTo(canvas.width - 10 - paddleWidth,rightPaddlePos + paddleHeight / 2);
    ctx.arcTo(canvas.width - 10 - paddleWidth, rightPaddlePos + paddleHeight / 2, canvas.width - 10 - paddleWidth, rightPaddlePos - paddleHeight / 2, borderRadius);
    ctx.lineTo(canvas.width - 10 - paddleWidth, rightPaddlePos - paddleHeight / 2);
    ctx.arcTo(canvas.width - 10 - paddleWidth, rightPaddlePos - paddleHeight / 2, canvas.width - 10, rightPaddlePos - paddleHeight / 2, borderRadius);
    ctx.closePath();
    ctx.fill();
}

const detectCollision = (ballPos, canvasHeight, dy, setDy) => {
    if (ballPos.y - 10 + dy < 0 || ballPos.y + 10 + dy > canvasHeight) {
        // return -dy;
        setDy(prevVal => -prevVal)
    }
    // return dy
}

const detectPaddleCollision = (ballPos, canvasWidth, canvasHeight, dx, setDx, setBallSpeed) => {
    if(ballPos.x + -10 + dx < 10+10 && (ballPos.y >= canvasHeight / 2 - 10 / 2 && ballPos.y <= canvasHeight / 2 + 80 / 2)  )
        {setDx(prevVal => -prevVal);
        setBallSpeed(prevVal => {
            if(prevVal === 1)
                return prevVal;
            return prevVal-1;
        })}
    // return dy
}


const detectFailure = (ballPos, canvasWidth, dx, setDx) => {
    if (ballPos.x - 10 + dx < 0 || ballPos.x + 10 + dx > canvasWidth) {
        // return -dy;
        setDx(prevVal => -prevVal)
    }
    // return dy
}

export {
    drawBall,
    drawPaddles,
    drawBoard,
    clearCanvas,
    detectCollision,
    detectPaddleCollision,
    detectFailure
}