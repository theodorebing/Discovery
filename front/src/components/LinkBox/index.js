import React from 'react';

import './styles.scss';

const dayjs = require('dayjs');

const LinkBox = ({ link }) => {
  console.log(link);
  return (
    <a href={link.url} target="_blank" rel="noreferrer" className="link-box__a">
      <div className="link-box">
        <div className="link-box__div-image">
          <img src={link.image} alt={link.title} className="link-box__image" />
        </div>
        <div className="link-box__text">
          <p className="link-box__text-p link-box__text-p--title">
            {link.title}
          </p>
          <p className="link-box__text-p link-box__text-p--description">
            {link.description}
          </p>
          <p className="link-box__text-p link-box__text-p--source">
            {link.site_name}
          </p>
          <p className="link-box__text-p link-box__text-p--date">
            {dayjs(link.updated_at).format('DD-MMM-YYYY H:mm')}
          </p>
        </div>
      </div>
    </a>
  );
};
export default LinkBox;
