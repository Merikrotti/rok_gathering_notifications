import { useSettingsContext } from '../Contexts/SettingsContextBuilder';
import Popup from './Popup';

const PopupBuilder = () => {
  const {children, popupState, closePopup} = useSettingsContext();
  return (
    <div>
        {popupState && (
        <Popup>
          {children}
          <button className='closeButton' onClick={e => closePopup()}>Close</button>
        </Popup>
      )}
    </div>
  );
}

export default PopupBuilder;