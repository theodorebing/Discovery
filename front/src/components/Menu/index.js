import React, { useState } from 'react';
import classNames from 'classnames';
import menu from '../../assets/menu.png';
import Logout from '../../containers/Logout';

import './styles.scss';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <img src={menu} alt="menu" className={classNames('menu__icon', { 'menu__icon--opened': menuOpen })} onClick={openMenu} />
      <div className={classNames('menu', { 'menu--open': menuOpen, 'menu--close': !menuOpen })}>
        <Logout />
      </div>
    </>
  );
};

export default Menu;
