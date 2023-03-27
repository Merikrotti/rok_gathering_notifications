import { useEffect, useState } from "react";
import TimerMiddleware from "../Connections/TimerMiddleware";
import { useSettingsContext } from "../SettingsContext/SettingsContextBuilder";
import './settings.css';

const SettingsPage = () => {

    const {settings, changeSettings} = useSettingsContext();
    const [middlewareStatus, setMiddlewareStatus] = useState(settings.middleware.isEnabled);  
    const [newSettings, setNewSettings] = useState(settings); 
    const [volume, setVolume] = useState(settings.volume); 

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
    
    return (<div className="settingsGroup">
        <h1>Settings</h1>
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
            <label>Save:
                <button onClick={() => changeSettings(settings)}>Save</button>
            </label>
        </div>
    </div>)
}

export default SettingsPage;