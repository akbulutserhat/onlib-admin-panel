const Alert = ({ msg }) => {
    return (
      <div className='alert alert-info alert-dismissible fade show' role='alert'>
        {msg}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
        </button>
      </div>
    );
  };
  
  export default Alert;