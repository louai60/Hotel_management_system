// import styles from "../style";
import { Link } from 'react-router-dom';

const GetStarted = () => (

  <div className="flex items-center justify-center ">
    <button type="button"
      className="bg-gray-100 hover:bg-blue-500 text-white font-bold py-2 px-24 rounded-full ">
      <h3 className="bg-gradient-to-r from-black via-blue-900 to-blue-900 text-transparent bg-clip-text animate-gradient text-5xl">

        <Link to="/login">
          Let's start working
        </Link>
      </h3>
    </button>
  </div>





);

export default GetStarted;
