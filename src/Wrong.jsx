import {Link} from "react-router-dom";
import './Tabs/Company.css';
import './Wrong.css';
import { WRONG_HEADER, HOME_ICON } from "./ImageImports";

const jsonData = require('./json/companyWebsite.json');

{
  var wrong = jsonData.wrong;

  var wrongMessage = wrong.wrong_message;
  

  //---------- images

  var wrongHeader = WRONG_HEADER;
  var homeIcon = HOME_ICON;
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