import "./BPopup.css";
import "../../../GlobalStyles/Example.css";
import { useSettingsContext } from "../../../SettingsContext/SettingsContextBuilder";
import { useState } from "react";

const BonusesPopup = () => {
    const {settings} = useSettingsContext();
    const [jsonOpenedAll, setJSONopenedAll] = useState(false);

    return (<div className="BPopupContainer">
        <h1>Info</h1>
        <div>
            <h2>Creating a new account</h2>
            <p>Create a new account on the settings screen. If you mess up the name, you can change it on the tech speed window.</p>
            <p>If you want to remove an account, use the settings screen, or manually remove the data from the JSON file (see Saving section)</p>
            <p>This is so your tech speed and alliance speed bonuses will stay the same on all accounts and not all accounts.</p>
            <p>You can change the names of your profiles in the tech speed window</p>
            <p>Will also make multiple gathering profiles easier to manage!</p>
        </div>
        <div>
            <h2>What are these "speeds"?</h2>
            <p>Tech speed can be found by clicking your City Hall and selecting the graphs icon (4th option)</p>
            <p>Gatherer speed is the amount from skills, include second march aswell. 25% comes from the last talent.</p>
            <p>Enter the percentage into the boxes (74% would be 74, not 0.74), or change with the modify button</p>
        </div>
        <div>
            <h2>How can I save these?</h2>
            <p>You can currently save whem by pressing "Export" on the settings screen, next to the GitHub icon.</p>
            <p>To load them, press "Import" and select the settings file.</p>
            <h3>Is JSON malware? (Or am I downloading malware)</h3>
            <p>No, google what a JSON is before downloading. It is a good practice to not download everything you are sent.</p>
            <p>Here is the some of your JSON file:</p>
            <div className={`ExampleContainer ExampleCodeContainer ${jsonOpenedAll ? "" : "ExamplePreMaxSize"}`}>
                <span>Your settings file</span>
                <div>
                    <pre>{JSON.stringify(settings, null, 4)}</pre>
                    <button style={{width: "100%"}} onClick={() => setJSONopenedAll(!jsonOpenedAll)}>{jsonOpenedAll ? "Close" : "Open"} full json</button>
                </div>
            </div>
            <p>If you don't want to download anything, you can save this into <code style={{backgroundColor: "rgb(60, 60, 60)", padding:"2px"}}>whatever_name.json</code>, the 
                 <code style={{backgroundColor: "rgb(60, 60, 60)", padding:"2px"}}>.json</code> extension is important.
            </p>
            <p>You can then import it back and not have to download anything.</p>
        </div>
        <div>
            <h2>Pitfalls</h2>
            <h3>Tech speeds on city window.</h3>
            <div className="ExampleContainer">
                <span>Example</span>
                <div>
                    <span>You have the 50% active boost, it shows in the City Hall statistics, include it either in "Other Boosts"</span>
                    <span>or include it into the Food/Wood, etc. Otherwise you will have "too much boost" and the timer will be</span>
                    <span>more inaccurate than it already is.</span>
                    <span>Your bonus: 100%</span>
                    <span>- 50% speed from item</span>
                    <span>- 40% speed from tech</span>
                    <span>- 10% speed from alliance</span>
                    <span>= 50% speed, and 50% "other speeds". You can include this in the calculations, but keep the buff up all the time then!</span>
                </div>
            </div>
        </div>
        <div>
            <h2>Middleware</h2>
            <p>Connects a websocket to a specified server. It is TODO, and in the future is able to inject code into this page.</p>
            <p>Also able to start timers, using the server responses. Again. TODO</p>
            <div className="BPopupMiddlewareWarning">
                <span>DO NOT connect to ANY UNKNOWN SERVER IN ANY CIRCUMSTANCE:</span>
                <span>
                        They can write malware into this site and exploit your browser/operating system to download malware into your computer that can
                        steal passwords, lock your computer for ransom, spy on you etc...
                </span>
                <span>Read here: <a target="_blank" href="https://en.wikipedia.org/wiki/Malware#Malware">https://en.wikipedia.org/wiki/Malware#Malware</a></span>
            </div>
        </div>
    </div>);
}

export default BonusesPopup;