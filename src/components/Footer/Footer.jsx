import { Link } from 'react-router-dom';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Youtube
} from 'lucide-react';
import logo from '../../assets/logo.jpeg';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/materials', label: 'Study Materials' },
        { path: '/videos', label: 'Video Courses' },
        { path: '/hard-copy', label: 'Order Hard Copy' },
    ];

    const supportLinks = [
        { path: '/my-downloads', label: 'My Downloads' },
        { label: 'Contact Support' },
        { label: 'FAQ' },
        { label: 'Terms & Conditions' },
        { label: 'Privacy Policy' },
    ];

    return (
        <footer className="footer">
            <div className="footer-container container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <img src={logo} alt="Genii Books" className="footer-logo-image" />
                        <span className="footer-logo-text">Genii Books</span>
                    </Link>
                    <p className="footer-description">
                        Empowering students with quality education materials for academic excellence.
                    </p>
                    {/* <div className="footer-social">
                        <a href="#" className="social-link" aria-label="Facebook">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="social-link" aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="social-link" aria-label="Instagram">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="social-link" aria-label="YouTube">
                            <Youtube size={18} />
                        </a>
                    </div> */}
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                {link.path ? (
                                    <Link to={link.path}>{link.label}</Link>
                                ) : (
                                    <span>{link.label}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support Links */}
                <div className="footer-section">
                    <h4 className="footer-heading">Support</h4>
                    <ul className="footer-links">
                        {supportLinks.map((link, index) => (
                            <li key={index}>
                                {link.path ? (
                                    <Link to={link.path}>{link.label}</Link>
                                ) : (
                                    <span>{link.label}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section">
                    <h4 className="footer-heading">Contact Us</h4>
                    <ul className="footer-contact">
                        <li>
                            <Mail size={16} />
                            <span>geniibookschennai@gmail.com</span>
                        </li>
                        <li>
                            <Phone size={16} />
                            <span>+91 94442 98899</span>
                        </li>
                        <li>
                            <MapPin size={16} />
                            <span>Chennai, Tamil Nadu, India</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} Genii Learning Platform. All rights reserved.</p>
                    <p className="footer-credit">Made with dedication for students</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
