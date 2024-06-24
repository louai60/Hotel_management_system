// import styles from "../style";
// import { arrowUp } from "../assets";
import { Link } from 'react-router-dom';

const GetStarted = () => (

  <div className="flex items-center justify-center ">
    <button type="button"
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
      <h3 className="bg-gradient-to-r from-blue-700 via-black-300 to-black text-transparent bg-clip-text animate-gradient">

        <Link to="/login">
          Let's start working
        </Link>
      </h3>
    </button>
  </div>





);

export default GetStarted;