import { Link } from 'react-router-dom';

const Table = ({ libraries, handleUpdateModal, handleShowConfirmBox }) => {
  const headerAttributes = ['Name', 'Address', 'City'];

  const fillTableHead = (
    <tr>
      {headerAttributes.map((attr, index) => (
        <th scope='col' key={index}>
          {attr}
        </th>
      ))}
    </tr>
  );

  const noLibrary = (
    <tr>
      <td colSpan='4' className='text-center'>
        There is no library
      </td>
    </tr>
  );

  const fillTableBody =
    libraries.length == 0
      ? noLibrary
      : libraries.map((library, index) => {
          const { _id, name, address, city } = library;
          return (
            <tr key={index}>
              <td>
                <Link
                  to={{
                    pathname: '/library/' + _id,
                    state: { prevPath: '/libraries' },
                  }}
                  title='Show detail of library'>
                  {name}
                </Link>
              </td>
              <td>{address}</td>
              <td>{city}</td>
              <td>
                <div className='action-buttons d-flex justify-content-end'>
                  <button
                    onClick={() => handleUpdateModal(library)}
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

  return (
    <table className='table table-borderless'>
      <thead>{fillTableHead}</thead>
      <tbody>{fillTableBody}</tbody>
    </table>
  );
};

export default Table;
