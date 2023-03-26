import { createContext, useState, useContext } from "react"
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
    const [settings, setSettings] = useState(jsonFile);

    // Change settings
    const changeSettings = (json) => {
        setSettings(json);
    }

    const closePopup = () => {
        setpopupState(false);
    }

    //Popup controls
    const createPopup = (_children) => {
        setChildren(_children);
        setpopupState(true);
    }

    return (<SettingsContext.Provider value={{popupState, children, settings,
        createPopup, changeSettings, closePopup}}>{props.children}</SettingsContext.Provider>)
}

export function useSettingsContext() {
    return useContext(SettingsContext);
}

export default SettingsContextBuilder;