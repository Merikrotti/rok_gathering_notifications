
const BonusesPopup = () => {
    return (<div>
        <h1>Info</h1>
        <div>
            <h2>Creating a new account</h2>
            <p>This is so your tech speed and alliance speed bonuses will stay the same on all accounts and not all accounts.</p>
            <p>You can change the names of your profiles in the tech speed window</p>
            <p>Will also make multiple gathering profiles easier to manage!</p>
        </div>
        <div>
            <h2>What are these "speeds"?</h2>
            <p>Tech speed can be found by clicking your City Hall and selecting the graphs icon (4th option)</p>
            <p>Gatherer speed is the amount from skills, include second march aswell. 25% comes from the last talent.</p>
            <p>Enter the percentage into the boxes (74% would be 74%, not 0.74), or change with the modify button</p>
        </div>
        <div>
            <h2>Can you save these?</h2>
            <p>You can currently save whem by pressing "Export" on the settings screen, next to the GitHub icon.</p>
            <p>To load them, press "Import" and select the settings file.</p>
        </div>
        <div>
            <h2>Pitfalls</h2>
            <p>The tech speeds found by clicking your CH are everything active currently.</p>
            <p>Example:</p>
            <p>You have the 50% active boost, it shows in the City Hall statistics, include it either in "Other Boosts"</p>
            <p>or include it into the Food/Wood, etc. Otherwise you will have "too much boost" and the timer will be</p>
            <p>inaccurate more than it already is.</p>
        </div>
    </div>);
}

export default BonusesPopup;