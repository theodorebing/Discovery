import React from 'react';
import Input from '../Input';

const LinkForm = ({
  onChangeLink, openLinkForm, linkFormOpened, link,
}) => {
  // const [link, setLink] = useState('');
  // const onChangeLink = (value) => {
  //   setLink(value);
  // };
  // let linkFormOpened = false;
  // const openLinkForm = () => {
  //   linkFormOpened = true;
  // };
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
        {linkFormOpened && (
          <Select />
        )}
      </form>
    </div>
  );
};

export default LinkForm;
