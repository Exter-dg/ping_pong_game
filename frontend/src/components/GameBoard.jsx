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
    const [moveLeftPaddle, setMoveLeftPaddle] = useState(0);

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
            console.log("keydown", e.key)
            if(e.key === "ArrowDown")
                // setLeftPaddlePos(prevVal => prevVal+20);
                setMoveLeftPaddle(1);
            else if(e.key === "ArrowUp")
                // setLeftPaddlePos(prevVal => prevVal-20);
                setMoveLeftPaddle(-1);
        }

        const handleKeyUp = (e) => {
            e.preventDefault();
            console.log("keyup")
            console.log(e.key);
            if(e.key === "ArrowDown" || e.key === "ArrowUp")
                // setLeftPaddlePos(prevVal => prevVal+20);
                setMoveLeftPaddle(0);
            
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);

        }
    }, [])

    useEffect(() => {
        if(moveLeftPaddle === 0) return;

        const handleMoveUp = () => {
            console.log("Moving up");
            setLeftPaddlePos(prevVal => Math.min(prevVal+3, defaultCanvasHeight-40));
        }

        let interval1, interval2;

        const handleMoveDown = () => {
            setLeftPaddlePos(prevVal =>  Math.max(prevVal-3, 40));
        }

        if(moveLeftPaddle === 1)
        interval1 = setInterval(() => {
            handleMoveUp();
        }, 10);
            
        if(moveLeftPaddle === -1) {
            interval2 = setInterval(() => {
                handleMoveDown();
            }, 10);
        }


        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        }

    }, [moveLeftPaddle])

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
