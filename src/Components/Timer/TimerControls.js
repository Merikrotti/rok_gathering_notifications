import AddBonuses from "./Components/AddBonuses";
import AddTimer from "./Components/AddTimer";
import CustomTimer from "./Components/CustomTimer";
import { useState } from "react";
import Timer from "./Timer"
import "./TimerStyles.css";
import TimerFilter from "./TimerFilter";
import SelectAccount from "./SelectAccount";


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
    <div>
        {isCustom ?
        <div className="TimerForms">
            <CustomTimer setCustom={setCustom} addTime={addTime}/>
        </div>
        :
        <div className="TimerFormsContainer">
            <SelectAccount/>
            <div className="TimerForms">
                <AddTimer addTime={addTime} gatherers={gatherers} setCustom={setCustom}/>
                <AddBonuses addGatherer={addGatherer}/>
            </div>
        </div>
        }
        <TimerFilter>
        <div className="TimersContainer">
            {timers.map((item, index) => <Timer key={index} data={item}/>)}
        </div>
        </TimerFilter>
    </div>
    </div>
    );
}

export default TimerControls;