import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  name, label, valueSelected, values,
}) => {
  console.log('values', values);
  return (
    <form method="post" className="">
      {name && (
      <label htmlFor={`${name}-select`} className="">{label}
        <select name={`${name}`} id={`${name}-select`} onChange={valueSelected}>
          {values && Object.keys(values).length ? (
            <>
              <option value="">please choose a {`${name}`}</option>
              {values.length
          && values.map((selectValue) => (
            <option key={selectValue.id} value={selectValue.id}>{selectValue.name}</option>
          ))}
            </>
          ) : (
            <option value="">no {`${name}`} yet, create one</option>
          )}
        </select>
      </label>
      )}
    </form>
  );
};

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