const Alert = ({ msg, closeAlert }) => {
  return (
    <div
      className='alert alert-success alert-dismissible fade show 
      d-flex justify-content-between align-items-center'
      role='alert'>
      <span>{msg}</span>
      <button onClick={closeAlert} className='button button__icon button__blue'>
        X
      </button>
    </div>
  );
};

export default Alert;
