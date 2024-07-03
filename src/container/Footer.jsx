import styles from "../style";
import { logo } from "../assets";
import { footerdata, footerLinks, socialMedia } from "../constants";

const Footer = () => (
  <section className={`flex flex-col ${styles.paddingX} h-[10vh] `}>

    <div className={`w-full h-full font-poppins mb-2 border-b-[1px] text-white`}> </div>

    <div className="flex md:flex-row sm:flex-row flex-col w-full justify-between items-center">
      
      <span className={`font-poppins font-normal text-dimWhite text-[16px] mb-4 leading-[30.8px]`}>Copyright © 2024 FAST NUCES. All Rights Reserved.</span>
      <span className={`font-poppins font-normal text-dimWhite text-[16px] mb-4 leading-[30.8px] text-right`}>Powered by FORTE</span>

    </div>

  </section>
);

export default Footer;

