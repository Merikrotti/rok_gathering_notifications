import { useEffect, useState } from "react";
import { useDataContext } from "../../../Contexts/DataContext";
import { useSettingsContext } from "../../../Contexts/SettingsContextBuilder";

const SelectAccount = () => {
    const {selectedAccount, setSelectedAccount} = useDataContext();
    const {settings} = useSettingsContext();


    useEffect(() => {
        setSelectedAccount(selectedAccount);
    }, [selectedAccount, setSelectedAccount]);


    return (
    <div className="TimerFormsStyle">
        <h2>Select account</h2>
        {Object.keys(settings.accounts).length > 0 ?
        <div className="SelectAccount">
        <label>Account:
            <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                {Object.keys(settings.accounts).map((item, index) => {
                    return <option value={item} key={item+index}>{item}</option>
                })}
            </select>
        </label>
        <label style={{marginTop: "10px"}}>Selected:
           <span style={{color: "darkgrey", fontWeight: "bold", marginRight: "10px"}}>{settings.accounts[selectedAccount].usePrefix ? <span style={{color: "magenta"}}>[{settings.accounts[selectedAccount].prefix}]</span> : ""} {selectedAccount}</span>
        </label>
        </div>
        :
        <p id="warning">No accounts. Create an account first.</p>
        }
    </div>);
}

export default SelectAccount;