import { useState } from 'react';

const OrderModal = ({ setOpenOrderModal, order, isLoading }) => {
  const { _id, books, user, status } = order;
  const [showForm, setShowForm] = useState(false);

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
            <div className='user-info'>Serhat Akbulut</div>
            <ul className='book-list'>{bookList}</ul>
            <div className='status-section'>{status}</div>
            <button
              className='button button__blue'
              onClick={() => setShowForm(!showForm)}>
              Add User
            </button>
            {showForm && (
              <div className='add-user-form'>
                <form>
                  <div className='form-item'>
                    <label>SSN</label>
                    <input name='ssn' required autoComplete='off'></input>
                  </div>
                  <div className='form-item'>
                    <label>Phone</label>
                    <input name='phone' required autoComplete='off'></input>
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
