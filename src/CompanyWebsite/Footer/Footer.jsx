import './Footer.css';
import Variables from '../../json/Footer.json';


{
    var email = Variables.email;
    var author = Variables.author;
}

export default function Footer() {

    return (
        <div className='footer-content'>
            <div id='left'>
                <a>Contact Information:</a>
                <br></br>
                <a>{email}</a>
            </div>

            <div id='right'>
                <a> Website written and
                <br/>
                developed by {author} </a>
            </div>
        </div>
    ) 
}