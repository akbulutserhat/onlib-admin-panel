import { addUser } from '../../../store/modules/user/user.action';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RadioBox from '../../utils/RadioBox';
import { getLibraries } from '../../../store/modules/library/library.action';

const CreateUserModal = ({ setOpenCreateModal, isLoading }) => {
  let [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    library: '',
    password: '',
  });
  const [showLibraryList, setShowLibraryList] = useState(false);
  const dispatch = useDispatch();
  const libraryState = useSelector((state) => state.Library);
  const { libraries } = libraryState;
  const roleNames = ['basic', 'supervisor', 'admin'];

  useEffect(() => {
    dispatch(getLibraries());
  }, []);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCreateUserForm = (e) => {
    e.preventDefault();
    const checkedRole = document.querySelector('input[type="radio"]:checked');
    if (!checkedRole) {
      console.log('You must select role'); // It will be alert
      return;
    }

    formData.role = checkedRole.value;
    const { fullName, email, role, password, library } = formData;
    dispatch(addUser({ fullName, email, role, password, library }));
    e.target.reset();
    setFormData({});
  };

  const handleChangeRadioButton = () => {
    const checkedValue = document.querySelector('input[type="radio"]:checked')
      .value;

    if (checkedValue == 'supervisor') {
      setShowLibraryList(true);
    } else {
      setFormData({ ...formData, library: '' });
      setShowLibraryList(false);
    }
  };

  const roleRadioButtons = roleNames.map((name, index) => {
    return (
      <RadioBox
        key={index}
        name={name}
        onChange={handleChangeRadioButton}></RadioBox>
    );
  });

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
            <span>Create User</span>
          </div>
          <div className='divider'></div>
          <div className='form-section form-section__h88'>
            <form onSubmit={handleSubmitCreateUserForm}>
              <div className='form-item'>
                <label>Full Name (Required)</label>
                <input
                  onChange={handleOnChange}
                  name='fullName'
                  required
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>Email (Required)</label>
                <input
                  onChange={handleOnChange}
                  name='email'
                  required
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>Password (Required)</label>
                <input
                  onChange={handleOnChange}
                  type='password'
                  name='password'
                  required
                  autoComplete='off'></input>
              </div>
              <div className='form-item'>
                <label>Role (Required)</label>

                <div className='d-flex justify-content-center align-items-center'>
                  {roleRadioButtons}
                </div>
              </div>

              {showLibraryList && (
                <div className='form-item'>
                  <label>Choose Library</label>
                  <select onChange={handleOnChange} name='library'>
                    {libraries.map((library) => {
                      return (
                        <option key={library._id} value={library._id}>
                          {library.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
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

export default CreateUserModal;
