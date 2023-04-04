import { useEffect, useState } from "react";
import Timer from "./Timer";
import "./FilterStyles.css";

const TimerFilter = (props) => {

    const [timers, setTimers] = useState({});
    const [unique, setUnique] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filteredTimers, setFilteredTimers] = useState([]);

    const [isFinishedFilter, setIsFinished] = useState(false);

    const [hideFilters, setHide] = useState(false);

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
        let newFilters = [];
        Object.keys(timers).forEach((key) => {
            if(timers[key].status === "removed") {
                return;
            }
            if(isFinishedFilter) {
                if(timers[key].isFinished === true && (filters.indexOf(timers[key].account) > -1 || filters.length <= 0)) {
                    return;
                }
            } else if(filters.indexOf(timers[key].account) > -1 || filters.length <= 0) {
                return;
            }
            newFilters.push(key);
        });
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

    }
    if(timers === {}) {
        return;
    }

    return (<div className="TimersContainer">
        {!hideFilters ?
        <div className="FiltersContainer">
            <div className="Filters">
                <div>
                    <h2>Filters</h2>
                    <button className="CustomButton" id="active" onClick={() => setHide(!hideFilters)}>Hide Filters</button>
                </div>
                <div className="AccountFilters">
                    <h3>Account filters</h3>
                    {unique.map((item, index) => <button className="CustomButton" id={filters.indexOf(item) > -1 ? 'active' : 'disabled'} key={item+index} onClick={(e) => filterUsed(e)} value={item}>{item}</button>)}
                </div>
                <div className="SetFilters">
                    <h3>Set filters</h3>
                    <button className="CustomButton" id={isFinishedFilter ? 'active' : 'disabled'} onClick={() => setIsFinished(!isFinishedFilter)} value="finished">Finished</button>
                </div>
            </div>
        </div>
        : <button className="CustomButton" id="disabled" style={{position: "absolute", right: "30px", top: "40px"}} onClick={() => setHide(!hideFilters)}>Show filters</button>}
        <div className="Timers">
            {props.timers.map((item, index) => {
                return <Timer key={item.account + index} pKey={item.account + index} filteredTimers={filteredTimers} updateStatus={updateStatus} data={item}/>;
            })}
        </div>
        </div>)
}

export default TimerFilter;