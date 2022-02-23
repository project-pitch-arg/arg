
const MyMessage = ({ message }) => {

  //Problem here!! Entered to often, even when it there is no picture.
  if(message.hasOwnProperty('custom_json') && message.custom_json.length > 2 && typeof(message.custom_json) == 'string') {
    return (
      
      <img
          src={message.custom_json}
          alt="message-attachment"
          className="message-image"
          style={{ float: 'right' , backgroundColor: '#500000'}}
        />

    ) 
  }

  if (message.attachments && message.attachments.length > 0) {
    console.log(message.attachments)  
    return (
        <img
          src={message.attachments[0].file}
          alt="message-attachment"
          className="message-image"
          style={{ float: 'right' }}
        />
      );
    }
    
    return (
      <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
        {message.text}
      </div>
    );
  };
  
  export default MyMessage;