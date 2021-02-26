import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLibraries,
  addLibrary,
  deleteLibrary,
  updateLibrary,
} from '../../store/modules/library/library.action';
import CreateLibraryModal from './CreateLibraryModal';
import Table from './Table';
import UpdateLibraryModal from './UpdateLibraryModal';

const LibraryItems = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  let [formData, setFormData] = useState();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState();
  const [confirmationBoxInfo, setConfirmationBoxInfo] = useState({
    id: null,
    open: false,
    xCoordinate: 0,
    yCoordinate: 0,
  });
  const libraryState = useSelector((state) => state.Library);

  const dispatch = useDispatch();

  const { libraries, isLoading } = libraryState;

  useEffect(() => {
    dispatch(getLibraries());
  }, []);

  const handleSubmitCreateLibraryForm = (e) => {
    e.preventDefault();
    dispatch(addLibrary({ formData }));
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

  const handleDeleteLibrary = () => {
    dispatch(deleteLibrary({ libraryId: confirmationBoxInfo.id }));
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
        <button
          onClick={handleDeleteLibrary}
          className='button button__blue mr-2'>
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

  const handleUpdateModal = (library) => {
    const { name, address, city, _id } = library;
    setUpdateFormData({
      name,
      address,
      city,
      id: _id,
    });
    setOpenUpdateModal(true);
  };

  const handleSubmitUpdateLibrary = (e) => {
    e.preventDefault();
    dispatch(
      updateLibrary({
        libraryId: updateFormData.id,
        updateData: updateFormData,
      })
    );
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
            Create Library
          </button>
        </div>
      </div>
      <Table
        libraries={libraries}
        handleShowConfirmBox={handleShowConfirmBox}
        handleUpdateModal={handleUpdateModal}></Table>

      {confirmationBoxInfo.open && confirmationBox}

      {openCreateModal && (
        <CreateLibraryModal
          setOpenCreateModal={setOpenCreateModal}
          setFormData={setFormData}
          isLoading={isLoading}
          handleSubmitCreateLibraryForm={
            handleSubmitCreateLibraryForm
          }></CreateLibraryModal>
      )}

      {openUpdateModal && (
        <UpdateLibraryModal
          updateFormData={updateFormData}
          setUpdateFormData={setUpdateFormData}
          setOpenUpdateModal={setOpenUpdateModal}
          handleSubmitUpdateLibrary={handleSubmitUpdateLibrary}
          isLoading={isLoading}></UpdateLibraryModal>
      )}
    </div>
  );
};

export default LibraryItems;
