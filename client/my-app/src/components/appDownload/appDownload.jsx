
import "./appDownload.css"
import { assest } from "../../assets/assets" 
export function AppDownload(){
    return(
        <div className="appDownload" id="appDownload">
    <div className="download-title">
    Download our app for a seamless and personalized food ordering experience!
    </div>
    <div className="download-img">
     <img src={assest.appstore} alt="" />
     <img src={assest.playstore} alt="" />
    </div>

        </div>
    )
}