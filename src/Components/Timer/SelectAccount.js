import { useEffect, useState } from "react";
import { useSettingsContext } from "../SettingsContext/SettingsContextBuilder";

const SelectAccount = (props) => {
    const {settings} = useSettingsContext();
    const [selectedAccount, setAccount] = useState(Object.keys(settings.accounts)[0]);

    useEffect(() => {
        props.setSelectedAccount(selectedAccount);
    }, [selectedAccount, props.setSelectedAccount]);

    return (
    <div className="TimerFormsStyle">
        <h2>Select account</h2>
        <label>Account:
            <select value={selectedAccount} onChange={(e) => setAccount(e.target.value)}>
                {Object.keys(settings.accounts).map((item, index) => {
                    return <option value={item} key={item+index}>{item}</option>
                })}
            </select>
        </label>
        <label style={{marginTop: "10px"}}>Selected:
           <span style={{color: "darkgrey", fontWeight: "bold", marginRight: "10px"}}>{settings.accounts[selectedAccount].usePrefix ? <span style={{color: "magenta"}}>[{settings.accounts[selectedAccount].prefix}]</span> : ""} {selectedAccount}</span>
        </label>
    </div>);
}

export default SelectAccount;