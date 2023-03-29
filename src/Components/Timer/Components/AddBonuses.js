import { useState } from "react";
import { useSettingsContext } from "../../SettingsContext/SettingsContextBuilder";
<<<<<<< HEAD

const AddBonuses = (props) => {
=======
import BonusesPopup from "./Popups/BonusesPopup";
import "../TimerStyles.css";
import TechBonuses from "./Popups/TechBonuses";

const AddBonuses = (props) => {
    const {settings} = useSettingsContext();

    const [selectedAccount, setAccount] = useState(Object.keys(settings.accounts)[0]);

>>>>>>> 8a09dda (moved CSS, tech window)
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
<<<<<<< HEAD
        createPopup(<TechPopup/>)
    }

    return (<div className="TimerAdder">
        <h2>Add gatherer</h2>
=======
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
>>>>>>> 8a09dda (moved CSS, tech window)
        <label>Name:
            <input type="text" id="name" onInput={e => setGathererName(e.target.value)}></input>
        </label>
        <label>Gatherer speed:
            <input type="number" min="0" value={gathererSpeed} onChange={e => setGathererSpeed(e.target.value)}></input>
        </label>
<<<<<<< HEAD
        <label>Tech speed <a href="#" onClick={onPopupClick}>(?)</a>:
            <input type="number" min="0" value={techSpeed} onChange={e => setTechSpeed(e.target.value)}></input>
=======
        <label>Tech speed window:
            <button onClick={onTSWindowClick}>Open</button>
>>>>>>> 8a09dda (moved CSS, tech window)
        </label>
        <label>+25% Talent
            <input type="checkbox" checked={talent} onChange={() => setTalent(!talent)} id="TimerCheckbox"></input>
        </label>
        <button onClick={addGatherer}>Add</button>
    </div>)
}

<<<<<<< HEAD
const TechPopup = () => {
    return (<div>
        <h2>Info</h2>
        <p>Click your city hall and type in the percentage of the resource you are gathering</p>
    </div>);
}
=======
>>>>>>> 8a09dda (moved CSS, tech window)

export default AddBonuses;