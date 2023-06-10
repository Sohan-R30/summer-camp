import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../../assets/logo.png"
const Footer = () => {
    return (
        <>
            <div className="absolute left-0 right-0">
                <footer 
                    className="footer p-10 bg-[#3bb2aa32] text-base-content flex justify-around">
                    <div className="flex items-end gap-4">
                        <img className="w-28" src={logo} alt="logo" />
                        <h3 className="text-2xl font-bold">Summer Camp</h3>
                    </div>
                    <div>
                        <span className="footer-title">Contact Information</span>
                        <p>Dhaka Bangladesh</p>
                        <p>+88023452352</p>
                        <p>sohanakondo834@gmail.com</p>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <p>About us</p>
                        <p>Facilities</p>
                    </div>
                    <div>
                        <span className="footer-title">Additional Information</span>
                        <p>Privacy Policy</p>
                        <p>Terms of use</p>
                    </div>
                    <div>
                        <span className="footer-title">Social Media Links</span>
                        <div className="flex gap-5 text-2xl">
                            <a href="https://www.facebook.com/sohanakondo.03" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://www.linkedin.com/in/md-zahidul-islam-shohan-013564278/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> </a>
                            <a href="https://www.instagram.com/_sohan_3860/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>

                        </div>
                    </div>
                </footer>
                <p className="text-center bg-primaryColor py-3 uppercase font-semibold tracking-wider">Copyright &copy; 2023 by summer Camp. All rights reserved.</p>
            </div>
        </>
    );
};

export default Footer;