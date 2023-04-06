import { createContext, useState, useContext, useEffect } from "react"
import jsonFile from './DefaultSettings.json';

//Create context
const SettingsContext = createContext(null);

//TODO: Reducer

//Global settings provider
const SettingsContextBuilder = (props) => {
    // Normal popup fuctions
    const [popupState, setpopupState] = useState(false);
    const [children, setChildren] = useState((<p>not loaded...</p>));

    // Set settings
    const [settings, setSettings] = useState();

    useEffect(() => {
        if(!settings) return;

        const saveToLS = () => {
            if(!settings.localstorage) {
                if(localStorage.data) delete localStorage.data;
                return;
            };

            let settingsString = JSON.stringify(settings);

            if(localStorage.data === settingsString) return;

            localStorage.setItem("data", settingsString);
        }
        
        const itv = setInterval(() => saveToLS(), 5000);

        return () => clearInterval(itv);
        
    }, [settings]);

    // Change settings
    const changeSettings = (json) => {
        setSettings(prev => ({...prev, ...json}));
    }

    const closePopup = () => {
        setpopupState(false);
    }

    //Popup controls
    const createPopup = (_children) => {
        setChildren(_children);
        setpopupState(true);
    }


    if(!settings) {
        if(localStorage.data) {
            let json = JSON.parse(localStorage.data);
            setSettings(json);
        } else {
            setSettings(jsonFile);
        }
        return "";
    }
    
    return (<SettingsContext.Provider value={{popupState, children, settings, 
        createPopup, changeSettings, closePopup}}>{props.children}</SettingsContext.Provider>)
}

export function useSettingsContext() {
    return useContext(SettingsContext);
}

export default SettingsContextBuilder;