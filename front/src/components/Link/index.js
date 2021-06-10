import React, { useEffect, useState } from 'react';

// import './styles.scss';

const Link = ({ link }) => (
  <div className="link">
    {/* <img src={link.image} alt={link.title} className="link-image" /> */}
    {link.description}
  </div>
);

export default Link;
