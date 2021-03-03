import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLibraryDetail,
  updateBookStock,
} from '../../../store/modules/library/detail/detail.action';
import OrderModal from './OrderModal';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const libraryDetailState = useSelector((state) => state.LibraryDetail);
  const { library, isLoading } = libraryDetailState;
  const [updateStockBoxInfo, setUpdateStockBoxInfo] = useState({
    bookId: null,
    open: false,
    xCoordinate: 0,
    yCoordinate: 0,
  });

  const [openOrderModal, setOpenOrderModal] = useState();
  const [orderData, setOrderData] = useState();

  console.log(library);
  useEffect(() => {
    dispatch(getLibraryDetail({ libraryId: params.id }));
  }, []);

  const showUpdateStockBox = (bookId, e, stock) => {
    setUpdateStockBoxInfo({
      bookId,
      stock,
      open: true,
      xCoordinate: e.pageX,
      yCoordinate: e.pageY,
    });
  };

  const handleOnChange = (e) => {
    setUpdateStockBoxInfo({
      ...updateStockBoxInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateStock = () => {
    dispatch(
      updateBookStock({
        libraryId: params.id,
        bookId: updateStockBoxInfo.bookId,
        newStock: updateStockBoxInfo.stock,
      })
    );
    setUpdateStockBoxInfo({
      ...updateStockBoxInfo,
      open: false,
    });
  };

  const updateStockBox = (
    <div
      className='update-stock-box-card'
      style={{
        position: 'absolute',
        top: updateStockBoxInfo.yCoordinate - 92,
        left: updateStockBoxInfo.xCoordinate - 166 + 10,
      }}>
      <label>Stock</label>
      <input
        onChange={handleOnChange}
        name='stock'
        required
        type='number'
        autoComplete='off'
        min='0'
        value={updateStockBoxInfo.stock}></input>
      <div className='button-group mt-2'>
        <button
          onClick={handleUpdateStock}
          className='button button__blue mr-2'>
          Update
        </button>
        <button
          className='button button__white'
          onClick={() =>
            setUpdateStockBoxInfo({
              open: false,
            })
          }>
          Cancel
        </button>
      </div>
    </div>
  );

  const allBooks = library?.books?.map((item, index) => {
    const { book, stock } = item;
    const { image, title, _id } = book;
    return (
      <div className='item book-item' key={index}>
        <div className='img-title'>
          <img src={image}></img>
          <span>{title}</span>
        </div>
        <span className='stock'>
          <span>Stock : </span>
          <span className='ml-2'>{stock}</span>
          <i
            className='fas fa-edit ml-3'
            onClick={(e) => showUpdateStockBox(_id, e, stock)}></i>
        </span>
      </div>
    );
  });

  const showOrderDetail = (order) => {
    setOrderData(order);
    setOpenOrderModal(true);
  };

  const allOrders = library?.orders?.map((order, index) => {
    const { order_date, status, _id } = order;
    const fullDate = new Date(order_date);
    const localeDate = fullDate.toLocaleDateString();
    const localeTime = fullDate.toLocaleTimeString();
    return (
      <div className='item' key={index}>
        <div className='id-column' onClick={() => showOrderDetail(order)}>
          <span>{_id}</span>
        </div>
        <div className='date-column'>
          <span>{localeDate}</span>
          {' - '}
          <span>{localeTime}</span>
        </div>
        <div className='status-column badge badge-success'>
          <span>{status}</span>
        </div>
      </div>
    );
  });

  return (
    <div className='library-detail'>
      <div className='books-section'>
        <div className='title'>Books</div>
        {library?.books?.length == 0 ? (
          <div className='d-flex justify-content-center align-items-center w-100 h-75'>
            There is no book!
          </div>
        ) : (
          allBooks
        )}
      </div>
      <div className='orders-users'>
        <div className='orders-section'>
          <div className='title'>Orders</div>
          <div className='header-labels'>
            <span className='item-label'>ID</span>
            <span className='item-label ml-3'>Date</span>
            <span className='item-label mr-1'>Status</span>
          </div>
          {library?.orders?.length == 0 ? (
            <div className='d-flex justify-content-center align-items-center w-100 h-75'>
              There is no order!
            </div>
          ) : (
            allOrders
          )}
        </div>
        <div className='users-section'>
          <div className='title'>Users</div>
          {library?.users?.length == 0 ? (
            <div className='d-flex justify-content-center align-items-center w-100 h-75'>
              There is no user!
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {updateStockBoxInfo.open && updateStockBox}
      {openOrderModal && (
        <OrderModal
          setOpenOrderModal={setOpenOrderModal}
          isLoading={isLoading}
          order={orderData}></OrderModal>
      )}
    </div>
  );
};

export default Detail;
