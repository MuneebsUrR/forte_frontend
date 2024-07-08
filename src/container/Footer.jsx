import React from 'react';
import styles from "../style";
import { useTheme } from '../Context/Theme';

const Footer = () => {
  const { mode } = useTheme();

  return (
    <section className={`flex flex-col ${styles.paddingX} h-[10vh]`}>

      <div className={`w-full h-full font-poppins mb-2 border-b-[1px] ${mode === 'dark' ? 'border-gray-600' : 'border-black'} text-white`}>
      </div>
      <div className={`flex md:flex-row sm:flex-row flex-col w-full justify-between items-center ${mode === 'light' ? 'bg-gray-100' : ''}`}>
      <span className={`font-poppins font-normal ${mode === 'dark' ? 'text-gray' : 'text-gray-700'} text-[16px] mb-4 leading-[30.8px]`}>
        Copyright © 2024 FAST NUCES. All Rights Reserved.
      </span>
      <span className={`font-poppins font-normal ${mode === 'dark' ? 'text-gray' : 'text-gray-700'} text-[16px] mb-4 leading-[30.8px] text-right`}>
        Powered by FORTE
      </span>
        
      </div>
    </section>
  );
};

export default Footer;
