import { useEffect, useState } from "react"
import './App.css'

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.seconds);
    const [minutes, setMinutes] = useState(props.minutes);
    const [gatherSeconds, setGSeconds] = useState(props.seconds);
    const [gatherMinutes, setGMinutes] = useState(props.minutes);
    const [timerStatus, setStatus] = useState(true);
    const [timerString, setTimerStr] = useState("00:00");

    const setTime = () => {
        setSeconds(seconds-1);
        if (seconds <= 0 && minutes <= 0) {
            setStatus(false);
            setTimerStr("00:00");
            var audio = new Audio("https://github.com/Merikrotti/rok_gathering_notifications/blob/main/src/ding.mp3?raw=true");
            audio.volume = props.volume / 100;
            audio.play();
        }
        if (seconds === 0) {
            setSeconds(59);
            setMinutes(minutes-1);
        }
        

        let fminutes = minutes;
        let fseconds = seconds;
        if (minutes < 10) {fminutes = "0"+minutes;}
        if (seconds < 10) {fseconds = "0"+seconds;}

        setTimerStr(fminutes + ":" + fseconds);
    }
    useEffect(() => {
        const itv = setInterval(() => setTime(), 1000);
        if(!timerStatus) {
            clearInterval(itv);
        }
        return () => clearInterval(itv);
    }, [setTime, timerStatus])
    
    const startGather = () => {
        setMinutes(gatherMinutes);
        setSeconds(gatherSeconds);
        setStatus(true);
    }

    const resetGather = () => {
        setMinutes(0);
        setSeconds(0);
        setStatus(false);
        setTimerStr("00:00");
    }

    const addMarch = (e) => {
        let amount = e.target.value;

        setMinutes(minutes + parseInt(amount));
    }

    return (
    <div className="TimerContainer">
        <h2>Timer of {gatherMinutes} minutes, {gatherSeconds} seconds</h2>
    <div className="Timer">
        <p>Time left: {timerString}</p>
        <button onClick={startGather}>reset</button>
        <button onClick={resetGather}>stop</button>
        
    </div>
    <div className="Timer">
        <p>Add time: </p>
        <button onClick={addMarch} value={1}>1</button>
        <button onClick={addMarch} value={2}>2</button>
        <button onClick={addMarch} value={3}>3</button>
        <button onClick={addMarch} value={4}>4</button>
        <button onClick={addMarch} value={5}>5</button>
        <button onClick={addMarch} value={6}>6</button>
        <button onClick={addMarch} value={7}>7</button>
        <button onClick={addMarch} value={8}>8</button>
        <button onClick={addMarch} value={9}>9</button>
        <button onClick={addMarch} value={10}>10</button>
    </div>
    </div>)
}

export default Timer;