import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} from '../../store/modules/book/book.action';
import Table from './Table';
import CreateBookModal from './forms/CreateBookModal';
import UpdateBookModal from './forms/UpdateBookModal';
import ActionBar from '../utils/ActionBar';

const BookItems = () => {
  let [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [openCraeteModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [confirmationBoxInfo, setConfirmationBoxInfo] = useState({
    id: null,
    open: false,
    xCoordinate: 0,
    yCoordinate: 0,
  });
  let [formData, setFormData] = useState();
  let [updateFormData, setUpdateFormData] = useState();
  const bookState = useSelector((state) => state.Book);
  const { books, count, isLoading, successMessage } = bookState;
  const pageCount =
    Math.ceil(count / pageSize) == 0 ? 1 : Math.ceil(count / pageSize);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks({ page, limit: pageSize }));
  }, [pageSize, page]);

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
    let { categories } = updateFormData;
    if (typeof categories == 'string') categories = categories.split(',');
    updateFormData = { ...updateFormData, categories };
    dispatch(
      updateBook({ bookId: updateFormData.id, updateData: updateFormData })
    );
  };

  return (
    <div className='book-items'>
      <ActionBar
        openCreateModal={() => setOpenCreateModal(true)}
        pageName='Book'></ActionBar>
      <div className='table-responsive'>
        <Table
          books={books}
          page={page}
          pageSize={pageSize}
          pageCount={Math.ceil(count / pageSize)}
          setPage={setPage}
          setPageSize={setPageSize}
          handleUpdateModal={handleUpdateModal}
          handleShowConfirmBox={handleShowConfirmBox}></Table>
      </div>
      {/* En son sayfada son eleman silindikten sonra otomatik olarak önceki sayfaya atma işlemi */}
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
