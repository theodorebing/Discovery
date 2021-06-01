import React from 'react';

const Select = ({
  name, label, valueSelected, values, selectedValueIndex,
}) => (
  <form method="post" className="">
    {name ? (
      <label htmlFor={`${name}-select`} className="">{label}
        <select name={`${name}`} id={`${name}-select`} onChange={valueSelected}>
          <option value="">Please choose a {`${name}`}</option>
          {/* {values[selectedValueIndex].length
        && values[selectedValueIndex].map((selectValue) => (
          <option key={selectValue.id} value={selectValue.id}>{selectValue.name}</option>
        ))} */}
        </select>
      </label>
    ) : (
      <p>Create a category</p>
    )}
  </form>
);

export default Select;
