import {Link} from "react-router-dom";
import './Tabs/Company.css';
import './Wrong.css';

import WrongHeader from './img/wrong-header.jpg';
import HomeIcon from './img/home-icon.png'

export default function Wrong() {

    return (
      <div>
        <div class="header header-style" style={{backgroundImage: `url(${WrongHeader})`}}>
            <h1>The page you requested <br /> could not be found!<br/>
              <div id="home-button"><Link to="/"><img src={HomeIcon} alt="" height="50px" width="50px"/></Link></div>
            </h1>
          </div>
      </div>
      
    )
}