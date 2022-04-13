import {Link} from "react-router-dom";
import './Tabs/Company.css';
import './Wrong.css';
import { WRONG_HEADER, HOME_ICON } from "./ImageImports";

{
  var wrongHeader = WRONG_HEADER;
  var homeIcon = HOME_ICON;
}

export default function Wrong() {

    return (
      <div>
        <div class="header header-style" style={{backgroundImage: `url(${wrongHeader})`}}>
            <h1>The page you requested <br /> could not be found!<br/>
              <div id="home-button"><Link to="/"><img src={homeIcon} alt="" height="50px" width="50px"/></Link></div>
            </h1>
          </div>
      </div>
      
    )
}