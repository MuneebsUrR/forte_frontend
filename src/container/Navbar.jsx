import { useState } from "react";
import styles from "../style";
import { close, logo, menu } from "../assets";
import { useTheme } from '../Context/Theme';
import Brightness4Icon from '@mui/icons-material/Brightness4';


const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { mode, toggleTheme } = useTheme();

  function toggleMenu() {
    setToggle(prevToggle => !prevToggle);
  }

  return (
    <nav className={`w-full flex ${styles.paddingX} py-6 justify-between items-center navbar h-[10vh] ${mode === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />
      <h1 className="flex items-center justify-center w-full text-[24px] text-center font-bold text-gradient">Test Name</h1>
      <Brightness4Icon onClick={toggleTheme} className="cursor-pointer" />
      {/* <img src={toggle ? close : menu} alt=""
        onClick={toggleMenu}
        className={`w-[27px] h-[27px] object-contain ${mode === 'dark' ? 'filter invert(1) brightness(200%)' : ''}`} />
     */}
      {/* <div className={`${toggle ? 'flex' : 'hidden'} p-6 ${mode === 'dark' ? 'bg-black' : 'bg-white'} absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>  
      </div> */}
    </nav>
  );
};

export default Navbar;