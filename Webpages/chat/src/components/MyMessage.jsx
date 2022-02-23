
const MyMessage = ({ message }) => {

  if(message.hasOwnProperty('custom_json') && typeof(message.custom_json) == 'string') {
    console.log("nice");
    return (
      <img
          src={message.custom_json[1]}
          alt="message-attachment"
          className="message-image"
          style={{ float: 'right' }}
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