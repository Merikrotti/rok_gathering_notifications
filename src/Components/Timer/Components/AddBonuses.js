import { useState } from "react";
import { useSettingsContext } from "../../SettingsContext/SettingsContextBuilder";
import BonusesPopup from "./Popups/BonusesPopup";
import "../TimerStyles.css";
import TechBonuses from "./Popups/TechBonuses";

const AddBonuses = (props) => {
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
        createPopup(<TechBonuses name={props.selectedAccount}/>);
    }

    return (<div className="TimerFormsStyle">
        <div className="TitleAlign">
            <h2>Reduction settings</h2>
            <button onClick={(e) => onPopupClick(e)}>Help</button>
        </div>
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
        <div className="BonusAdd">
            <button id="add" onClick={addGatherer}>Add</button>
        </div>
    </div>)
}


export default AddBonuses;