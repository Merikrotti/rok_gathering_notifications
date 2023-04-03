import { useEffect, useState } from "react"
import { useSettingsContext } from "../SettingsContext/SettingsContextBuilder";

const Timer = (props) => {
    const [endTime, setTime] = useState(null);
    const [resetTime, setReset] = useState(props.data.seconds);
    const [timerStatus, setStatus] = useState(true);
    const [timerString, setTimerStr] = useState("00:00:00");
    const {settings} = useSettingsContext();
    
    const resetTimeWithSeconds = (seconds) => {
        let timeNow = new Date();
        timeNow.setSeconds(timeNow.getSeconds() + parseInt(seconds));

        setReset(seconds);
        setTime(timeNow);
    }

    if(endTime === null) {
        resetTimeWithSeconds(props.data.seconds);
    }

    useEffect(() => {
        const setTime = () => {

            let timeNow = new Date();
            let timediff = endTime - timeNow;

            if (timediff < 1000) {
                setStatus(false);
                var audio = new Audio(process.env.PUBLIC_URL + "/ding.mp3");
                audio.volume = settings.volume / 100;
                audio.play();
                setTimerStr("FINISHED");
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

        const itv = setInterval(() => setTime(), 100);
        if(!timerStatus) {
            clearInterval(itv);
        }
        return () => clearInterval(itv);
    }, [timerStatus, settings, endTime])

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
        let seconds = parseInt(e.target.value) * props.data.speedPerItem;
        resetTimeWithSeconds(seconds);
    }

    

    return (
    <div className="TimerContainer" style={{backgroundColor: timerString === "FINISHED" ? 'darkcyan' : 'darkred'}}>
        {props.data.name === "" ? <h2>No name</h2> : <h2>{props.data.name}</h2>}
    <div className="Timer">
        <p>Time left: <span style={{color: timerString === "FINISHED" ? 'darkred' : 'white'}}>{timerString}</span></p>
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
    {props.data.type === "normal" ? <div className="TimerMath">
        <div><p>Deposit level reset: </p></div>
        <div className="TimerButtons">
            {Object.entries(props.data.levels).map(([key, item], index) => {
                return <button onClick={onDepositReset} value={item} key={key + item + index + timerString}>{key}</button>
            })}
        </div>
    </div>
    :
    ""
    }
    </div>)
}

export default Timer;