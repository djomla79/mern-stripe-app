const Checkbox = (props) => {
  const { className, id, name, label, disabled, checked, onChange } = props;

  const isLabelText = label && typeof label === 'string';
  const extraClassName = isLabelText
    ? ` default-icon ${className}`
    : ` custom-icon ${className}`;

  return (
    <div className={`checkbox${extraClassName}`}>
      <input
        className={'input-checkbox'}
        type={'checkbox'}
        id={id}
        name={name}
        checked={!disabled ? checked : false}
        onChange={onChange}
      />
      <label htmlFor={id} type='submit'>
        {isLabelText ? label : label}
      </label>
    </div>
  );
};

export default Checkbox;

/**
 *
 * EXAMPLE - CHECKBOX
 *
 *
   const { isChecked, onChangeHandler } = useCheckbox();

   <Checkbox
     id={'subscribe'}
     label={'Subscribe to newsletter'}
     checked={isChecked}
     onChange={onChangeHandler}
   />
 *
 */
