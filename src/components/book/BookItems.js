import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, addBook } from '../../store/modules/book/book.action';

const BookItems = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [pageCount, setPageCount] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  let [formData, setFormData] = useState();
  const bookState = useSelector((state) => state.Book);
  const { books, count } = bookState;
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

  const fillTableBody =
    books.length == 0 ? (
      <tr>
        <td>There is no items</td>
      </tr>
    ) : (
      books.map((book, index) => {
        const { image, title, categories, author } = book;
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
              <div className='custom-dropdown-menu'>
                <button className='button button__transparent'>
                  <i className='fas fa-ellipsis-h'></i>
                </button>
                <div className='dropdown'>
                  <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                    <li>Option 4</li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        );
      })
    );

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
  };

  const createBookModal = (
    <>
      <div className='modal-overlay'></div>
      <div className='custom-modal'>
        <button onClick={() => setOpenModal(false)} className='close-button'>
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
                  onClick={() => setOpenModal(false)}
                  className='button button__white button__small mr-3'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='button button__blue button__small'>
                  Create
                </button>
              </div>
            </form>
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
            onClick={() => setOpenModal(true)}
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
      {openModal ? createBookModal : ''}
    </div>
  );
};

export default BookItems;
