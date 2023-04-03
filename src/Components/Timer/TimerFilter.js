
const TimerFilter = (props) => {

    return (<div>
        <div className="TimerFilter">
            <div className="Filters">
                <p>Filters:</p>
            </div>
        </div>
        {props.children}
        </div>)
}

export default TimerFilter;