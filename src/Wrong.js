import './Tabs/Company.css';

export default function Wrong() {

    var wrongStyle = {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: '24px',
      height: '58.4vh',
      marginTop: '-50px',
      background: "lightGray",
      paddingTop: '200px'
    }

    return (
      <div>
        <div style={wrongStyle}>
          <a>The page you requested could not be found.</a>         
        </div>
      </div>
      
    )
}