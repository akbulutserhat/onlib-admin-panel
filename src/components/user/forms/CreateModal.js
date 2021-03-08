import { addUser } from '../../../store/modules/user/user.action';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const CreateUserModal = ({ setOpenCreateModal, isLoading }) => {
  let [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
  });
  const dispatch = useDispatch();
  const statusNames = ['basic', 'supervisor', 'admin'];

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
    const { fullName, email, role, password } = formData;
    console.log(role);
    dispatch(addUser({ fullName, email, role, password }));
    e.target.reset();
    setFormData({});
  };

  const roleRadioButtons = statusNames.map((name, index) => {
    return (
      <label key={index} className='m-2'>
        <input type='radio' name='radio' value={name} />
        <div className='box'>
          <span>{name}</span>
        </div>
      </label>
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
            <span>Create Library</span>
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
