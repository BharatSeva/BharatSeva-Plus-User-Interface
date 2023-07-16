import { useState } from "react"
import "./InsecureContent.css"
import { AlertTriangle } from "lucide-react"

export default function InsecureContent() {
    const [IsEnabled, SetIsEnabled] = useState({
        IsOk: false
    })
    
    return (
        <>
            <div className={`InsecureContent ${IsEnabled.IsOk ? "displaynoalert" : "Displayblur"}`}>
                <div className="insecurecontainertxt">
                    <div className="alerttextboxinsecure">
                        <AlertTriangle size={32} color="#ff0000" strokeWidth={2.75} absoluteStrokeWidth />
                        <p className="WarntextInscuerecontent">You need to Enable Insecure Content in your browser site setting else you will not able to connect with our server. </p>
                        <p className="WarntxtboxInsecure2">Why I need to do this ? <br /> <span className="Insecuretxtans">Our Site uses HTTPS protocol but the API is on HTTP protocol, which by default is restricted in most browsers for the security reasons (Known as Mixed Content), which is for good actually, including Google Chrome !
                            <br />
                            By enabling it, you will allow your browser to use API HTTP protocol in our website and nothing else.</span>
                        </p>
                        <p className="WarntxtboxInsecure2">Will it compromise my security ? <br /> <span className="Insecuretxtans">Absolutely not, this project is only for demonstration purpose.</span></p>
                        <button onClick={(e) => SetIsEnabled((e) => ({ ...e, IsOk: true }))}>I Understand</button>
                    </div>
                </div>
            </div>
        </>
    )
}