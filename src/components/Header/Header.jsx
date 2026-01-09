import { NavLink, Link } from 'react-router-dom';
import {
    Menu,
    X,
    BookOpen,
    FileText,
    Video,
    CreditCard,
    Download,
    Truck,
    ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES } from '../../data/mockData';
import './Header.css';

function Header() {
    const {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        selectedClass,
        setSelectedClass
    } = useApp();

    const navItems = [
        { path: '/', label: 'Home', icon: BookOpen },
        { path: '/materials', label: 'Materials', icon: FileText },
        { path: '/videos', label: 'Videos', icon: Video },
        { path: '/pricing', label: 'Pricing', icon: CreditCard },
        { path: '/hard-copy', label: 'Hard Copy', icon: Truck },
        { path: '/my-downloads', label: 'My Downloads', icon: Download },
    ];

    const handleNavClick = () => {
        closeMobileMenu();
    };

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    return (
        <header className="header">
            <div className="header-container container">
                {/* Logo */}
                <Link to="/" className="header-logo" onClick={closeMobileMenu}>
                    <div className="logo-icon">
                        <BookOpen size={24} />
                    </div>
                    <span className="logo-text">Genii</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="header-nav-desktop">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'nav-link-active' : ''}`
                            }
                        >
                            <item.icon size={16} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Class Selector */}
                <div className="header-class-selector">
                    <ChevronDown size={16} className="selector-icon" />
                    <select
                        value={selectedClass}
                        onChange={handleClassChange}
                        className="class-select"
                    >
                        {CLASSES.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <div
                className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-visible' : ''}`}
                onClick={closeMobileMenu}
            />

            {/* Mobile Navigation Drawer */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
                <div className="mobile-nav-header">
                    <div className="mobile-logo">
                        <div className="logo-icon">
                            <BookOpen size={24} />
                        </div>
                        <span className="logo-text">Genii</span>
                    </div>
                    <button
                        className="mobile-close-btn"
                        onClick={closeMobileMenu}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Class Selector in Mobile */}
                <div className="mobile-class-selector">
                    <label>Select Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => {
                            handleClassChange(e);
                        }}
                        className="class-select"
                    >
                        {CLASSES.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Mobile Nav Links */}
                <div className="mobile-nav-links">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                            }
                            onClick={handleNavClick}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Header;
