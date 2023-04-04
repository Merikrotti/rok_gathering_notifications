import AddBonuses from "./Components/AddBonuses";
import AddTimer from "./Components/AddTimer";
import CustomTimer from "./Components/CustomTimer";
import { useState } from "react";
import "./TimerStyles.css";
import TimerFilter from "./TimerFilter";
import SelectAccount from "./SelectAccount";


const TimerControls = (props) => {
    const [timers, setTimers] = useState([]);
    const [isCustom, setCustom] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState();

    const addTime = (values) => {
        setTimers(a => [...a, values]);
    }
    return (
    <div>
    <div>
        {isCustom ?
        <div className="TimerFormsContainer">
            <SelectAccount setSelectedAccount={setSelectedAccount}/>
            <CustomTimer setCustom={setCustom} addTime={addTime} selectedAccount={selectedAccount}/>
        </div>
        :
        <div className="TimerFormsContainer">
            <SelectAccount setSelectedAccount={setSelectedAccount}/>
            <div/>
            <AddTimer addTime={addTime} selectedAccount={selectedAccount} setCustom={setCustom}/>
            <AddBonuses selectedAccount={selectedAccount}/>
        </div>
        }
        <TimerFilter timers={timers}/>
    </div>
    </div>
    );
}

export default TimerControls;