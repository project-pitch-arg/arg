
const MyMessage = ({ message }) => {

  if(message.custom_json.length > 2) {
    return (
      <div style={{overflow: 'hidden'}}>
       <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: 'hsl(93, 27%, 45%)' }}>
        {message.text}
       </div>
       <img
          src={message.custom_json}
          alt="message-attachment"
          className="message-image"
          style={{ float: 'right', clear: 'both', marginTop: '5px'}}
        />
      </div>

    ) 
  }

  if (message.attachments && message.attachments.length > 0) {  
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
      <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: 'hsl(93, 27%, 45%)' }}>
        {message.text}
      </div>
    );
  };
  
  export default MyMessage;