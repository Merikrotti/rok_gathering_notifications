import AddBonuses from "./Components/AddBonuses";
import AddTimer from "./Components/AddTimer";
import CustomTimer from "./Components/CustomTimer";
import { useState } from "react";
import Timer from "./Timer"
<<<<<<< HEAD
=======
import "./TimerStyles.css";

>>>>>>> 8a09dda (moved CSS, tech window)

const TimerControls = (props) => {
    const [timers, setTimers] = useState([]);
    const [gatherers, setGatherers] = useState([]);
    const [isCustom, setCustom] = useState(false);

    const addTime = (values) => {
        setTimers(a => [...a, values]);
    }

    const addGatherer = (values) => {
        setGatherers(a => [...a, values])
    }
    return (
    <div>
        
        {isCustom ?
        <div className="TimerForms">
            <CustomTimer setCustom={setCustom} addTime={addTime}/>
        </div>
        :
        <div className="TimerForms">
            <AddTimer addTime={addTime} gatherers={gatherers} setCustom={setCustom}/>
            <AddBonuses addGatherer={addGatherer}/>
        </div>
        }
        <div className="TimersContainer">
            {timers.map((item, index) => <Timer key={index} data={item}/>)}
        </div>
    </div>
    );
}

export default TimerControls;