import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  onChange, value, name,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value);
  };
  const inputId = `input-${name}`;
  return (
    <label htmlFor={`${name}-input`} className="form-label">
      {name}
      <input
        id={inputId}
        type={name}
        value={value}
        name={name}
        className="form-input"
        placeholder={name}
        onChange={handleChange}
      />
    </label>
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
