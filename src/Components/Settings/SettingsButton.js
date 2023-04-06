import { useSettingsContext } from "../Contexts/SettingsContextBuilder";
import 'font-awesome/css/font-awesome.min.css';
import './settings.css';
import SettingsPage from "./SettingsPage";


// Make Popupbuilder build a popup for settings and save them to SettingsContext
const SettingsButton = () => {
    const {createPopup} = useSettingsContext();

    const handleClick = () => {
        createPopup(<SettingsPage/>);
    }


    return (
        <div className='popupGearContainer'>
            <i className='popupGearIcon fa fa-gear' onClick={handleClick}/>
        </div>
    );
}

export default SettingsButton;