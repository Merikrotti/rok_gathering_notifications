import { useEffect, useState } from "react"
import './App.css'

const Timer = (props) => {
    const [endTime, setTime] = useState(null);
    const [resetTime, setReset] = useState(props.seconds);
    const [timerStatus, setStatus] = useState(true);
    const [timerString, setTimerStr] = useState("00:00:00");
    
    const resetTimeWithSeconds = (seconds) => {
        let timeNow = new Date();
        timeNow.setSeconds(timeNow.getSeconds() + parseInt(seconds));

        setReset(seconds);
        setTime(timeNow);
    }

    if(endTime === null) {
        resetTimeWithSeconds(props.seconds);
    }

    useEffect(() => {
        const setTime = () => {

            let timeNow = new Date();
            let timediff = endTime - timeNow;

            if (timediff <= 0) {
                setStatus(false);
                var audio = new Audio("https://github.com/Merikrotti/rok_gathering_notifications/blob/main/src/ding.mp3?raw=true");
                audio.volume = props.volume / 100;
                audio.play();
                return;
            }
            let floatseconds = timediff / 1000;

            let ss = Math.floor(floatseconds);
            let mm = Math.floor(ss / 60) % 60
            let hh = Math.floor(ss / 60 / 60) % 60
            ss = ss % 60;
            
            ss = formatTime(ss);
            mm = formatTime(mm);
            hh = formatTime(hh);

            setTimerStr(hh + ":" + mm + ":" + ss);
            
        }

        //always returns str
        const formatTime = (itgr) => {
            if (itgr < 10) {
                return "0" + itgr;
            }
            return itgr + "";
        }

        const itv = setInterval(() => setTime(), 200);
        if(!timerStatus) {
            clearInterval(itv);
        }
        return () => clearInterval(itv);
    }, [timerStatus, props.volume, endTime])

    const resetGather = () => {
        setStatus(true);
        resetTimeWithSeconds(resetTime);
    }

    const stopGather = () => {
        setStatus(false);
    }

    const addMarch = (e) => {
        let amount = e.target.value;
        let diff = endTime.setSeconds(endTime.getSeconds() + amount * 60);
    }

    const remove = () => {
        setStatus(null);
    }

    if(timerStatus === null) {
        return;
    }

    const onDepositReset = (e) => {
        let seconds = parseInt(e.target.value) * props.reduction;
        console.log(seconds);
        resetTimeWithSeconds(seconds);
    }

    

    return (
    <div className="TimerContainer">
        {props.name === "" ? <h2>No name</h2> : <h2>{props.name}</h2>}
    <div className="Timer">
        <p>Time left: {timerString}</p>
        <div className="TimerControls">
        <button onClick={resetGather}>reset</button>
        <button onClick={stopGather}>stop</button>
        <button onClick={remove}>remove</button>
        </div>
    </div>
    <div className="TimerMath">
        <p>Add time: </p>
        <div className="TimerButtons">
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
    </div>
    <div className="TimerMath">
        <div><p>Subtract time: </p></div>
        <div className="TimerButtons">
        <button onClick={addMarch} value={-1}>1</button>
        <button onClick={addMarch} value={-2}>2</button>
        <button onClick={addMarch} value={-3}>3</button>
        <button onClick={addMarch} value={-4}>4</button>
        <button onClick={addMarch} value={-5}>5</button>
        <button onClick={addMarch} value={-6}>6</button>
        <button onClick={addMarch} value={-7}>7</button>
        <button onClick={addMarch} value={-8}>8</button>
        <button onClick={addMarch} value={-9}>9</button>
        <button onClick={addMarch} value={-10}>10</button>
        </div>
    </div>
    {props.levels !== null ? <div className="TimerMath">
        <div><p>Deposit level reset: </p></div>
        <div className="TimerButtons">
            {props.levels.map((item, index) => {
                return <button onClick={onDepositReset} value={item[0]} key={"dl" + index}>{item[1]}</button>
            })}
        </div>
    </div>
    :
    ""
    }
    </div>)
}

export default Timer;