import { useEffect, useRef, useState } from 'react'
import "./GameBoard.css"
import { clearCanvas, detectCollision, detectFailure, detectPaddleCollision, drawBall, drawBoard, drawPaddles } from '../utils/helper';


// ------------------- Game Defaults -------------------------
const defaultCanvasHeight = 400;
const defaultCanvasWidth = 800;

const defaultBallPos = {
    y: defaultCanvasHeight / 2,
    x: defaultCanvasWidth / 2
}

const defaultDX = 2;
const defaultDY = -2;

export default function GameBoard() {
    const gameBoard = useRef();
    const [ballPos, setBallPos] = useState({ ...defaultBallPos });
    const [dy, setDy] = useState(defaultDY);
    const [dx, setDx] = useState(defaultDX);
    const [ballSpeed, setBallSpeed] = useState(20);
    const [leftPaddlePos, setLeftPaddlePos] = useState(defaultCanvasHeight/2);
    const [rightPaddlePos, setRightPaddlePos] = useState(defaultCanvasHeight/2);

    useEffect(() => {
        const interval = setInterval(() => {
            setBallPos((prevVal) => {
                return {
                    x: prevVal.x + dx,
                    y: prevVal.y + dy
                }
            });
        }, ballSpeed);

        return () => {
            clearInterval(interval);
        }
    }, [ballSpeed, dx, dy])

    useEffect(() => {
        const handleKeyDown = (e) => {
            e.preventDefault();
            console.log("keydown")
            if(e.key === "ArrowDown")
                setLeftPaddlePos(prevVal => prevVal+20);
            else if(e.key === "ArrowUp")
                setLeftPaddlePos(prevVal => prevVal-20);
        }


        window.addEventListener('keydown', handleKeyDown);


        return () => {
            window.removeEventListener('keydown', handleKeyDown);

        }
    }, [])

    // Update the game board
    useEffect(() => {
        clearCanvas(gameBoard);
        // ! Does updating state outside useEffect trigger immediate rerender?
        // ! If yes, does it cause any issues here?
        detectPaddleCollision(ballPos, defaultCanvasWidth, defaultCanvasHeight, dx, setDx, setBallSpeed)
        detectFailure(ballPos, defaultCanvasWidth, dx, setDx);
        detectCollision(ballPos, defaultCanvasHeight, dy, setDy);
        // setDy(newDy);
        drawBoard(gameBoard, defaultCanvasWidth, defaultCanvasHeight);
        drawBall(gameBoard, ballPos, dx, dy);
        drawPaddles(gameBoard, leftPaddlePos, rightPaddlePos);
    }, [ballPos, dx, dy, leftPaddlePos, rightPaddlePos]);




    return (
        <div className="canvasParent">
            <canvas ref={gameBoard} id="myCanvas" width="480" height="320"></canvas>
        </div>
    )
}
