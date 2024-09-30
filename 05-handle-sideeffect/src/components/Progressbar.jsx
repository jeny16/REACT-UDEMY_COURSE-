import React, { useEffect } from 'react'

function Progressbar() {

    const [remainingTime, setRemainingTime] = useState(3000);
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 10);
        }, 10);

        return () => {
            clearInterval(interval);
        }
    }, []);
    return (
        <div>        
            <progress value={remainingTime} max={TIMER} />
        </div>
    )
}

export default Progressbar