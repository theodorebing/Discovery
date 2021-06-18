import React, { useState } from 'react';
import classNames from 'classnames';
import menu from '../../assets/menu.png';

import './styles.scss';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  console.log(menuOpen);

  return (
    <>
      <img src={menu} alt="menu" className={classNames('menu__icon', { 'menu__icon--opened': menuOpen })} onClick={openMenu} />
    </>
  );
};

export default Menu;
