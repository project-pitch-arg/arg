import './Header.css';
import logo from '../img/TestLogo.png';

export default function Header(props) {

    return (
        <div className='header-content'>
            <img src={logo} width="150px" height="100px" />
            <div id='left' class="title">
                <a>Daily Thoughts <br/></a>
            </div>
       </div>
    ) 
}