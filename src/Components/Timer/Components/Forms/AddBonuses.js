import { useSettingsContext } from "../../../Contexts/SettingsContextBuilder";
import BonusesPopup from "../Popups/BonusesPopup";
import "../css/TimerStyles.css";
import TechBonuses from "../Popups/TechBonuses";
import GathererBonuses from "../Popups/GathererBonuses";
import { useDataContext } from "../../../Contexts/DataContext";
import { useEffect, useState } from "react";

const AddBonuses = () => {

    const {selectedAccount, onGathererNameUpdate} = useDataContext();
    const {createPopup} = useSettingsContext();

    const [noAccount, setNoAccount] = useState();

    useEffect(() => {
        if(!selectedAccount) {
            setNoAccount(true);
            return;
        }

        setNoAccount(false);
    }, [selectedAccount]);

    const onPopupClick = () => {
        createPopup(<BonusesPopup/>)
    }

    //Open tech speed popup
    const onTSWindowClick = () => {
        createPopup(<TechBonuses name={selectedAccount}/>);
    }

    //Open gatherer window
    const onGSWindowClick = () => {
        createPopup(<GathererBonuses selectedAccount={selectedAccount} onGathererNameUpdate={onGathererNameUpdate}/>);
    }

    return (<div className="TimerFormsStyle">
        <div className="TitleAlign">
            <h2>Create account</h2>
            <button onClick={(e) => onPopupClick(e)}>Help</button>
        </div>
        <div className="WindowPopups">
            <label>Gatherer speed window:
                <button onClick={onGSWindowClick} disabled={noAccount}>Open</button>
            </label>
            <label>Tech speed window:
                <button onClick={onTSWindowClick} disabled={noAccount}>Open</button>
            </label>
        </div>
        {noAccount ? <p>Fatal: No account created. Open settings to create one.</p> : ""}
    </div>)
}


export default AddBonuses;