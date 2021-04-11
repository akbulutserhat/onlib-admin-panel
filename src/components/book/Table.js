import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isBookAddedToLibrary } from '../../helpers/book';
import {
  addBookToLibrary,
  getLibraryDetail,
} from '../../store/modules/library/detail/detail.action';

const Table = ({
  books,
  page,
  pageSize,
  pageCount,
  handleUpdateModal,
  handleShowConfirmBox,
  setPage,
  setPageSize,
}) => {
  const dispatch = useDispatch();
  const headerAttributes = ['Item', 'Category', 'Author'];
  const authState = useSelector((state) => state.Auth);
  const { role, libraryId } = authState.currentUser;

  const libraryDetailState = useSelector((state) => state.LibraryDetail);
  const { library } = libraryDetailState;

  useEffect(() => {
    dispatch(getLibraryDetail({ libraryId }));
  }, []);
  const fillTableHead = (
    <tr>
      {headerAttributes.map((attr, index) => (
        <th scope='col' key={index}>
          {attr}
        </th>
      ))}
    </tr>
  );

  const noBooksInTable = (
    <tr>
      <td colSpan='4' className='text-center'>
        There is no books
      </td>
    </tr>
  );

  const handleAddBookToLibrary = (bookId) => {
    dispatch(addBookToLibrary({ libraryId, bookId }));
  };

  const fillTableBody =
    books.length == 0
      ? noBooksInTable
      : books.map((book, index) => {
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
                <div className='action-buttons d-flex justify-content-end'>
                  {role == 'supervisor' &&
                  !isBookAddedToLibrary(book, library?.books) ? (
                    <button
                      className='button button__green'
                      onClick={() => handleAddBookToLibrary(_id)}>
                      Add
                    </button>
                  ) : (
                    <button className='button' disabled>
                      Added
                    </button>
                  )}
                  {role == 'admin' && (
                    <>
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
                    </>
                  )}
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
