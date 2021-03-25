const RadioBox = ({ name, onChange }) => {
  return (
    <label className='m-2'>
      <input type='radio' name='radio' value={name} onChange={onChange} />
      <div className='box'>
        <span>{name}</span>
      </div>
    </label>
  );
};

export default RadioBox;
