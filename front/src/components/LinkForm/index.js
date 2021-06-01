import React from 'react';
import Input from '../Input';
import Select from '../Select';

const LinkForm = ({
  onChangeLink, openLinkForm, linkFormOpened, link,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    openLinkForm();
  };

  return (
    <div className="linkForm">
      <form action="" className="form-form" onSubmit={handleSubmit}>
        <Input
          label="paste your link here"
          className="linkInput"
          onChange={onChangeLink}
          value={link}
          name="link"
        />
      </form>
      {linkFormOpened && (
        <Select />
      )}
    </div>
  );
};

export default LinkForm;
