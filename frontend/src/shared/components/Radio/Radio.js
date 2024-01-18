import './Radio.css';

const Radio = ({ name, id, value, onChange, checked, text }) => {
  return (
    <label htmlFor={id} className='radio-label'>
      <input
        className='radio-input'
        type='radio'
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className='custom-radio' />
      {text}
    </label>
  );
};

export default Radio;

/**
 * Radio button usage
 *
 * const [checked, setChecked] = useState({ right: false, left: false });

  const onRadioChange = (event) => {
    const { name } = event.target;
    if (name === 'right') {
      setChecked({ right: true, left: false });
    }
    if (name === 'left') {
      setChecked({ right: false, left: true });
    }
  };

  <Radio
    name='left'
    id='left'
    value='Left'
    text='Left'
    onChange={onRadioChange}
    checked={checked.left}
    />
    <Radio
    name='right'
    id='right'
    value='Right'
    text='Right'
    onChange={onRadioChange}
    checked={checked.right}
    />
 */
