import { useState } from "react";
import { useSettingsContext } from "../../SettingsContext/SettingsContextBuilder";

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
        createPopup(<TechPopup/>)
    }

    return (<div className="TimerAdder">
        <h2>Add gatherer</h2>
        <label>Name:
            <input type="text" id="name" onInput={e => setGathererName(e.target.value)}></input>
        </label>
        <label>Gatherer speed:
            <input type="number" min="0" value={gathererSpeed} onChange={e => setGathererSpeed(e.target.value)}></input>
        </label>
        <label>Tech speed <a href="#" onClick={onPopupClick}>(?)</a>:
            <input type="number" min="0" value={techSpeed} onChange={e => setTechSpeed(e.target.value)}></input>
        </label>
        <label>+25% Talent
            <input type="checkbox" checked={talent} onChange={() => setTalent(!talent)} id="TimerCheckbox"></input>
        </label>
        <button onClick={addGatherer}>Add</button>
    </div>)
}

const TechPopup = () => {
    return (<div>
        <h2>Info</h2>
        <p>Click your city hall and type in the percentage of the resource you are gathering</p>
    </div>);
}

export default AddBonuses;