import { useEffect, useState } from "react";


const AddTimer = (props) => {
    
    // Values for resources
    // Gem values
    const baseGemSpeed = 177;
    const baseGemAmounts = [[10, 1], [20, 2], [30, 3], [40, 4]];

    //Test values
    const baseTestSpeed = 1;
    const baseTestAmounts = [[20000, 2], [40000, 3], [50000, 4], [60000, 5]];

    //Hooks
    const [name, setName] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [gatherers, setGatherers] = useState([]);
    const [speedReduction, setReduction] = useState(0);
    const [allow, setAllow] = useState(false);
    const [timeStr, setTimeStr] = useState("00:00:00");
    const [selectedRss, setSelectedRss] = useState("gems");
    const [selectedRssAmounts, setSelectedRssAmounts] = useState(baseGemAmounts);
    const [rssAmount, setAmount] = useState(baseGemAmounts[0][0]);
    const [rssBaseSpeed, setRssBaseSpeed] = useState(baseGemSpeed);

    const [useCustom, setCustom] = useState(false);
    const onCustomSubmit = (name, seconds) => {
        if(name === "") {
            name = "Custom timer";
        }
        props.addtime([name, seconds, null, null]);
    }

    

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

        let ss = Math.floor(rssBaseSpeed * rssAmount / speedReduction);
        setSeconds(ss);
    
        let mm = Math.floor(ss / 60) % 60
        let hh = Math.floor(ss / 60 / 60) % 60
        ss = ss % 60;
                
        ss = formatTime(ss);
        mm = formatTime(mm);
        hh = formatTime(hh);
    
        setTimeStr(hh + ":" + mm + ":" + ss);

    }, [rssBaseSpeed, rssAmount, speedReduction]);

    if(useCustom) {
        return (<div className="TimerForms"><CustomTimer setcustom={setCustom} oncustomsubmit={onCustomSubmit}/></div>)
    }

    const addGatherer = (values) => {
        setGatherers(a => [...a, values]);
    }

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

        switch(e.target.value) {
            case "gems":
                setRssBaseSpeed(baseGemSpeed);
                setSelectedRssAmounts(baseGemAmounts);
                break;
            case "test":
                console.log("This is the test speed.");
                setRssBaseSpeed(baseTestSpeed);
                setSelectedRssAmounts(baseTestAmounts);
                break;
            default:
                alert("Error. See console. Don't use unfinished items. Otherwise open an issue!");
                return;
        }
    }

    const onRssSelectionChange = (e) => {
        setAmount(parseInt(e.target.value));
    }

    const onSubmit = () => {
        props.addtime([name, seconds, selectedRssAmounts, rssBaseSpeed / speedReduction]);
    }

    return (<div className="TimerForms">
    <div className="TimerAdder"><h2>Add timer ({timeStr})</h2>
    <label>Gatherer ({speedReduction * 100} %):
        {gatherers.length <= 0 ? <span>Create a gatherer first</span> : 
        <select onChange={onGathererChange} id="name">
            <option/>
            {gatherers.map((item, index) => {
                return <option value={item} key={index}>{item[0]}</option>
            })}
        </select>}
    </label>
    <label>Name:
    <input type="text" id="name" value={name} onInput={e => setName(e.target.value)}></input>
    </label>
    <label>Deposit type:
            <select className="rssSelection" onChange={onDepositChange} disabled={!allow} value={selectedRss}>
                <option value="gems">Gems</option>
                <option value="wood">Wood (unf)</option>
                <option value="food">Food (unf)</option>
                <option value="gold">Gold (unf)</option>
                <option value="test">Test</option>
            </select>
    </label>
    <label>Deposit level:
            <select className="rssSelection" disabled={!allow} onChange={onRssSelectionChange}>
                {selectedRssAmounts.map((item, index) => {
                    return <option value={item[0]} key={item[1]+selectedRss}>Level {item[1]}</option>
                })}
            </select>
    </label>
    <div>
        <button id="custombutton" onClick={(e) => {setCustom(!useCustom)}}>Use custom timers</button>
        <button disabled={!allow} onClick={onSubmit}>Add</button>
    </div>
    </div>
    <AddBonuses addgatherer={addGatherer}/>
    </div>);
}

const CustomTimer = (props) => {
    const [name, setName] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const onSubmit = () => {
        props.oncustomsubmit(name, Math.floor(parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 60 * 60));
    }

    return (<div className="TimerAdder">
        <h2>Custom timers</h2>
        <label>Name:
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
        </label>
        <label>Hours:
            <input type="number" min="0" value={hours} onChange={(e) => setHours(e.target.value)}></input>
        </label>
        <label>Minutes:
            <input type="number" min="0" value={minutes} onChange={(e) => setMinutes(e.target.value)}></input>
        </label>
        <label>Seconds:
            <input type="number" min="0" value={seconds} onChange={(e) => setSeconds(e.target.value)}></input>
        </label>
        <div>
        <button id="custombutton" onClick={(e) => props.setcustom(false)}>Use set timers</button>
        <button onClick={onSubmit}>Add</button>
        </div>
    </div>);
}


const AddBonuses = (props) => {
    const [gathererName, setGathererName] = useState("");
    const [gathererSpeed, setGathererSpeed] = useState(0);
    const [techSpeed, setTechSpeed] = useState(0);
    const [showHidden, setShowHidden] = useState(false);
    const [talent, setTalent] = useState(true);

    const addGatherer = () => {
        if(talent) {
            props.addgatherer([gathererName, parseInt(gathererSpeed) + 25, techSpeed]);
            return;
        }
        props.addgatherer([gathererName, gathererSpeed, techSpeed]);
    }
    return (<div className="TimerAdder">
        <h2>Add gatherer</h2>
        <label>Name:
            <input type="text" id="name" onInput={e => setGathererName(e.target.value)}></input>
        </label>
        <label>Gatherer speed:
            <input type="number" min="0" value={gathererSpeed} onChange={e => setGathererSpeed(e.target.value)}></input>
        </label>
        <label>Tech speed <a href="#" onClick={() => setShowHidden(!showHidden)}>(?)</a>:
            <input type="number" min="0" value={techSpeed} onChange={e => setTechSpeed(e.target.value)}></input>
        </label>
        <label>+25% Talent
            <input type="checkbox" checked={talent} onChange={() => setTalent(!talent)} id="TimerCheckbox"></input>
        </label>
        <button onClick={addGatherer}>Add</button>
        {showHidden ? <p>Click your city hall and type in the percentage of the resource you are gathering</p> : ""}
    </div>)
}

export default AddTimer;