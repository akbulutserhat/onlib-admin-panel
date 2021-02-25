const UpdateBookModal = ({
  setOpenUpdateModal,
  handleSubmitUpdateBook,
  isLoading,
  updateFormData,
  setUpdateFormData,
}) => {
  const handleUpdateChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };
  const formItems = Object.entries(updateFormData ? updateFormData : {}).map(
    (entry, index) => {
      if (entry[0] == 'id') return;
      if (entry[0] == 'descriptions') {
        return (
          <div className='form-item' key={index}>
            <label>{entry[0]}</label>
            <textarea
              name={entry[0]}
              rows='4'
              onChange={handleUpdateChange}
              autoComplete='off'
              value={entry[1]}
            />
          </div>
        );
      }
      return (
        <div className='form-item' key={index}>
          <label>{entry[0]}</label>
          <input
            name={entry[0]}
            onChange={handleUpdateChange}
            autoComplete='off'
            value={entry[1]}
          />
        </div>
      );
    }
  );

  return (
    <>
      <div className='modal-overlay'></div>
      <div className='custom-modal'>
        <button
          onClick={() => setOpenUpdateModal(false)}
          className='close-button'>
          Close X
        </button>
        <div className='modal-guts'>
          <div className='modal-title'>
            <span>Update Book</span>
          </div>
          <div className='divider'></div>
          <div className='form-section'>
            <form onSubmit={handleSubmitUpdateBook}>
              {formItems}
              <div className='button-group'>
                <button
                  onClick={() => setOpenUpdateModal(false)}
                  className='button button__white button__small mr-3'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='button button__blue button__small'>
                  {isLoading ? 'Loading ...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBookModal;
