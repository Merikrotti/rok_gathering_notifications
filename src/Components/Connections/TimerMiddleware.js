import { useState } from "react";
import { useSettingsContext } from "../SettingsContext/SettingsContextBuilder";
import './middleware.css';

// This code will NEVER RUN unless EXPLICITLY TOLD TO!
// See props.isEnabled in SettingsButton.js and SettingsContext!!

const TimerMiddleware = (props) => {

    const {settings} = useSettingsContext();
    
    const [ipAddr, setipAddr] = useState(settings.middleware.ipAddress);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [socket, setSocket] = useState(null);

    if(!props.isEnabled) {
        return (<div className="notEnabledMessage">
                <h3>Middleware is not enabled</h3>
                <p>If you don't know what you are doing, <span style={{color: "red"}}>!!NEVER!! ENABLE THIS</span>. If you are interested, see README on github.</p>
            </div>);
    }

    const onConnect = () => {
        let Tsocket = new WebSocket("ws://" + ipAddr);
        setStatus("Connecting...");
        
        setSocket(Tsocket);

        Tsocket.onopen = (e) => {
            setStatus("Connected! Responses in console.");
            Tsocket.send("Hello!");
        };

        Tsocket.onmessage = (e) => {
            console.log("[RESPONSE] " + e.data);
            /*let json = JSON.parse(e.data);
            try {
                if((json.event === "data")) {
                    console.log(json.data);
                }
            } catch (err) {
                setError("Error receivind. See console.");
                console.log(err)
            }*/
        }

        Tsocket.onclose = (e) => {
            if (e.wasClean) {
                setStatus("Connection closed!");
            } else {
                setStatus("Lost connection or no connection.");
            }
            setSocket(null);
        }
    }

    const onDisconnect = () => {
        try {
            socket.close();
        } catch (e) {
            console.log("[ERROR] Socket already closed: " + e);
            setError("Connection already closed, see console.");
        }
        setSocket(null);
    }

    return (<div>
        <h3>Middleware <span style={{color: "red"}}>!!ENABLED!!</span></h3>
        <label>IP:
            <input type="text" value={ipAddr} onChange={(e) => setipAddr(e.target.value)}></input>
        </label>
        {socket === null ? <button onClick={onConnect}>Connect</button> : <button onClick={onDisconnect}>Disconnect</button>}
        {error === "" ? "" : <p style={{color: "red"}}>{error}</p>}
        {status === "" ? "" : <p style={{color: "lightblue"}}>{status}</p>}
    </div>);
}

export default TimerMiddleware;