import { Link } from "react-router-dom";
import errImg from "../../src/assets/404.gif"
import Button from "../components/shared/Button/Button";
const Error = () => {
    
    return (
        <div className='flex flex-col justify-center items-center h-screen gap-10'>
           <img src={errImg} alt="error image" />
           <Link to="/"><Button>Back To Home</Button></Link>
        </div>
    );
};

export default Error;