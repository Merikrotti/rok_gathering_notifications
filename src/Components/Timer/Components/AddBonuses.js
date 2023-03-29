import { useState } from "react";
import { useSettingsContext } from "../../SettingsContext/SettingsContextBuilder";
import BonusesPopup from "./Popups/BonusesPopup";
import "../TimerStyles.css";
import TechBonuses from "./Popups/TechBonuses";

const AddBonuses = (props) => {
    const {settings} = useSettingsContext();

    const [selectedAccount, setAccount] = useState(Object.keys(settings.accounts)[0]);

    const [gathererName, setGathererName] = useState("");
    const [gathererSpeed, setGathererSpeed] = useState(0);
    const [techSpeed, setTechSpeed] = useState(0);
    const [talent, setTalent] = useState(true);

    const {createPopup} = useSettingsContext();

    const addGatherer = () => {
        if(talent) {
            props.addGatherer([gathererName, parseInt(gathererSpeed) + 25, techSpeed]);
            return;
        }
        props.addGatherer([gathererName, gathererSpeed, techSpeed]);
    }
    const onPopupClick = () => {
        createPopup(<BonusesPopup/>)
    }

    const onTSWindowClick = () => {
        console.log(selectedAccount)
        createPopup(<TechBonuses name={selectedAccount}/>);
    }

    return (<div className="BonusAdder">
        <div className="AdderSpaceBetween">
            <h2>Reduction settings</h2>
            <button href="#" onClick={(e) => onPopupClick(e)}>Help</button>
        </div>
        <label>Account:
            <select value={selectedAccount} onChange={(e) => setAccount(e.target.value)}>
                {Object.keys(settings.accounts).map((item, index) => {
                    return <option value={item} key={item+index}>{item}</option>
                })}
            </select>
        </label>
        <label>Name:
            <input type="text" id="name" onInput={e => setGathererName(e.target.value)}></input>
        </label>
        <label>Gatherer speed:
            <input type="number" min="0" value={gathererSpeed} onChange={e => setGathererSpeed(e.target.value)}></input>
        </label>
        <label>Tech speed window:
            <button onClick={onTSWindowClick}>Open</button>
        </label>
        <label>+25% Talent
            <input type="checkbox" checked={talent} onChange={() => setTalent(!talent)} id="TimerCheckbox"></input>
        </label>
        <button onClick={addGatherer}>Add</button>
    </div>)
}


export default AddBonuses;