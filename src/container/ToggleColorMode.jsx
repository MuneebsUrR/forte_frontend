import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '../Context/Theme';

const ToggleColorMode = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <div className="text-center m-10">
      <main>This app is using the {mode} mode</main>
      <Brightness4Icon onClick={toggleTheme} className="cursor-pointer" />
    </div>
  );
};

export default ToggleColorMode;
