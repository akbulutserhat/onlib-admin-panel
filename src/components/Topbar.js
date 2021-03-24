import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Default from '../assets/default_avatar.png';
import { SignOut } from '../store/modules/auth/auth.action';

const Topbar = ({ hamburgerOpen, hamburgerClicked }) => {
  const authState = useSelector((state) => state.Auth);
  const { fullName, role } = authState.currentUser;
  const location = useLocation();
  const dispatch = useDispatch();
  let { pathname, state } = location;
  let title = pathname.slice(1);
  let isDetailPage = false;
  if (title.includes('/')) {
    isDetailPage = true;
  }
  const capitalizedTitle = title ? title[0].toUpperCase() + title.slice(1) : '';

  const handleSignOutClicked = () => {
    dispatch(SignOut());
  };
  return (
    <div className='topbar w-100 d-flex justify-content-between mb-5'>
      <div
        onClick={hamburgerClicked}
        className='hamburger-icon d-flex align-items-center mr-5 d-block d-md-none'>
        {hamburgerOpen ? (
          <i className='fas fa-times'></i>
        ) : (
          <i className='fas fa-bars'></i>
        )}
      </div>
      {isDetailPage && (
        <Link className='mt-3 text-black-50' to={state.prevPath}>
          <i className='fas fa-arrow-left'></i> Go Back
        </Link>
      )}

      {!isDetailPage && (
        <h3 className='page-name'>
          {title ? capitalizedTitle : 'Dashboard'} Page
        </h3>
      )}
      <div className='user-info d-flex'>
        <div className='user d-flex flex-column'>
          <span className='name'>{fullName}</span>
          <small className='role align-self-end'>{role}</small>
        </div>
        <img
          src={Default}
          className='ml-2'
          style={{ width: 36 + 'px', height: 36 + 'px' }}></img>
        <button
          className='button button__icon button__blue ml-4'
          onClick={handleSignOutClicked}>
          <i className='fas fa-sign-out-alt'></i>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
