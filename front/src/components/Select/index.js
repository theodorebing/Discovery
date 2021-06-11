import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  name, label, valueSelected, values,
}) => (
  <>
    {name && (
    <>
      <label htmlFor={`${name}-select`} className="select-label">{label}</label>
      <select className="select-select" name={`${name}`} id={`${name}-select`} onChange={valueSelected}>
        {values && Object.keys(values).length ? (
          <>
            <option value="">please choose a {`${name}`}</option>
            {values.length
              && values.map((selectValue) => (
                <option
                  key={selectValue.id}
                  value={selectValue.id}
                >
                  {selectValue.name.toUpperCase()}
                </option>
              ))}
          </>
        ) : (
          <option value="">no {`${name}`} yet, create one</option>
        )}
      </select>
    </>
    )}
  </>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valueSelected: PropTypes.func.isRequired,
  values: PropTypes.array,
};

Select.defaultProps = {
  values: null,
};

export default Select;
