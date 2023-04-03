import { useState } from "react";
import "../TimerStyles.css";

const CustomTimer = (props) => {
    const [name, setName] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [linkToAccount, setLink] = useState(false);

    const onSubmit = () => {
        let _seconds = Math.floor(parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 60 * 60);

        let data = {
            "type": "custom",
            "name": name === "" ? "Custom timer" : name,
            "seconds": _seconds
        }

        props.addTime(data);
    }

    return (<div className="TimerFormsStyle">
        <h2>Custom timers</h2>
        <label>Name:
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
        </label>
        <label>Hours:
            <input type="number" min="0" value={hours} onChange={(e) => setHours(e.target.value)}></input>
        </label>
        <label>Minutes:
            <input type="number" min="0" value={minutes} onChange={(e) => setMinutes(e.target.value)}></input>
        </label>
        <label>Seconds:
            <input type="number" min="0" value={seconds} onChange={(e) => setSeconds(e.target.value)}></input>
        </label>
        <label>Link to account:
            <input type="checkbox" checked={linkToAccount} onChange={() => setLink(!linkToAccount)}></input>
        </label>
        <div style={{marginTop: "10px"}} className="ButtonAlign">
            <button onClick={() => props.setCustom(false)}>Use set timers</button>
            <button id="add" onClick={onSubmit}>Add</button>
        </div>
    </div>);
}

export default CustomTimer;