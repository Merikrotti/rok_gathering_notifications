import { createContext, useContext, useEffect, useState } from "react";
import { useSettingsContext } from "./SettingsContextBuilder";

const DataContext = createContext(null);

const DataContextBuilder = (props) => {
    
    const {settings, changeSettings} = useSettingsContext();
    
    //All added timers
    const [timers, setTimers] = useState([]);

    // TODO: Integrate with above
    // Added from moved FilterTimers.js. Timers update their status here.
    const [activeTimers, setActiveTimers] = useState({});

    //Values for filters
    const [filteredTimers, setFilteredTimers] = useState();
    const [selectedAccount, setSelectedAccount] = useState();

    useEffect(() => {
        if(!selectedAccount) return;

        let newAccount = Object.keys(settings.accounts)[0];

        setSelectedAccount(newAccount);
    }, [selectedAccount])

    //TODO
    const onGathererNameUpdate = (gathererName) => {
        let i = 0;
        timers.forEach(item => {
            if (gathererName === item.gatherer || gathererName === item.secondGatherer) {
                i++;
            }
        });
        if (i > 0) alert(i + " Modified gatherers found in active/removed timers. This is not handled yet, prepare for weird behavior.");
    }

    //TODO
    const onAccountNameUpdate = (accountName) => {
        let i = 0;
        timers.forEach(item => {
            if (accountName === item.account) {
                i++;
            }
        });
        if (i > 0) alert("Account name found in active/removed timers " + i + " times. This is not handled yet, prepare for weird behavior.");
    }


    const addTime = (values) => {
        setTimers(a => [...a, values]);
    }

    const updateActiveTimerStatus = (key, newData) => {
        //Check if anything has changed
        if(JSON.stringify(activeTimers[key]) === JSON.stringify(newData)) {
            return;
        }
        let temp = {};
        temp[key] = newData;
        setActiveTimers(prev => ({...prev, ...temp}));
    }

    const onCreateDefaultAccount = () => {
        let defaultAccount = {
            "prefix": "DF",
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
        settings.accounts["Default"] = defaultAccount;
        setSelectedAccount("Default");
    }

    if(!selectedAccount) {
        let accounts = Object.keys(settings.accounts);
        if(accounts.length > 0) {
            setSelectedAccount(accounts[0]);
            return <h1>Accounts found. Loading...</h1>
        }
        return (<div style={{textAlign: "center"}}>
        <h1>Hello!</h1>

        <h2>If you are new here, use the button below to create a default account</h2>
        <h3>(you can create more in the settings!)</h3>
        <button onClick={onCreateDefaultAccount}>Create default account</button>

        <h2>If you have saved a settings file, import them in the settings page</h2>
        <h1>Remember to export your settings file!</h1>
        <h2>Nothing is saved outside your browser memory!</h2>
        <h2>----------------------------------------------------------------</h2>
        <h2>If you want this program to remember your details,</h2>
        <h2>remember to tick LocalStorage in settings!</h2>
        <p>If you have used LocalStorage, either that data has been deleted or expired.</p>

        </div>)
    }

    return (<DataContext.Provider
            value={{
                timers, activeTimers, filteredTimers, selectedAccount, 
                setSelectedAccount, setFilteredTimers,
                onGathererNameUpdate, updateActiveTimerStatus, addTime
            }}>
        {props.children}
        </DataContext.Provider>)
}

export function useDataContext() {
    return useContext(DataContext);
}

export default DataContextBuilder;