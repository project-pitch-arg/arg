import './Header.css';

import textLogo from '../img/TestText-removebg-preview.png';

export default function Header(props) {

    return (
        <div className='header-content'>
            <div class='image-textLogo'>
                <img src={textLogo}></img>
            </div>       
       </div>
    ) 
}