import { useEffect, useState } from "react";
import { useDataContext } from "../../../Contexts/DataContext";
import { useSettingsContext } from "../../../Contexts/SettingsContextBuilder";
import "../css/TechBonuses.css"

const GathererBonuses = (props) => {
    //Load settings
    const {settings} = useSettingsContext();

    //Hooks
    const [name, setName] = useState("");
    const [gathererSpeed, setSpeed] = useState(0);
    const [talent25, setTalent] = useState(false);

    //Editing hooks
    const [selectedGatherer, setSGatherer] = useState();
    const [edname, setedName] = useState("");
    const [edgathererSpeed, setedSpeed] = useState(0);
    const [edtalent25, setedTalent] = useState(false);

    useEffect(() => {
        if(!selectedGatherer) return;
        let gatherer = settings.accounts[props.selectedAccount].gatherers[selectedGatherer];

        setedName(selectedGatherer);
        setedSpeed(gatherer.gathererBonus);
        setedTalent(gatherer.talent25)
    }, [selectedGatherer, setedName, setedSpeed, setedTalent]);

    const saveGatherer = (gthname, gthspeed, gthtalent) => {
        let newGatherer = {
            "gathererBonus": gthspeed,
            "talent25": gthtalent
        }
        if(settings.accounts[props.selectedAccount].gatherers[gthname]) {
            alert("Gatherer already exists");
            return;
        }
        settings.accounts[props.selectedAccount].gatherers[gthname] = newGatherer;

        setName("");
        setSpeed(0);
        setTalent(false);
        props.onGathererNameUpdate(gthname);
    }

    const onSave = () => {
        saveGatherer(name, gathererSpeed, talent25);
    }

    const onEdit = () => {
        onRemove();
        saveGatherer(edname, edgathererSpeed, edtalent25);
    }

    const onRemove = () => {
        delete settings.accounts[props.selectedAccount].gatherers[selectedGatherer];
        setSGatherer();
    }

    return (
        <div className="GathContainer">
            <h1>Gatherers</h1>
            <div className="GathForm">
                <h2>Create gatherer</h2>
                <label>Name:
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text"></input>
                </label>
                <label>Gatherer speed:
                    <input value={gathererSpeed} min="0" onChange={(e) => setSpeed(e.target.value)} type="number"></input>
                </label>
                <label>+25% talent:
                    <input checked={talent25} onChange={() => setTalent(!talent25)} type="checkbox"></input>
                </label>
                <button onClick={onSave}>Save</button>
            </div>
            <div className="GathForm">
                <h2>Edit gatherer</h2>
                <label>Gatherer:
                    {Object.keys(settings.accounts[props.selectedAccount].gatherers).length < 1 ? <span id="warning">Create a gatherer first</span> : 
                    <select onChange={(e) => setSGatherer(e.target.value)}>
                        <option/>
                        {Object.keys(settings.accounts[props.selectedAccount].gatherers).map((key, index) => {
                            return <option value={key} key={"gedit" + key+index}>{key}</option>
                        })}
                    </select>
                    }
                </label>
                <label>Name:
                    <input disabled={!selectedGatherer} value={edname} onChange={(e) => setedName(e.target.value)} type="text"></input>
                </label>
                <label>Gatherer speed:
                    <input disabled={!selectedGatherer} value={edgathererSpeed} min="0" onChange={(e) => setedSpeed(e.target.value)} type="number"></input>
                </label>
                <label>+25% talent:
                    <input disabled={!selectedGatherer} checked={edtalent25} onChange={() => setedTalent(!edtalent25)} type="checkbox"></input>
                </label>
                <button onClick={onRemove} disabled={!selectedGatherer}>Remove</button>
                <button onClick={onEdit} disabled={!selectedGatherer}>Edit</button>
            </div>
            
        </div>
    );
}

export default GathererBonuses;