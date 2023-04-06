import { createContext, useState } from 'react';
import './App.css';
import TimerControls from './Components/Timer/TimerControls';
import SettingsContextBuilder from './Components/Contexts/SettingsContextBuilder';
import SettingsButton from './Components/Settings/SettingsButton';
import PopupBuilder from './Components/Popup/PopupBuilder';

function App() {
  return (
    <SettingsContextBuilder>
    <div className="App">
      <PopupBuilder/>
      <TimerControls/>
      <div className="footercontainer">
        <div>
        <footer>(C) Merikrotti GPLv3. See github readme for bugs. V0.11</footer>
        </div>
        <footer><SettingsButton /><a target="_blank" href="https://github.com/Merikrotti/rok_gathering_notifications"><img src={process.env.PUBLIC_URL + "/github.png"} alt="github-image"></img></a></footer>
      </div>
    </div>
    </SettingsContextBuilder>
  );
}


export default App;
