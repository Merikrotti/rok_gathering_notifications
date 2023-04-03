import { useEffect, useState } from "react";
import Timer from "./Timer";

const TimerFilter = (props) => {

    const [timers, setTimers] = useState({});
    const [unique, setUnique] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filteredTimers, setFilteredTimers] = useState([]);

    const [isFinishedFilter, setIsFinished] = useState(false);

    useEffect(() => {
        let uniques = []
        Object.keys(timers).forEach((key) => {
            if(uniques.indexOf(timers[key].account) === -1 && timers[key].status === "active") {
                uniques.push(timers[key].account);
            }
        });
        setUnique(uniques);
        
    }, [timers, setUnique])

    useEffect(() => {
        console.log(filters);
        let newFilters = [];
        Object.keys(timers).forEach((key) => {
            if(timers[key].status === "removed") {
                return;
            }
            if(isFinishedFilter) {
                if(timers[key].isFinished === true && (filters.indexOf(timers[key].account) > -1 || filters.length <= 0)) {
                    console.log("true");
                    return;
                }
            } else if(filters.indexOf(timers[key].account) > -1 || filters.length <= 0) {
                return;
            }
            newFilters.push(key);
        });
        console.log(newFilters);
        setFilteredTimers(newFilters);
    }, [setFilteredTimers, filters, timers, isFinishedFilter])

    const updateStatus = (key, newData) => {
        if(JSON.stringify(timers[key]) === JSON.stringify(newData)) {
            return;
        }
        let temp = {};
        temp[key] = newData;
        setTimers(prev => ({...prev, ...temp}));
    }

    const filterUsed = (e) => {
        let indexOf = filters.indexOf(e.target.value);
        if(indexOf === -1) {
            setFilters(prev => [...prev, e.target.value]);
        } else {
            setFilters(filters.filter(item => item !== e.target.value));
        }

        console.log(indexOf + " " + filters);

        console.log(filters);
    }

    return (<div>
        <div className="TimerFilter">
            <div className="Filters">
                <p>Filters:</p>
                {unique.map((item, index) => <button key={item+index} onClick={(e) => filterUsed(e)} value={item}>{item}</button>)}
                {timers === {} ? "" : <button onClick={() => setIsFinished(!isFinishedFilter)} value="finished">Finished</button>}
            </div>
        </div>
        <div className="TimersContainer">
            {props.timers.map((item, index) => {
                return <Timer key={item.account + index} pKey={item.account + index} filteredTimers={filteredTimers} updateStatus={updateStatus} data={item}/>;
            })}
        </div>
        </div>)
}

export default TimerFilter;