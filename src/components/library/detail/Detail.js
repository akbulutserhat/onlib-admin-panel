import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLibraryDetail,
  updateBookStock,
  deleteBookFromLibrary,
} from '../../../store/modules/library/detail/detail.action';
import OrderModal from './OrderModal';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { searchOrderWithId } from '../../../helpers/search';

const Detail = () => {
  const authState = useSelector((state) => state.Auth);
  const { role, libraryId } = authState.currentUser;
  const params = useParams();
  const dispatch = useDispatch();
  let currentLibraryId;
  if (role == 'admin') {
    currentLibraryId = params.id;
  }
  if (role == 'supervisor') {
    currentLibraryId = libraryId;
  }
  const libraryDetailState = useSelector((state) => state.LibraryDetail);
  const { library, isLoading } = libraryDetailState;
  const [updateStockBoxInfo, setUpdateStockBoxInfo] = useState({
    bookId: null,
    open: false,
    xCoordinate: 0,
    yCoordinate: 0,
  });

  const [deleteBookBoxInfo, setDeleteBookBoxInfo] = useState({
    bookId: null,
    open: false,
    xCoordinate: 0,
    yCoordinate: 0,
  });

  const [orders, setOrders] = useState([]);
  const [openOrderModal, setOpenOrderModal] = useState();
  const [orderData, setOrderData] = useState();

  const statusNameAndColors = [
    { name: 'preparing', color: 'bg-warning' },
    { name: 'ready', color: 'bg-primary' },
    { name: 'delivered', color: 'bg-info' },
    { name: 'received', color: 'bg-success' },
  ];

  useEffect(() => {
    dispatch(getLibraryDetail({ libraryId: currentLibraryId }));
  }, []);

  useEffect(() => {
    setOrders(library?.orders?.slice());
  }, [library]);

  const showUpdateStockBox = (bookId, e, stock) => {
    setUpdateStockBoxInfo({
      bookId,
      stock,
      open: true,
      xCoordinate: e.pageX,
      yCoordinate: e.pageY,
    });
  };

  const showDeleteBookBox = (bookId, e) => {
    setDeleteBookBoxInfo({
      bookId,
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
        libraryId: currentLibraryId,
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

  const handleDeleteBook = () => {
    dispatch(
      deleteBookFromLibrary({
        libraryId: currentLibraryId,
        bookId: deleteBookBoxInfo.bookId,
      })
    );
    setDeleteBookBoxInfo({
      open: false,
    });
  };

  const deleteBookBox = (
    <div
      className='confirm-box-card'
      style={{
        position: 'absolute',
        top: deleteBookBoxInfo.yCoordinate - 60,
        left: deleteBookBoxInfo.xCoordinate - 166 + 20,
      }}>
      <span>Are you sure for delete?</span>
      <div className='button-group mt-2'>
        <button onClick={handleDeleteBook} className='button button__blue mr-2'>
          Yes
        </button>
        <button
          className='button button__white'
          onClick={() =>
            setDeleteBookBoxInfo({
              open: false,
            })
          }>
          No
        </button>
      </div>
    </div>
  );

  const allBooks = library?.books?.map((item, index) => {
    const { book, stock } = item;
    if (!book) return;
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
          <i
            className='fas fa-trash text-danger ml-3'
            onClick={(e) => showDeleteBookBox(_id, e)}></i>
        </span>
      </div>
    );
  });

  const showOrderDetail = (order) => {
    setOrderData(order);
    setOpenOrderModal(true);
  };

  const orderHeaderAttributes = ['ID', 'Date', 'Status'];

  const fillOrderTableHead = (
    <tr>
      {orderHeaderAttributes.map((attr, index) => (
        <th scope='col' key={index}>
          {attr}
        </th>
      ))}
    </tr>
  );

  const fillOrderTableBody = orders?.map((order, index) => {
    let { order_date, status, _id } = order;
    status = statusNameAndColors.filter((item) => item.name == status)[0];
    const fullDate = new Date(order_date);
    const localeDate = fullDate.toLocaleDateString();
    const localeTime = fullDate.toLocaleTimeString();
    return (
      <tr key={index}>
        <td onClick={() => showOrderDetail(order)}>{_id}</td>
        <td>
          {localeDate}
          {' - '}
          {localeTime}
        </td>
        <td>
          <span className={`status-column badge ${status.color}`}>
            {status.name}
          </span>
        </td>
      </tr>
    );
  });

  const userHeaderAttributes = ['Name', 'Email', 'SSN', 'Phone'];

  const fillUserTableHead = (
    <tr>
      {userHeaderAttributes.map((attr, index) => (
        <th scope='col' key={index}>
          {attr}
        </th>
      ))}
    </tr>
  );

  const fillUserTableBody = library?.users?.map((user, index) => {
    const { private_info } = user;
    return (
      <tr key={index}>
        <td>{user.user.fullName}</td>
        <td>{user.user.email}</td>
        <td>{private_info.ssn}</td>
        <td>{private_info.phone}</td>
      </tr>
    );
  });

  const handleSearchOrder = (e) => {
    const filteringOrders = searchOrderWithId(e.target.value, library.orders);
    setOrders(filteringOrders);
  };

  return (
    <div className='library-detail d-flex flex-column flex-md-row'>
      <div className='books-section mb-4 mb-md-0'>
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
          <div className='title'>
            {' '}
            <input
              type='text'
              name='search-book'
              className='search-input'
              placeholder='Search...'
              onChange={handleSearchOrder}></input>
            Orders
          </div>
          {library?.orders?.length == 0 ? (
            <div className='d-flex justify-content-center align-items-center w-100 h-75'>
              There is no order!
            </div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <thead>{fillOrderTableHead}</thead>
                <tbody style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                  {fillOrderTableBody}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className='users-section'>
          <div className='title'>Users</div>
          {library?.users?.length == 0 ? (
            <div className='d-flex justify-content-center align-items-center w-100 h-75'>
              There is no user!
            </div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <thead>{fillUserTableHead}</thead>
                <tbody style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                  {fillUserTableBody}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {updateStockBoxInfo.open && updateStockBox}
      {deleteBookBoxInfo.open && deleteBookBox}
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
