const Table = ({
  users,
  page,
  pageSize,
  pageCount,
  handleUpdateModal,
  handleShowConfirmBox,
  setPage,
  setPageSize,
}) => {
  const headerAttributes = ['Full Name', 'Email', 'Role'];

  const fillTableHead = (
    <tr>
      {headerAttributes.map((attr, index) => (
        <th scope='col' key={index}>
          {attr}
        </th>
      ))}
    </tr>
  );

  const noUsersInTable = (
    <tr>
      <td colSpan='4' className='text-center'>
        There is no user
      </td>
    </tr>
  );

  const createUserImage = (fullName) => {
    const letters = fullName.split(' ', 2);
    const firstLetter = letters[0]?.slice(0, 1).toUpperCase();
    const secondLetter = letters[1]?.slice(0, 1).toUpperCase();
    const imageLetter = firstLetter + secondLetter;
    return <div className='user-letter-image mr-2'>{imageLetter}</div>;
  };

  const fillTableBody =
    users.length == 0
      ? noUsersInTable
      : users.map((user, index) => {
          const { _id, fullName, email, role } = user;
          const letterImage = createUserImage(fullName);
          return (
            <tr key={index}>
              <td className='d-flex align-items-center'>
                {letterImage}
                {fullName}
              </td>
              <td>{email}</td>
              <td>
                <span className='badge'>{role}</span>
              </td>
              <td>
                <div className='action-buttons d-flex justify-content-end'>
                  <button
                    onClick={() => handleUpdateModal(user)}
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
        });

  const fillTableFoot = (
    <tr>
      <td colSpan='2'>
        <span className='mr-2'>View</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPage(0);
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
          disabled={page === pageCount - 1 || page >= pageCount - 1}>
          {'>'}
        </button>
        <button
          onClick={() => {
            setPage(pageCount - 1);
          }}
          disabled={page === pageCount - 1 || page > pageCount - 1}>
          {'>>'}
        </button>
      </td>
    </tr>
  );

  return (
    <table className='table table-borderless'>
      <thead>{fillTableHead}</thead>
      <tbody>{fillTableBody}</tbody>
      <tfoot>{fillTableFoot}</tfoot>
    </table>
  );
};

export default Table;
