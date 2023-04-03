import { useEffect, useState } from "react";
import rssValues from "./resourcevalues.json";
import "../TimerStyles.css";


//TODO split this application apart and comment.
const AddTimer = (props) => {
    //Hooks
    const [name, setName] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [allow, setAllow] = useState(false);
    const [timeStr, setTimeStr] = useState("00:00:00");

    const [speedReduction, setReduction] = useState(0);

    const [selectedRss, setSelectedRss] = useState("Gems");
    const [rssAmount, setAmount] = useState(rssValues["Gems"]["Levels"]["1"]);

    useEffect(() => {
        const formatTime = (itgr) => {
            if (itgr < 10) {
                return "0" + itgr;
            }
            return itgr + "";
        }

        if(!allow) {
            return;
        }

        let ss = Math.floor(rssValues[selectedRss]["BaseSpeed"] * rssAmount / speedReduction);
        setSeconds(ss);
    
        let mm = Math.floor(ss / 60) % 60
        let hh = Math.floor(ss / 60 / 60) % 60
        ss = ss % 60;
                
        ss = formatTime(ss);
        mm = formatTime(mm);
        hh = formatTime(hh);
    
        setTimeStr(hh + ":" + mm + ":" + ss);

    }, [rssAmount, speedReduction]);

    const onGathererChange = (e) => {
        let arr = e.target.value.split(',');
        if (arr.length !== 3) {
            setAllow(false);
            return;
        }
        let percentageReduction = 1 + parseInt(arr[1]) / 100 + parseInt(arr[2]) / 100;
        
        setReduction(percentageReduction);
        setName(arr[0]);

        setAllow(true);
    }

    const onDepositChange = (e) => {
        setSelectedRss(e.target.value);
    }

    const onRssSelectionChange = (e) => {
        setAmount(parseInt(e.target.value));
    }

    const onSubmit = () => {
        let levels = rssValues[selectedRss]["Levels"];

        let speedPerItem = rssValues[selectedRss].BaseSpeed / speedReduction;
        
        let data = {
            "type": "normal",
            "name": name,
            "seconds": seconds,
            levels,
            "speedPerItem": speedPerItem,
            "onTerritory": false
        }
        props.addTime(data);
    }

    return (
    <div className="TimerFormsStyle">
    <h2>Add timer ({timeStr})</h2>
    <label>Gatherer ({Math.round(speedReduction * 100)} %):
        {props.gatherers.length <= 0 ? <span id="warning">Create a gatherer first</span> : 
        <select onChange={onGathererChange} id="name">
            <option/>
            {props.gatherers.map((item, index) => {
                return <option value={item} key={index}>{item[0]}</option>
            })}
        </select>}
    </label>
    <label>Name:
    <input type="text" id="name" value={name} onInput={e => setName(e.target.value)}></input>
    </label>
    <label>Deposit type:
            <select onChange={onDepositChange} disabled={!allow} value={selectedRss}>
                {Object.keys(rssValues).map((key, i) => {
                    return <option value={key} key={key + i}>{key}</option>
                })}
            </select>
    </label>
    <label>Deposit level:
            <select disabled={!allow} onChange={onRssSelectionChange}>
                {Object.entries(rssValues[selectedRss]["Levels"]).map(([key, item], index) => {
                    return <option value={item} key={key+selectedRss}>Level {key}</option>
                })}
            </select>
    </label>
    <div className="ButtonAlign">
        <button onClick={() => props.setCustom(true)}>Use custom timers</button>
        <button id="add" disabled={!allow} onClick={onSubmit}>Add</button>
    </div>
    </div>);
}

export default AddTimer;