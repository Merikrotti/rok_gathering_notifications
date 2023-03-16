import { useState } from 'react';
import './App.css';
import Timer from './Timer.js'

function App() {
  const [timers, setTimers] = useState([]);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(30);

  const addTimer = (e) => {
    e.preventDefault();
    setTimers(a => [...a, [minutes, seconds]]);
  }

  return (
    <div className="App">
      <div className="TimerAdder"><h2>Add timer</h2>
      <label>Minutes:
      <input type="number" min="0" value={minutes} onInput={e => setMinutes(e.target.value)}></input>
      </label>
      <label>Seconds:
      <input type="number" min="0" max="60" value={seconds} onInput={e => setSeconds(e.target.value)}></input>
      </label>
      <button onClick={addTimer}>Add</button>
      </div>
      {timers.map((item, index) => <Timer key={index} minutes={item[0]} seconds={item[1]}/>)}
    </div>
  );
}

export default App;
