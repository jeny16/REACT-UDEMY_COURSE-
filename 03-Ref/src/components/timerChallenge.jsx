import { useState, useRef } from "react";
import ResultModal from "./resultModal";

export default function TimerChallenge({ title, targetTime }) {

    const timer = useRef();
    const dialog = useRef();
    
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if(remainingTime <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setRemainingTime(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setRemainingTime(prevTimeRemaining => prevTimeRemaining - 10 );
        }, 10);
    }

    function handleStop() { {
        dialog.current.open();
        clearInterval(timer.current);
        }
    }

    return (
        <>
 
            <ResultModal 
            ref={dialog} 
            targetTime={targetTime} 
            timeRemaining={remainingTime} 
            onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                {timerIsActive && <p>you lost!</p>}
                <p className="challenge-time">
                    {targetTime} second {targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "STOP" : "START"} CHALLAENGE
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "time is running" : "timer is active"}
                </p>
            </section>
        </>
    );
}
