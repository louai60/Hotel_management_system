import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./Landingpage_components";
// import { cap, captwo, capthree } from "./assets";
const Home = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    {/* <div className="absolute z-[99] w-[10%] h-[100%] rounded-full blue__gradient bottom-2" />
    <div className="absolute z-[99] w-[30%] h-[100%] right-92 bottom-22 blue__gradient" />
    <div className="absolute z-[99] w-[40%] h-[100%] top-5 blue__gradient" /> */}
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>

    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>

      {/* <div className={`${styles.boxWidth}`}>
        <img src={cap} alt="billing" className="w-[100%] h-[90%] relative z-[0]" />

        <Stats />
        <img src={captwo} alt="billing" className="w-[100%] h-[90%] relative z-[0]" />
        <img src={capthree} alt="billing" className="w-[100%] h-[90%] relative z-[0]" />


      </div> */}
        <Footer />
    </div>
  </div>
);

export default Home;
