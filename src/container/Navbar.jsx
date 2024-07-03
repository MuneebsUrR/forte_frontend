import { useState } from "react";
import styles from "../style";

import { close, logo, menu } from "../assets";


const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  function logic() {
    setToggle(prevtoggle => !prevtoggle);
  }

  

  return (
    <nav className={`w-full flex ${styles.paddingX} py-6 justify-between items-center navbar h-[10vh] `}>
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

      <h1 className="flex items-center justify-center w-full text-[24px] text-center font-bold text-gradient">Test Name</h1>

      <img src={toggle ? close : menu} alt="" onClick={logic} className="w-[27px] h-[27px] object-contain" />


      {/* <ul className="list-none sm:flex hidden justify-end  items-center flex-1">
        {
          navLinks.map((nav, index) => {
            return (

              <li key={index} className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}>
                <a className="cursor-pointer" href={`${nav.id}`}>{nav.title}</a>
              </li>
            )
          })
        }
      </ul> */}


      {/* <div className="sm:hidden flex flex-1 justify-end items-center">
        <img src={toggle ? close : menu} alt="" onClick={logic} className="w-[27px] h-[27px] object-contain" />
      </div> */}

      <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
        {/* <ul className="list-none flex-col justify-end items-center flex-1">
          {
            navLinks.map((nav, index) => {
              return (

                <li key={index} className={`font-poppins font-normal text-center cursor-pointer text-[16px] mt-2 text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mb-2'}`}>
                  <a className="cursor-pointer" href={`${nav.id}`}>{nav.title}</a>
                </li>
              )
            })
          }
        </ul> */}
      </div>

    </nav>
  );
};

export default Navbar;
