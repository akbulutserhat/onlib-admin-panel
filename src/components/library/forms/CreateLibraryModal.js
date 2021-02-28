const CreateLibraryModal = ({
  setOpenCreateModal,
  setFormData,
  isLoading,
  handleSubmitCreateLibraryForm,
}) => {
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className='modal-overlay'></div>
      <div className='custom-modal'>
        <button
          onClick={() => setOpenCreateModal(false)}
          className='close-button'>
          Close X
        </button>
        <div className='modal-guts'>
          <div className='modal-title'>
            <span>Create Library</span>
          </div>
          <div className='divider'></div>
          <div className='form-section'>
            <form onSubmit={handleSubmitCreateLibraryForm}>
              <div className='form-item'>
                <label>Name (Required)</label>
                <input
                  onChange={handleOnChange}
                  name='name'
                  required
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>Address (Required)</label>
                <input
                  onChange={handleOnChange}
                  name='address'
                  required
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>City (Required)</label>
                <input
                  onChange={handleOnChange}
                  name='city'
                  required
                  autoComplete='off'></input>
              </div>
              <div className='button-group'>
                <button
                  onClick={() => setOpenCreateModal(false)}
                  className='button button__white button__small mr-3'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='button button__blue button__small'>
                  {isLoading ? 'Loading ...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLibraryModal;
