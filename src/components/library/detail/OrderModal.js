import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateOrderStatus,
  addUserToLibrary,
} from '../../../store/modules/library/detail/detail.action';
import RadioBox from '../../utils/RadioBox';

const OrderModal = ({ setOpenOrderModal, order, isLoading }) => {
  let { _id, books, user } = order;
  const params = useParams();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ ssn: '', phone: '' });
  const statusNames = ['preparing', 'ready', 'delivered', 'received'];

  const bookList = books?.map((book, index) => {
    const { image, title } = book;
    return (
      <li className='book-item p-2' key={index}>
        <img
          style={{ width: '30px', height: '30px' }}
          className='mr-2'
          src={image}></img>
        <span>{title}</span>
      </li>
    );
  });

  const statusRadioButtons = statusNames.map((name, index) => {
    return <RadioBox key={index} name={name}></RadioBox>;
  });

  const clearFormData = () => {
    setFormData({ ssn: '', phone: '' });
  };

  const handleClickShowForm = () => {
    setShowForm(!showForm);
    clearFormData();
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateOrder = () => {
    const checkedStatus = document.querySelector('input[type="radio"]:checked');
    if (!checkedStatus) {
      console.log('You must select status'); // It will be alert
      return;
    }
    dispatch(
      updateOrderStatus({
        libraryId: params.id,
        orderId: _id,
        status: checkedStatus.value,
      })
    );
    if (formData && formData.ssn !== '' && formData.phone !== '') {
      dispatch(
        addUserToLibrary({
          libraryId: params.id,
          userId: user._id,
          userData: formData,
        })
      );
    }
  };

  return (
    <>
      <div className='modal-overlay'></div>
      <div className='custom-modal'>
        <button
          onClick={() => setOpenOrderModal(false)}
          className='close-button'>
          Close X
        </button>
        <div className='modal-guts'>
          <div className='modal-title'>
            <span>Order </span>
            <span className='order-id'>#{_id}</span>
          </div>
          <div className='divider'></div>
          <div className='form-section'>
            <div className='user-info'>
              <span>Customer : </span>
              <span className='customer-name'>Serhat Akbulut</span>
            </div>
            <div className='book-list-section'>
              <span className='list-title'>Book List</span>
              <ul className='book-list'>{bookList}</ul>
            </div>

            <div className='status-section'>
              <span>Choose the status of order</span>
              <div>{statusRadioButtons}</div>
            </div>
            <button
              className='open-form-button my-3'
              onClick={handleClickShowForm}>
              {!showForm ? 'Open User Form' : 'Close User Form'}
            </button>
            {showForm && (
              <div className='add-user-form'>
                <div className='form-item'>
                  <label>SSN</label>
                  <input
                    name='ssn'
                    required
                    autoComplete='off'
                    onChange={handleOnChange}></input>
                </div>
                <div className='form-item'>
                  <label>Phone</label>
                  <input
                    name='phone'
                    required
                    autoComplete='off'
                    onChange={handleOnChange}></input>
                </div>
              </div>
            )}
            <div className='button-group'>
              <button
                onClick={() => setOpenOrderModal(false)}
                className='button button__white button__small mr-3'>
                Cancel
              </button>
              <button
                onClick={handleUpdateOrder}
                className='button button__blue button__small'>
                {isLoading ? 'Loading ...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
