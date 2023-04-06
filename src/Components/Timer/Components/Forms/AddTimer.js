import { useEffect, useState } from "react";
import rssValues from "./resourcevalues.json";
import "../css/TimerStyles.css";
import { useSettingsContext } from "../../../Contexts/SettingsContextBuilder";
import { useDataContext } from "../../../Contexts/DataContext";


//TODO split this application apart and comment.
const AddTimer = (props) => {

    const {selectedAccount, addTime} = useDataContext();
    const {settings} = useSettingsContext();

    //Hooks
    const [name, setName] = useState("");
    const [allow, setAllow] = useState(false);
    const [timeStr, setTimeStr] = useState("00:00:00");
    const [speedReduction, setReduction] = useState(0);

    const [selectedGatherer, setGatherer] = useState();
    const [selectedSGatherer, setSGatherer] = useState("");
    const [selectedRss, setSelectedRss] = useState("Gems");
    const [selectedLevel, setRssLevel] = useState(Object.keys(rssValues["Gems"]["Levels"])[0]);
    

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

        let ss = Math.floor(rssValues[selectedRss]["BaseSpeed"] * rssValues[selectedRss].Levels[selectedLevel] / speedReduction);
    
        let mm = Math.floor(ss / 60) % 60
        let hh = Math.floor(ss / 60 / 60) % 60
        ss = ss % 60;
                
        ss = formatTime(ss);
        mm = formatTime(mm);
        hh = formatTime(hh);
    
        setTimeStr(hh + ":" + mm + ":" + ss);

    }, [selectedLevel, speedReduction]);

    useEffect(() => {
        if(!selectedGatherer) return;

        let cAccount = settings.accounts[selectedAccount];
        let gatherer = cAccount.gatherers[selectedGatherer];


        setName(Object.keys(cAccount.gatherers)[0]);
        setName(selectedGatherer);

        let otherReductions = cAccount.techBonuses[selectedRss] + cAccount.otherBonuses;

        let isTalent25 = 0;
        if(gatherer.talent25) isTalent25 = 0.25;
        let percentageReduction = 1 + parseInt(gatherer.gathererBonus) / 100 + parseInt(otherReductions) / 100 + isTalent25;
        
        if(selectedSGatherer !== "") {

            let sGatherer = cAccount.gatherers[selectedSGatherer];
            let reduction = sGatherer.gathererBonus / 100;

            percentageReduction += reduction;
            setName(selectedGatherer + "/" + selectedSGatherer);
        }

        setReduction(percentageReduction);
        

        setAllow(true);

    }, [selectedGatherer, selectedSGatherer])

    useEffect(() => {
        if(selectedAccount) return;
        setGatherer(Object.keys(settings.accounts[selectedAccount].gatherers)[0]);
        setSGatherer("");
        setAllow(false);
    }, [selectedAccount, setGatherer, setSGatherer]);

    //Check that account is valid
    if(!selectedAccount) {
        return <p>Fatal error: No account found</p>;
    }

    const onDepositChange = (e) => {
        setSelectedRss(e.target.value);
    }

    const onRssSelectionChange = (e) => {
        setRssLevel(parseInt(e.target.value));
    }

    const onSubmit = () => {
        let data = {
            "type": "normal",
            "name": name,
            "account": selectedAccount,
            "gatherer": selectedGatherer,
            "secondGatherer": selectedSGatherer,
            "selectedRss": selectedRss,
            "selectedLevel": selectedLevel
        }
        addTime(data);
    }

    if (!selectedGatherer && Object.keys(settings.accounts[selectedAccount].gatherers).length > 0) {
        setGatherer( Object.keys(settings.accounts[selectedAccount].gatherers)[0]);
    }

    return (
    <div className="TimerFormsStyle">
    <h2>Add timer ({timeStr})</h2>
    <label className="gatherers">Gatherers ({Math.round(speedReduction * 100)} %):
        {Object.keys(settings.accounts[selectedAccount].gatherers).length < 1 ? <span id="warning">Create a gatherer first</span> : 
        <div>
        <label>Primary:
        <select onChange={(e) => {setGatherer(e.target.value);}} value={selectedGatherer} id="name">
            {Object.keys(settings.accounts[selectedAccount].gatherers).map((item, index) => {
                return <option value={item} key={index}>{item}</option>
            })}
        </select>
        </label>
        <label>Secondary:
            <select onChange={(e) => {setSGatherer(e.target.value);}} value={selectedSGatherer} id="name">
                <option value={""}>None</option>
            {Object.keys(settings.accounts[selectedAccount].gatherers).map((item, index) => {
                return <option value={item} key={index}>{item}</option>
            })}
            </select>
        </label>
        </div>}
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
                {Object.keys(rssValues[selectedRss]["Levels"]).map((key, index) => {
                    return <option value={key} key={key+selectedRss}>Level {key}</option>
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