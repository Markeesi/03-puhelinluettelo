const Notification = ({ message, type }) => {
    if (message === null) {
      return null;
    }
  
    const notificationStyle = {
      color: type === 'success' ? 'green' : 'red',
      background: 'lightgray',
      border: `2px solid ${type === 'success' ? 'green' : 'red'}`,
      padding: '10px',
    };
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    );
  };
  
  export default Notification;