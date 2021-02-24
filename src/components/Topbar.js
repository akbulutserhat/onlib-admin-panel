import { useLocation } from 'react-router-dom';
import Default from '../assets/default_avatar.png';

const Topbar = () => {
  const location = useLocation();
  let { pathname } = location;
  let title = pathname.slice(1);
  const capitalizedTitle = title ? title[0].toUpperCase() + title.slice(1) : '';
  return (
    <div className='topbar w-100 d-flex justify-content-between mb-5'>
      <h3 className='page-name'>
        {title ? capitalizedTitle : 'Dashboard'} Page
      </h3>
      <div className='user-info d-flex'>
        <div className='user d-flex flex-column'>
          <span className='name'>Serhat Akbulut</span>
          <small className='role align-self-end'>Admin</small>
        </div>
        <img
          src={Default}
          className='ml-2'
          style={{ width: 36 + 'px', height: 36 + 'px' }}></img>
      </div>
    </div>
  );
};

export default Topbar;
