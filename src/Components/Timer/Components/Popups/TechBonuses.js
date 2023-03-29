import { useState } from "react";
import { useSettingsContext } from "../../../SettingsContext/SettingsContextBuilder";

const TechBonuses = (props) => {
    //Load settings
    const {settings} = useSettingsContext();

    //Account hooks:
    const [name, setName] = useState(null);
    const [prefix, setPrefix] = useState("");
    const [usePrefix, setUseSpefix] = useState(false);

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
        setPrefix(account.timerPrefix);
        setUseSpefix(account.usePrefix);

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

    return (
        <div className="TechContainer">
            <h1>Technology bonuses</h1>
            <div>
                <h2>Account details</h2>
                <label>Name:
                    <input value={name} type="text"></input>
                </label>
                <label>Prefix:
                    <input value={prefix} type="text"></input>
                </label>
                <label>Use prefix:
                    <input checked={usePrefix} type="checkbox"></input>
                </label>
            </div>
            <div className="TechForm">
                <h2>Account bonuses</h2>
                <label>Food:
                    <input value={food} type="text"></input>
                </label>
                <label>Wood:
                    <input value={wood} type="text"></input>
                </label>
                <label>Stone:
                    <input value={stone} type="text"></input>
                </label>
                <label>Gold:
                    <input value={gold} type="text"></input>
                </label>
                <label>Gems:
                    <input value={gems} type="text"></input>
                </label>
            </div>
            <div>
                <h2>Other bonuses</h2>
                <label>Percentage:
                    <input value={otherBonuses} type="text"></input>
                </label>
            </div>
            <button>Save</button>
        </div>
    );
}

export default TechBonuses;