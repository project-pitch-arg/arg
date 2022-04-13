import './Footer.css';

export default function Footer() {

    return (
        <div className='footer-content'>
            <div id='left'>
                <a>Contact Information: <br/></a>
                <ul>
                    <li>Tel.: +46 70 000 00 00</li>
                    <li>E-Mail: email@example.com</li>
                </ul>
            </div>

            <div id='right'>
                <a> Website written and
                <br/>
                developed by Lyra Bell </a>
            </div>
        </div>
    ) 
}