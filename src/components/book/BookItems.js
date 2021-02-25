import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} from '../../store/modules/book/book.action';
import Table from './Table';
import CreateBookModal from './CreateBookModal';
import UpdateBookModal from './UpdateBookModal';

const BookItems = () => {
  let [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [pageCount, setPageCount] = useState(1);
  const [openCraeteModal, setOpenCreateModal] = useState(false);
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
  useEffect(() => {
    dispatch(getBooks({ page, limit: pageSize }));
    setPageCount(Math.ceil(count / pageSize));
  }, [pageSize, page, pageCount, count]);

  const handleSubmitCreateBookForm = (e) => {
    e.preventDefault();
    let { categories } = formData;
    if (typeof categories == 'string') categories = categories.split(',');
    formData = { ...formData, categories };
    dispatch(addBook({ formData }));
    e.target.reset();
    setFormData({});
  };

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

  const handleSubmitUpdateBook = (e) => {
    e.preventDefault();
    dispatch(
      updateBook({ bookId: updateFormData.id, updateData: updateFormData })
    );
    setShowAlert(true);
  };

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
            onClick={() => setOpenCreateModal(true)}
            className='button button__blue button__big'>
            Create Book
          </button>
        </div>
      </div>
      <div className='table-responsive'>
        <Table
          books={books}
          page={page}
          pageSize={pageSize}
          pageCount={pageCount}
          setPage={setPage}
          setPageSize={setPageSize}
          handleUpdateModal={handleUpdateModal}
          handleShowConfirmBox={handleShowConfirmBox}></Table>
      </div>
      {page - 1 == pageCount - 1 && setPage(page - 1)}
      {confirmationBoxInfo.open && confirmationBox}
      {openCraeteModal && (
        <CreateBookModal
          successMessage={successMessage}
          setOpenCraeteModal={setOpenCreateModal}
          isLoading={isLoading}
          setFormData={setFormData}
          handleSubmitCreateBookForm={
            handleSubmitCreateBookForm
          }></CreateBookModal>
      )}
      {openUpdateModal && (
        <UpdateBookModal
          setOpenUpdateModal={setOpenUpdateModal}
          isLoading={isLoading}
          handleSubmitUpdateBook={handleSubmitUpdateBook}
          updateFormData={updateFormData}
          setUpdateFormData={setUpdateFormData}></UpdateBookModal>
      )}
    </div>
  );
};

export default BookItems;
