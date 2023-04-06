import { useEffect, useState } from "react";
import TimerMiddleware from "../Connections/TimerMiddleware";
import { useSettingsContext } from "../Contexts/SettingsContextBuilder";
import './settings.css';

const SettingsPage = () => {

    const {settings} = useSettingsContext();
    const [middlewareStatus, setMiddlewareStatus] = useState(settings.middleware.isEnabled);  
    const [newSettings, setNewSettings] = useState(settings); 

    //Create new account
    const [accountName, setAccountName] = useState("");

    const updateMiddleware = () => {
        let temp = settings;
        temp.middleware.isEnabled = !middlewareStatus;
        setMiddlewareStatus(!middlewareStatus);
        setNewSettings(newSettings);
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
            <button onClick={createAccount}>Create</button>
        </div>
        <div className="settingsItem">
            <h2>Remove account (TODO)</h2>
            <label>Account:
                <select>
                {Object.keys(settings.accounts).map((key, index) => {
                    return <option value={key} key={"a-rm" + index+key}>{key}</option>
                })}
                </select>
            </label>
            <button disabled={true}>Remove</button>
        </div>
        <div className="settingsItem">
            <h2>Middleware (TODO)</h2>
            <TimerMiddleware isEnabled={middlewareStatus} />
            <label>Option:
                <button onClick={updateMiddleware}>{middlewareStatus ? "Disable middleware" : "Enable middleware"}</button>
            </label>
        </div>
        <Options/>
    </div>)
}


const Options = () => {
    const {settings, changeSettings} = useSettingsContext();
    

    const [volume, setVolume] = useState(settings.volume); 
    const [localStorage, setLS] = useState(settings.localstorage);

    const changeVolume = (e) => {
        setVolume(e.target.value);
        settings.volume = e.target.value;
    }

    const exportJson = () => {
    
        const jsonData = JSON.stringify(settings);
        const blob = new Blob([jsonData], { type: "application/json" });
    
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "mydata.json";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const onLocalStorageRemove = () => {
        delete localStorage.data;
    }

    const onLocalStorageChange = () => {
        let newLS = !localStorage;
        
        settings.localstorage = newLS;
        setLS(newLS);
    }


    const onFinishedImport = (data) => {
        changeSettings(data);
    }

    const importJson = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            let jsonData = event.target.result;
            let data = JSON.parse(jsonData);
            onFinishedImport(data);
        };
        reader.readAsText(file);
    }

    return (
    <div className="settingsItem">
        <h2>Options</h2>
            <label>Volume ({volume} %):
                <input type="range" min="0" max="100" value={volume} onChange={changeVolume}></input>
            </label>
            <div className="sData">
                <h3>Import settings:</h3>
                <button onClick={() => exportJson()}>Export</button>
                <button onClick={() => document.getElementById('importfile').click()}>Import</button>
                <label>Save to browser? (LocalStorage)
                    <input type="checkbox" checked={localStorage} onChange={() => onLocalStorageChange()}></input>
                </label>
                <label>Remove browser storage:
                    <button onClick={() => onLocalStorageRemove()}>Remove</button>
                </label>
                <input id="importfile"  type="file" onChange={importJson} hidden={true}></input>
            </div>
    </div>);
}

export default SettingsPage;