import "./Header.css";
import home from "../TopBar/TopBar";
import {Link} from "react-router-dom";
import textLogo from "../Img/Title.png";

export default function Header(props) {

    return (
        <div className="header-content">
            <Link onClick={home} to="/">
            <div className="image-text-logo">
                <img src={textLogo}></img>
            </div>       
            </Link>
       </div>
    ) 
}