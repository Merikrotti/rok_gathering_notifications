import { useState } from 'react';
import './App.css';
import Timer from './Timer.js'

function App() {
  const [timers, setTimers] = useState([]);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(30);
  const [volume, setVolume] = useState(50);
  const [name, setName] = useState("");

  const addTimer = (e) => {
    e.preventDefault();
    setTimers(a => [...a, [minutes, seconds, name]]);
  }

  return (
    <div className="App">
      <div className='volumecontrol'>
        <p>Volume</p>
        <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(e.target.value)}></input>
      </div>
      
      <div className="TimerAdder"><h2>Add timer</h2>
      <label>Name (Can be blank):
      <input type="text" id="name" onInput={e => setName(e.target.value)}></input>
      </label>
      <label>Minutes:
      <input type="number" min="0" value={minutes} onInput={e => setMinutes(e.target.value)}></input>
      </label>
      <label>Seconds:
      <input type="number" min="0" max="60" value={seconds} onInput={e => setSeconds(e.target.value)}></input>
      </label>
      <button onClick={addTimer}>Add</button>
      </div>
      <div className="TimersContainer">
      {timers.map((item, index) => <Timer key={index} minutes={item[0]} seconds={item[1]} name={item[2]} volume={volume}/>)}
      </div>
    </div>
    
  );
}

export default App;
