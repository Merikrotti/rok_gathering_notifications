import { useSettingsContext } from "../../SettingsContext/SettingsContextBuilder";
import BonusesPopup from "./Popups/BonusesPopup";
import "../TimerStyles.css";
import TechBonuses from "./Popups/TechBonuses";
import GathererBonuses from "./Popups/GathererBonuses";

const AddBonuses = (props) => {
    const {createPopup} = useSettingsContext();

    const onPopupClick = () => {
        createPopup(<BonusesPopup/>)
    }

    //Open tech speed popup
    const onTSWindowClick = () => {
        createPopup(<TechBonuses name={props.selectedAccount}/>);
    }

    //Open gatherer window
    const onGSWindowClick = () => {
        createPopup(<GathererBonuses selectedAccount={props.selectedAccount}/>);
    }

    if(!props.selectedAccount) {
        return (<p>Fatal: No account selected</p>);
    }

    return (<div className="TimerFormsStyle">
        <div className="TitleAlign">
            <h2>Reduction settings</h2>
            <button onClick={(e) => onPopupClick(e)}>Help</button>
        </div>
        <div className="WindowPopups">
            <label>Gatherer speed window:
                <button onClick={onGSWindowClick}>Open</button>
            </label>
            <label>Tech speed window:
                <button onClick={onTSWindowClick}>Open</button>
            </label>
        </div>
    </div>)
}


export default AddBonuses;