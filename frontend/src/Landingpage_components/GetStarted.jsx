// import styles from "../style";
// import { arrowUp } from "../assets";

const GetStarted = () => (
  // <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer `}>
  //   <div className={`${styles.flexCenter} flex-col bg-danger w-[100%] h-[100%] rounded-full `}>
  //     <div className={`${styles.flexStart} flex-row `}>
  //       <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
  //         <span className="text-gradient">Let's</span>
  //       </p>
  //       <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
  //     </div>

  //     <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
  //       <span className="text-gradient">Start working</span>
  //     </p>
  //   </div>
  // </div>
  <div >


    <button type="button" className="py-4 px-4 font-poppins font-medium text-[22px] text-primary btn-blue-gradient rounded-[222px] outline-none ml-4">
      <h3 className="bg-gradient-to-r from-blue-700 via-black-300 to-black text-transparent bg-clip-text animate-gradient">
        Let's start working
        {/* <Link to="/...."> Let's start working</Link> */}

      </h3>
    </button>

  </div>
);

export default GetStarted;
