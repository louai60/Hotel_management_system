import styles from "../style";
import { discount, robot, cap } from "./assets";
// import GetStarted from "../Landingpage_components/GetStarted";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>

      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-black">20%</span> Discount For{" "}
            <span className="text-black">1 Month</span> Account
          </p>
        </div> */}

        <div className="flex-3 flex-row justify-between items-center w-full">


          <h1 className="flex-1 font-poppins font-semibold ss:text-[100px] text-[80px] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-black ss:leading-[100px] leading-[90px]">
            Welcome <br className="sm:block hidden" />{" "}
            {/* <span >To our working space</span>{" "} */}
          </h1>
          {/* text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-red-700 animate-gradient */}
          <div className="ss:flex hidden md:mr-4 mr-0">
          </div>
        </div>
        {/* 
        <h1 className="">


        </h1> */}
        <p className={`${styles.paragraph} max-w-[470px] text-2xl font-bold bg-gradient-to-r from-blue-400 to-black  text-transparent bg-clip-text animate-gradient`}>
        Discover unparalleled comfort and convenience with Assist Hotel. Enjoy effortless bookings, exceptional service, and a memorable stay with our state-of-the-art hotel management system. Your comfort is our priority.        </p>

      </div>

      {/* <GetStarted /> */}
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>

        {/* gradient start */}
        <div className="absolute z-[99] w-[60%] h-[10%] rounded-full blue__gradient bottom-2" />
        <div className="absolute z-[99] w-[60%] h-[10%] right-92 bottom-22 blue__gradient" />
        <div className="absolute z-[99] w-[60%] h-[100%] top-5 blue__gradient" />
        {/* gradient end */}
      </div>

      <img src={robot} alt="billing" className="w-[50%] h-[0%] relative z-[9]" />
      <div className={`ss:hidden ${styles.flexCenter}`}>

      </div>
    </section>
  );
};

export default Hero;
