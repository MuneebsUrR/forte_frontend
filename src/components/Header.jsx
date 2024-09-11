import React from 'react';
import New from './New';
import fast2 from '../assets/fast2.png';

const Header = ({ theme, changeTheme }) => {
  return (
    <header className='h-[10vh] flex justify-between items-center px-4'>
      <img src={fast2} width={150} alt="logo" />
      <New theme={theme} setTheme={changeTheme} />
    </header>
  );
};

export default Header;
