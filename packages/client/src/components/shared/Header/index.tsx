import { Navbar, NavbarGroup, Classes } from '@blueprintjs/core';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Navbar className='bp3-dark'>
      <NavbarGroup align='right'>
        <Link to='/search' className={clsx(Classes.BUTTON, Classes.MINIMAL)}>
          科目検索
        </Link>
      </NavbarGroup>
    </Navbar>
  );
};
