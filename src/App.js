import { createContext, useState } from 'react';
import './App.css';
import TimerControls from './Components/Timer/TimerControls';
import SettingsContextBuilder from './Components/SettingsContext/SettingsContextBuilder';
import SettingsButton from './Components/Settings/SettingsButton';
import PopupBuilder from './Components/Popup/PopupBuilder';

function App() {
  const [volume, setVolume] = useState(50);

  return (
    <SettingsContextBuilder>
    <div className="App">
      <PopupBuilder/>
      <TimerControls/>
      <div className="footercontainer">
        <div>
        <footer>This application is local and does not store your data outside this site. (unf) means unfinished.</footer>
        <footer>Created by Merikrotti. See github page for license. Things are still broken, but are being fixed.</footer>
        </div>
        <footer><SettingsButton /><a target="_blank" href="https://github.com/Merikrotti/rok_gathering_notifications"><img src={process.env.PUBLIC_URL + "/github.png"} alt="github-image"></img></a></footer>
      </div>
    </div>
    </SettingsContextBuilder>
  );
}


export default App;
