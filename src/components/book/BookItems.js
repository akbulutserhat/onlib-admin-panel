import Alert from '../utils/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} from '../../store/modules/book/book.action';

const BookItems = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [pageCount, setPageCount] = useState(1);
  const [openCraeteModal, setopenCraeteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [confirmationBoxInfo, setConfirmationBoxInfo] = useState({
    id: null,
    open: false,
    xCoordinate: 0,
    yCoordinate: 0,
  });
  let [formData, setFormData] = useState();
  const [updateFormData, setUpdateFormData] = useState();
  const bookState = useSelector((state) => state.Book);
  const { books, count, isLoading, successMessage } = bookState;
  const dispatch = useDispatch();

  const headerAttributes = ['Item', 'Category', 'Author'];

  useEffect(() => {
    dispatch(getBooks({ page, limit: pageSize }));
    setPageCount(Math.ceil(count / pageSize));
  }, [pageSize, page, pageCount, count]);

  const fillTableHead = (
    <tr>
      {headerAttributes.map((attr, index) => (
        <th scope='col' key={index}>
          {attr}
        </th>
      ))}
    </tr>
  );

  const handleShowConfirmBox = (id, e) => {
    setConfirmationBoxInfo({
      id,
      open: true,
      xCoordinate: e.pageX,
      yCoordinate: e.pageY,
    });
  };

  const handleDeleteBook = () => {
    dispatch(deleteBook({ bookId: confirmationBoxInfo.id }));
    setConfirmationBoxInfo({
      open: false,
    });
  };

  const confirmationBox = (
    <div
      className='confirm-box-card'
      style={{
        position: 'absolute',
        top: confirmationBoxInfo.yCoordinate - 65 - 6,
        left: confirmationBoxInfo.xCoordinate - 166 + 10,
      }}>
      <span>Are you sure for delete?</span>
      <div className='button-group mt-2'>
        <button onClick={handleDeleteBook} className='button button__blue mr-2'>
          Yes
        </button>
        <button
          className='button button__white'
          onClick={() =>
            setConfirmationBoxInfo({
              open: false,
            })
          }>
          No
        </button>
      </div>
    </div>
  );

  const fillTableBody =
    books.length == 0 ? (
      <tr>
        <td colSpan='4'>There is no items</td>
      </tr>
    ) : (
      books.map((book, index) => {
        const { _id, image, title, categories, author } = book;
        return (
          <tr key={index}>
            <td className='d-flex align-items-center'>
              <img className='mr-2' src={image}></img> {title}
            </td>
            <td>
              {categories.map((category, index) => (
                <span key={index} className='badge mr-2'>
                  {category}
                </span>
              ))}
            </td>
            <td>{author}</td>
            <td>
              <div className='action-buttons'>
                <button
                  onClick={() => handleUpdateModal(book)}
                  className='button button__transparent mr-1'>
                  <i className='fas fa-edit text-primary'></i>
                </button>
                <button
                  onClick={(e) => handleShowConfirmBox(_id, e)}
                  className='button button__transparent'>
                  <i className='fas fa-trash text-danger'></i>
                </button>
              </div>
            </td>
          </tr>
        );
      })
    );

  const handleUpdateModal = (book) => {
    const {
      title,
      author,
      image,
      readLink,
      descriptions,
      categories,
      _id,
    } = book;
    setUpdateFormData({
      title,
      author,
      image,
      readLink,
      descriptions,
      categories,
      id: _id,
    });
    setOpenUpdateModal(true);
  };

  const fillTableFoot = (
    <tr>
      <td colSpan='2'>
        <span className='mr-2'>View</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[6, 12, 24, 48, 96].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span className='ml-2'>items per page</span>
      </td>
      <td colSpan='2'>
        <button
          onClick={() => {
            setPage(0);
          }}
          disabled={page === 0}>
          {'<<'}
        </button>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 0}>
          {'<'}
        </button>{' '}
        <span>
          Page <strong>{page + 1}</strong> of {pageCount}
        </span>{' '}
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === pageCount - 1}>
          {'>'}
        </button>
        <button
          onClick={() => {
            setPage(pageCount - 1);
          }}
          disabled={page === pageCount - 1}>
          {'>>'}
        </button>
      </td>
    </tr>
  );

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitCreateBookForm = (e) => {
    e.preventDefault();
    let { categories } = formData;
    if (typeof categories == 'string') categories = categories.split(',');
    formData = { ...formData, categories };
    dispatch(addBook({ formData }));
    setShowAlert(true);
    e.target.reset();
  };

  const createBookModal = (
    <>
      <div className='modal-overlay'></div>
      <div className='custom-modal'>
        <button
          onClick={() => setopenCraeteModal(false)}
          className='close-button'>
          Close X
        </button>
        <div className='modal-guts'>
          <div className='modal-title'>
            <span>Create Book</span>
          </div>
          <div className='divider'></div>
          <div className='form-section'>
            <form onSubmit={handleSubmitCreateBookForm} className='mb-3'>
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
                  onClick={() => setopenCraeteModal(false)}
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

  const handleSubmitUpdateBook = (e) => {
    e.preventDefault();
    dispatch(
      updateBook({ bookId: updateFormData.id, updateData: updateFormData })
    );
    setShowAlert(true);
  };

  const updateModal = (
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
            <form onSubmit={handleSubmitUpdateBook} className='mb-3'>
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

  return (
    <div className='book-items'>
      <div className='action-bar'>
        <div className='search-bar'>
          <form>
            <input
              className='search-input'
              name='search'
              type='text'
              placeholder='Search'
              autoComplete='off'></input>
            <button type='submit' className='button button__blue button__icon'>
              <i className='fas fa-search'></i>
            </button>
          </form>
        </div>
        <div className='button-group'>
          <button
            onClick={() => setopenCraeteModal(true)}
            className='button button__blue button__big'>
            Create Book
          </button>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table table-borderless'>
          <thead>{fillTableHead}</thead>
          <tbody>{fillTableBody}</tbody>
          <tfoot>{fillTableFoot}</tfoot>
        </table>
      </div>
      {openCraeteModal && createBookModal}
      {confirmationBoxInfo.open && confirmationBox}
      {openUpdateModal && updateModal}
    </div>
  );
};

export default BookItems;
