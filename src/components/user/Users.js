import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from '../../store/modules/user/user.action';
import Table from './Table';
import CreateUserModal from './forms/CreateModal';
import UpdateUserModal from './forms/UpdateModal';
import ActionBar from '../utils/ActionBar';

const UserItems = () => {
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

  const [updateFormData, setUpdateFormData] = useState();
  const UserState = useSelector((state) => state.User);
  const { users, count, isLoading, successMessage } = UserState;
  const pageCount =
    Math.ceil(count / pageSize) == 0 ? 1 : Math.ceil(count / pageSize);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers({ page, limit: pageSize }));
  }, [pageSize, page]);

  const handleShowConfirmBox = (id, e) => {
    setConfirmationBoxInfo({
      id,
      open: true,
      xCoordinate: e.pageX,
      yCoordinate: e.pageY,
    });
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser({ userId: confirmationBoxInfo.id }));
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
        <button onClick={handleDeleteUser} className='button button__blue mr-2'>
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

  const handleUpdateModal = (User) => {
    const { fullName, email, role, _id } = User;
    setUpdateFormData({
      fullName,
      email,
      role,
      id: _id,
    });
    setOpenUpdateModal(true);
  };

  const handleSubmitUpdateUser = (e) => {
    e.preventDefault();
    const checkedRole = document.querySelector('input[type="radio"]:checked');
    if (checkedRole) updateFormData.role = checkedRole.value;

    dispatch(
      updateUser({ userId: updateFormData.id, updateData: updateFormData })
    );
  };

  return (
    <div className='user-items'>
      <ActionBar
        openCreateModal={() => setOpenCreateModal(true)}
        pageName='User'></ActionBar>
      <div className='table-responsive'>
        <Table
          users={users}
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
        <CreateUserModal
          successMessage={successMessage}
          setOpenCreateModal={setOpenCreateModal}
          isLoading={isLoading}></CreateUserModal>
      )}
      {openUpdateModal && (
        <UpdateUserModal
          setOpenUpdateModal={setOpenUpdateModal}
          isLoading={isLoading}
          handleSubmitUpdateUser={handleSubmitUpdateUser}
          updateFormData={updateFormData}
          setUpdateFormData={setUpdateFormData}></UpdateUserModal>
      )}
    </div>
  );
};

export default UserItems;
