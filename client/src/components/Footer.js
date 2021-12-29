import React from 'react';
import {
    FaFacebook,
    FaLinkedin,
    FaGithub,
    FaRegClock,
    FaLocationArrow,
    FaPhoneAlt,
    FaSignInAlt,
    FaRegistered
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-sec" id="footer">
            <div className="footer">
                <div className="div-one">
                    <span className="app-name">BUY4ME</span>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/profile.php?id=100006532898046" target="_blank" rel="noreferrer">
                            <FaFacebook size={24} color="#FFFFFF" />
                        </a>
                        <a href="https://www.linkedin.com/in/mahmoud-mamdouh-88b72a195/" target="_blank" rel="noreferrer">
                            <FaLinkedin size={24} color="#FFFFFF" />
                        </a>
                        <a href="https://github.com/Mahmoud-Mamdouh-Abdullah" target="_blank" rel="noreferrer">
                            <FaGithub size={24} color="#FFFFFF" />
                        </a>
                    </div>
                    <p className="about-msg text-start"> Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Vestibulum elementum sollicitudin augue,
                        quis venenatis urna elementum in. Mauris maximus vulputate dolor a cursus.
                        Vivamus blandit, lorem sed porttitor condimentum, magna est scelerisque risus,
                        vel sodales nisi justo non metus. Mauris quis lectus tempus, porttitor ligula et,
                        vestibulum nunc. </p>
                </div>

                <div className="div-two">
                    <div className="info">
                        <FaLocationArrow size={24} color="#FFFFFF" />
                        <span>Egypt, Cairo, Shoubra El-Khiema Awal, Damanhur Shubra</span>
                    </div>

                    <div className="info">
                        <FaRegClock size={24} color="#FFFFFF" />
                        <span>Business Hours: From 10:00 To 18:00</span>
                    </div>

                    <div className="info">
                        <FaPhoneAlt size={24} color="#FFFFFF" />
                        <span>+201091122383 / +201559006754</span>
                    </div>
                </div>

                <div className="div-three">
                    <span className="app-name">Important Links</span>

                    <div className="link-item">
                        <Link to="/login">
                            <div className="link">
                                <FaSignInAlt size={16} color="#FFFFFF" />
                                <span>Login and Create Your First Order</span>
                                <hr />
                            </div>
                        </Link>
                        <div className="line-break"></div>
                    </div>

                    <div className="link-item">
                        <Link to="/register">
                            <div className="link">
                                <FaRegistered size={16} color="#FFFFFF" />
                                <span>Create Your Account Now</span>
                                <hr />
                            </div>
                        </Link>
                        <div className="line-break"></div>
                    </div>

                </div>
            </div>

            <div className="line-break"></div>

            <span className="copyright">© 2021 Cairo EG, Inc. All Right Reserved</span>

        </footer>
    )
}

export default Footer;