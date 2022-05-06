import {Link} from "react-router-dom";
import './Wrong.css';
import { importImage } from "./SharedFunctions";
import Variables from '../json/Wrong.json';


{
  var wrongMessage = Variables.wrong_message;
  

  //---------- images

  var wrongHeader = importImage(Variables.header);
  var homeIcon = importImage(Variables.homeIcon);
}

export default function Wrong() {

    return (
      <div>
        <div class="header header-style" style={{backgroundImage: `url(${wrongHeader})`}}>
            <h1>{wrongMessage}<br/>
              <div id="home-button"><Link to="/"><img src={homeIcon} alt="" height="50px" width="50px"/></Link></div>
            </h1>
          </div>
      </div>
      
    )
}