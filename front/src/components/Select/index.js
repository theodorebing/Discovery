import React from 'react';

const Select = ({
  name, label, valueSelected, values,
}) => {
  console.log(values);
  return (
    <form method="post" className="">
      {name && (
      <label htmlFor={`${name}-select`} className="">{label}
        <select name={`${name}`} id={`${name}-select`} onChange={valueSelected}>
          <option value="">please choose a {`${name}`}</option>
          {values.length
        && values.map((selectValue) => (
          <option key={selectValue.id} value={selectValue.id}>{selectValue.name}</option>
        ))}
        </select>
      </label>
      )}
    </form>
  );
};

export default Select;
