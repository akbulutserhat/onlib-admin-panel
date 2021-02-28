const ActionBar = ({ openCreateModal, pageName }) => {
  return (
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
          onClick={openCreateModal}
          className='button button__blue button__big'>
          Create {pageName}
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
