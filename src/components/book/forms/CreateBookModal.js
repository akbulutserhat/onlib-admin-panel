import { useState } from 'react';
import Alert from '../../utils/Alert';

const CreateBookModal = ({
  successMessage,
  setOpenCraeteModal,
  setFormData,
  isLoading,
  handleSubmitCreateBookForm,
}) => {
  const [showAlert, setShowAlert] = useState(false);

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
          onClick={() => setOpenCraeteModal(false)}
          className='close-button'>
          Close X
        </button>
        <div className='modal-guts'>
          <div className='modal-title'>
            <span>Create Book</span>
          </div>
          <div className='divider'></div>
          <div className='form-section'>
            <form onSubmit={handleSubmitCreateBookForm}>
              <div className='form-item'>
                <label>Title (Required)</label>
                <input
                  onChange={handleOnChange}
                  name='title'
                  required
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>Author</label>
                <input
                  onChange={handleOnChange}
                  name='author'
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>Image URL</label>
                <input
                  onChange={handleOnChange}
                  name='image'
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>Description</label>
                <textarea
                  onChange={handleOnChange}
                  rows='3'
                  name='descriptions'></textarea>
              </div>
              <div className='form-item'>
                <label>Read Pdf URL</label>
                <input
                  onChange={handleOnChange}
                  name='readLink'
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>
                  Categories (Use "," for add category) (Ex: Action,Classics )
                </label>
                <input
                  onChange={handleOnChange}
                  name='categories'
                  autoComplete='off'></input>
              </div>
              <div className='button-group'>
                <button
                  onClick={() => setOpenCraeteModal(false)}
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
            {showAlert && successMessage && (
              <Alert
                msg={successMessage}
                closeAlert={() => setShowAlert(false)}></Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBookModal;
