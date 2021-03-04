import { useState } from 'react';

const OrderModal = ({ setOpenOrderModal, order, isLoading }) => {
  let { _id, books, user, status } = order;
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
    return (
      <label key={index} className='m-2'>
        <input type='radio' name='radio' value={name} />
        <div className='box'>
          <span>{name}</span>
        </div>
      </label>
    );
  });

  const clearFormData = () => {
    setFormData(null);
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
    console.log(formData);
    console.log(checkedStatus?.value);
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
                <form>
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
                </form>
              </div>
            )}
            <div className='button-group'>
              <button
                onClick={() => setOpenOrderModal(false)}
                className='button button__white button__small mr-3'>
                Cancel
              </button>
              <button
                type='submit'
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
