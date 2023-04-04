import { useEffect, useState } from "react";
import TimerMiddleware from "../Connections/TimerMiddleware";
import { useSettingsContext } from "../SettingsContext/SettingsContextBuilder";
import './settings.css';

const SettingsPage = () => {

    const {settings, changeSettings} = useSettingsContext();
    const [middlewareStatus, setMiddlewareStatus] = useState(settings.middleware.isEnabled);  
    const [newSettings, setNewSettings] = useState(settings); 
    const [volume, setVolume] = useState(settings.volume); 

    //Create new account
    const [accountName, setAccountName] = useState("");

    const updateMiddleware = () => {
        let temp = settings;
        temp.middleware.isEnabled = !middlewareStatus;
        setMiddlewareStatus(!middlewareStatus);
        setNewSettings(newSettings);
    }

    const changeVolume = (e) => {
        let temp = settings;
        temp.volume = e.target.value;
        setNewSettings(settings);
        setVolume(temp.volume);
    }

    const createAccount = () => {
        let accountData = 
        {
            "prefix": "none",
            "usePrefix": false,
            "techBonuses": {
                "Food": 0,
                "Wood": 0,
                "Stone": 0,
                "Gold": 0,
                "Gems": 0
            },
            "otherBonuses": 0,
            "gatherers": {
            }
        }
        if(settings.accounts[accountName]) {
            alert("Account already exists");
            return;
        }
        settings.accounts[accountName] = accountData;
    }
    
    return (<div className="settingsGroup">
        <h1>Settings</h1>
        <div className="settingsItem">
            <h2>Create account</h2>
            <label>Name:
                <input type="text" onChange={(e) => setAccountName(e.target.value)}></input>
            </label>
            <p style={{color: "red"}}>Note: Do not make accounts with the same name (for now)</p>
            <button onClick={createAccount}>Create</button>
        </div>
        <div className="settingsItem">
            <h2>Remove account (TODO)</h2>
            <select>
                {Object.keys(settings.accounts).map((key, index) => {
                    return <option value={key} key={"a-rm" + index+key}>{key}</option>
                })}
            </select>
            <p style={{color: "red"}}>Note: This is unrecoverable</p>
            <button disabled={true}>Remove</button>
        </div>
        <div className="settingsItem">
            <h2>Middleware (unf)</h2> <span>For now, you can only see responses.</span>
            <TimerMiddleware isEnabled={middlewareStatus} />
            <label>Option:
                <button onClick={updateMiddleware}>{middlewareStatus ? "Disable middleware" : "Enable middleware"}</button>
            </label>
        </div>
        <div className="settingsItem">
            <h2>Options</h2>
            <label>Volume ({volume} %):
                <input type="range" min="0" max="100" value={volume} onChange={changeVolume}></input>
            </label>
            <label>Save (Direct write in use):
                <button onClick={() => changeSettings(settings)} disabled>Save</button>
            </label>
        </div>
    </div>)
}

export default SettingsPage;