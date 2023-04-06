import AddBonuses from "./Components/Forms/AddBonuses";
import AddTimer from "./Components/Forms/AddTimer";
import CustomTimer from "./Components/Forms/CustomTimer";
import { useState } from "react";
import "./Components/css/TimerStyles.css";
import SelectAccount from "./Components/Forms/SelectAccount";
import Timer from "./Components/Timer";
import DataContextBuilder, { useDataContext } from "../Contexts/DataContext";
import TimerFilter from "./Components/Forms/FilterTimers";


const TimerControls = () => {
    const [isCustom, setCustom] = useState(false);
    const [hideForms, setHide] = useState(false);
    

    return (
    <DataContextBuilder>
    {hideForms ?
    <div>
    <button onClick={() => setHide(!hideForms)}>Show</button>
    </div>
    :
    <div>
        {isCustom ?
        <div className="TimerFormsContainer">
            <SelectAccount/>
            <CustomTimer setCustom={setCustom}/>
        </div>
        :
        <div className="TimerFormsContainer">
            <AddBonuses/>
            <SelectAccount/>
            <AddTimer setCustom={setCustom}/>
            <TimerFilter setHide={setHide}/>
        </div>
        }
    </div>
    }
    <Timers/>
    </DataContextBuilder>
    );
}


const Timers = () => {
    const {timers} = useDataContext();

    return (
    <div className="Timers">
        {timers.map((item, index) => {
            return <Timer key={item.account + index} pKey={item.account + index} data={item}/>;
        })}
    </div>);
    
}

export default TimerControls;