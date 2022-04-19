import './Footer.css';

const jsonData = require('../json/companyWebsite.json');

{
    var footer = jsonData.footer;

    var email = footer.email;
    var author = footer.author;
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