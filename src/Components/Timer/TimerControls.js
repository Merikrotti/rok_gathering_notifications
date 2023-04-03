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
    const [selectedAccount, setSelectedAccount] = useState();

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
        <div className="TimerFormsContainer">
            <SelectAccount setSelectedAccount={setSelectedAccount}/>
            <CustomTimer setCustom={setCustom} addTime={addTime}/>
        </div>
        :
        <div className="TimerFormsContainer">
            <SelectAccount setSelectedAccount={setSelectedAccount}/>
            <div/>
            <AddTimer addTime={addTime} gatherers={gatherers} selectedAccount={selectedAccount} setCustom={setCustom}/>
            <AddBonuses selectedAccount={selectedAccount} addGatherer={addGatherer}/>
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