import { useEffect, useState } from "react";
import { useDataContext } from "../../../Contexts/DataContext";
import "../css/FilterStyles.css";
import "../../../GlobalStyles/CustomButton.css"

const TimerFilter = (props) => {
    const {setFilteredTimers, activeTimers} = useDataContext();

    const [unique, setUnique] = useState([]);
    const [filters, setFilters] = useState([]);

    const [isFinishedFilter, setIsFinished] = useState(false);

    useEffect(() => {
        let uniques = []
        Object.keys(activeTimers).forEach((key) => {
            if(uniques.indexOf(activeTimers[key].account) === -1 && activeTimers[key].status === "active") {
                uniques.push(activeTimers[key].account);
            }
        });
        setUnique(uniques);
        
    }, [activeTimers, setUnique])

    useEffect(() => {
        let newFilters = [];
        Object.keys(activeTimers).forEach((key) => {
            if(activeTimers[key].status === "removed") {
                return;
            }
            if(isFinishedFilter) {
                if(activeTimers[key].isFinished === true && (filters.indexOf(activeTimers[key].account) > -1 || filters.length <= 0)) {
                    return;
                }
            } else if(filters.indexOf(activeTimers[key].account) > -1 || filters.length <= 0) {
                return;
            }
            newFilters.push(key);
        });
        setFilteredTimers(newFilters);
    }, [setFilteredTimers, filters, activeTimers, isFinishedFilter])

    const filterUsed = (e) => {
        let indexOf = filters.indexOf(e.target.value);
        if(indexOf === -1) {
            setFilters(prev => [...prev, e.target.value]);
        } else {
            setFilters(filters.filter(item => item !== e.target.value));
        }

    }
    return (<div className="TimerFormsStyle">
            <div className="FiltersContainer">
                <div>
                    <h2>Filters</h2>
                    <button className="CustomButton" id="active" onClick={() => props.setHide(true)}>Hide Forms</button>
                </div>
                <div className="Filters">
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
        </div>)
}

export default TimerFilter;