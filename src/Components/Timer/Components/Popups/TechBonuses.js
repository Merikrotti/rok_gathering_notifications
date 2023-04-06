import { useState } from "react";
import { useSettingsContext } from "../../../Contexts/SettingsContextBuilder";
import "../css/TechBonuses.css"

const TechBonuses = (props) => {
    //Load settings
    const {settings, changeSettings} = useSettingsContext();

    //Account hooks:
    const [name, setName] = useState(null);
    const [prefix, setPrefix] = useState("");
    const [usePrefix, setUsePrefix] = useState(false);

    //Account bonus hooks
    const [food, setFood] = useState(0);
    const [wood, setWood] = useState(0);
    const [stone, setStone] = useState(0);
    const [gold, setGold] = useState(0);
    const [gems, setGems] = useState(0);

    //Other bonuses
    const [otherBonuses, setOtherBonuses] = useState(0);

    const [error, setError] = useState("");

    if(name === null && error !== "") {
        return (<div>
            <h1>Fatal error</h1>
            <p>{error}</p>
        </div>)
    }

    if(name === null) {
        //Load values with props.name
        let account = settings["accounts"][props.name];
        
        if(!account) {
            setError("FATAL ERROR: Account was not found. Corrupted settings file?");
            return;
        }

        //Account details
        setName(props.name);
        setPrefix(account.prefix);
        setUsePrefix(account.usePrefix);

        //Tech bonuses
        let bonuses = account.techBonuses;
        setFood(bonuses.Food);
        setWood(bonuses.Wood);
        setStone(bonuses.Stone);
        setGold(bonuses.Gold);
        setGems(bonuses.Gems);

        //Other bonuses
        setOtherBonuses(account.otherBonuses);

        //Wait to load
        return (<div>
            <h1>Loading...</h1>
            <p>This shouldnt take long, unless your settings files is faulty.</p>
        </div>)
    }

    // Check if the name has changed, remove if it has and send the current settings to settings provider.
    const onSave = () => {

        //Try parsing, on fail alert user
        //On success, update settings.
        try {
            let newSettings = {
                "prefix": prefix,
                "usePrefix": usePrefix,
                "techBonuses": {
                    "Food": parseInt(food),
                    "Wood": parseInt(wood),
                    "Stone": parseInt(stone),
                    "Gold": parseInt(gold),
                    "Gems": parseInt(gems)
                },
                "otherBonuses": parseInt(otherBonuses),
                "gatherers": settings.accounts[props.name].gatherers
            }
            delete settings.accounts[props.name];
            settings.accounts[name] = newSettings;
        } catch (e) {
            alert("Some settings are not proper. Check the inputs.")
            console.log(e);
            return;
        }
    }

    return (
        <div className="TechContainer">
            <h1>Technology bonuses</h1>
            <div className="TechForm">
                <h2>Account details</h2>
                <label>Name (TODO: handle name change):
                    <input value={name} disabled={true} onChange={(e) => setName(e.target.value)} type="text"></input>
                </label>
                <label>Prefix:
                    <input value={prefix} onChange={(e) => setPrefix(e.target.value)} type="text"></input>
                </label>
                <label>Use prefix:
                    <input checked={usePrefix} onChange={(e) => setUsePrefix(e.target.value)} type="checkbox"></input>
                </label>
            </div>
            <div className="TechForm">
                <h2>Account bonuses</h2>
                <label>Food:
                    <input value={food} min="0" onChange={(e) => setFood(e.target.value)} type="number"></input>
                </label>
                <label>Wood:
                    <input value={wood} min="0" onChange={(e) => setWood(e.target.value)} type="number"></input>
                </label>
                <label>Stone:
                    <input value={stone} min="0" onChange={(e) => setStone(e.target.value)} type="number"></input>
                </label>
                <label>Gold:
                    <input value={gold} min="0" onChange={(e) => setGold(e.target.value)} type="number"></input>
                </label>
                <label>Gems:
                    <input value={gems} min="0" onChange={(e) => setGems(e.target.value)} type="number"></input>
                </label>
            </div>
            <div className="TechForm">
                <h2>Other bonuses</h2>
                <label>Percentage:
                    <input value={otherBonuses} min="0" onChange={(e) => setOtherBonuses(e.target.value)} type="number"></input>
                </label>
            </div>
            <button onClick={onSave}>Save</button>
        </div>
    );
}

export default TechBonuses;