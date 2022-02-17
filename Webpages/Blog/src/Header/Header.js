import './Header.css';
import home from '../TopBar/TopBar';
import {Link} from 'react-router-dom';
import textLogo from '../img/TestText-removebg-preview.png';

export default function Header(props) {

    return (
        <div className='header-content'>
            <Link onClick={home} to='/'>
            <div class='image-textLogo'>
                <img src={textLogo}></img>
            </div>       
            </Link>
       </div>
    ) 
}