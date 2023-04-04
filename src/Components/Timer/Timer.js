import { useEffect, useState } from "react"
import { useSettingsContext } from "../SettingsContext/SettingsContextBuilder";
import rssValues from "./Components/resourcevalues.json";

const Timer = (props) => {
    const [endTime, setTime] = useState(null);
    const [resetTime, setReset] = useState(-1);
    const [timerStatus, setStatus] = useState(true);
    const [timerString, setTimerStr] = useState("00:00:00");
    const {settings} = useSettingsContext();

    const [onTerritory, setOnTerritory] = useState(false);

    const [isFiltered, setFiltered] = useState(false);

    const [name, setName] = useState(props.data.name);
    const [prefix, setPrefix] = useState();
    
    const resetTimeWithSeconds = (seconds) => {
        let timeNow = new Date();
        timeNow.setSeconds(timeNow.getSeconds() + parseInt(seconds));

        setReset(seconds);
        setTime(timeNow);
    }

    //Calculation for the reduction
    const calculateReduction = (selectedLevel) => {
        let amount = rssValues[props.data.selectedRss].Levels[selectedLevel];
        let baseSpeed = rssValues[props.data.selectedRss].BaseSpeed;
        let account = settings.accounts[props.data.account];

        let techReduction = (account.techBonuses[props.data.selectedRss] / 100 + account.otherBonuses / 100);

        let gatherer = account.gatherers[props.data.gatherer];

        let gathererReduction = gatherer.gathererBonus / 100;
        if(gatherer.talent25) 
            gathererReduction = gathererReduction + 0.25;

        if(props.data.secondGatherer !== "") {
            let sGatherer = account.gatherers[props.data.secondGatherer];
            let sgathererReduction = sGatherer.gathererBonus / 100;
            gathererReduction += sgathererReduction;
        }

        let seconds = Math.round(amount * baseSpeed / (1 + techReduction + gathererReduction));
        
        resetTimeWithSeconds(seconds);
    }

    const resetTimer = () => {
        if(props.data.type === "normal") {
            calculateReduction(props.data.selectedLevel);
        } else {
            resetTimeWithSeconds(props.data.seconds);
        }
    }

    if(endTime === null) {
        if(props.data.type === "normal") {
            if (settings.accounts[props.data.account].usePrefix) {
                setPrefix(settings.accounts[props.data.account].prefix);
            }
        }
        resetTimer();
    }

    //Updates parent with new data
    const updateParent = (data) => {
        props.updateStatus(props.pKey, data);
    }

    const checkFilterStatus = () => {
        if(props.filteredTimers.indexOf(props.pKey) !== -1) {
            setFiltered(true);
        } else {
            setFiltered(false);
        }
    }

    useEffect(() => {
        //Default response to parent updateStatus function
        const defaultFilterResponse = {
            "type": props.data.type,
            "status": "active",
            "account": props.data.account,
            "isFinished": false
        }

        const setTime = () => {

            let timeNow = new Date();
            let timediff = endTime - timeNow;

            if(onTerritory) {
                timediff = timediff - resetTime * 0.25 * 1000;
            }
            

            if (timediff < 1000) {
                setStatus(false);
                var audio = new Audio(process.env.PUBLIC_URL + "/ding.mp3");
                audio.volume = settings.volume / 100;
                audio.play();
                setTimerStr("FINISHED");
                
                //Update status for filter
                let filterResponse = defaultFilterResponse;
                filterResponse.isFinished = true;
                updateParent(filterResponse);

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

        //If timer is running, update filter parent data.
        if(timerStatus) {
            updateParent(defaultFilterResponse);
        }

        if(!timerStatus) {
            clearInterval(itv);
        }
        checkFilterStatus();
        return () => clearInterval(itv);
    }, [timerStatus, settings, endTime, props.filteredTimers, updateParent, checkFilterStatus])

    const resetGather = () => {
        setStatus(true);
        resetTime();
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

        //Update filter parent to know that this timer is removed.
        let newTimer = {
            "type": props.data.type,
            "status": "removed",
            "account": props.data.account,
            "isFinished": false
        }

        updateParent(newTimer);
    }

    if(timerStatus === null) {
        return;
    }

    const onDepositReset = (e) => {
        calculateReduction(e.target.value);
    }

    

    return (
    <div className="Timers" style={{backgroundColor: timerString === "FINISHED" ? 'darkcyan' : 'darkred'}} hidden={isFiltered}>
        {<h2>{prefix ? <span style={{color: "magenta"}}>[{prefix}] </span> : ""}{name}</h2>}
    <div className="TimerControls">
        <p>Time left: <span style={{color: timerString === "FINISHED" ? 'darkred' : 'white'}}>{timerString}</span></p>
        <div>
        <button className="CustomButton" id={onTerritory ? "active" : "disabled"} onClick={() => setOnTerritory(!onTerritory)}>on territory</button>
        <button onClick={resetGather}>reset</button>
        <button onClick={remove}>remove</button>
        </div>
    </div>
    <div>
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
    <div>
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
    {props.data.type === "normal" ? <div>
        <div><p>Deposit level reset: </p></div>
        <div className="TimerButtons">
            {Object.keys(rssValues[props.data.selectedRss].Levels).map((key, index) => {
                return <button onClick={onDepositReset} value={key} key={key + index + timerString}>{key}</button>
            })}
        </div>
    </div>
    :
    ""
    }
    </div>)
}

export default Timer;