import React, { useState, useEffect } from "react";

function Timer({ setSeconds, seconds }) {
    const [isActive, setIsActive] = useState(true);

    // useEffect(() => {
    //     setIsActive(true);
    // }, []);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
    };

    return (
        <div className="text-cyan-400 font-nunito text-xs">
            <p>Time: {seconds} s</p>
            <p>Best: 0 s</p>
            {/* <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
            <button onClick={resetTimer}>Reset</button> */}
        </div>
    );
}

export default Timer;
