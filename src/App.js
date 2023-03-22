import { useState } from 'react';
import './App.css';
import Timer from './Timer.js'
import AddTimer from './AddTimer';

function App() {
  const [timers, setTimers] = useState([]);
  const [volume, setVolume] = useState(50);

  const addTime = (values) => {
    setTimers(a => [...a, values]);
  }

  return (
    <div className="App">
      <div className='volumecontrol'>
        <p>Volume</p>
        <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(e.target.value)}></input>
      </div>
      <AddTimer addtime={addTime}/>
      <div className="TimersContainer">
      {timers.map((item, index) => <Timer key={index} seconds={item[1]} name={item[0]} levels={item[2]} reduction={item[3]} volume={volume}/>)}
      </div>
      <div className="footercontainer">
        <div>
        <footer>This application is local and does not store your data outside this site. (unf) means unfinished.</footer>
        <footer>Created by Merikrotti. See github page for license. Things are still broken, but are being fixed.</footer>
        </div>
        <footer><a target="_blank" href="https://github.com/Merikrotti/rok_gathering_notifications"><img src={process.env.PUBLIC_URL + "/github.png"} alt="github-image"></img></a></footer>
      </div>
    </div>
    
  );
}


export default App;
