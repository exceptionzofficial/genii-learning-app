import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
    Menu,
    X,
    FileText,
    Video,
    CreditCard,
    Download,
    Truck,
    ChevronDown,
    User,
    LogOut,
    Home,
    Bell,
    ShoppingBag,
    HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES } from '../../data/mockData';
import logo from '../../assets/logo.jpeg';
import './Header.css';

function Header() {
    const {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        selectedClass,
        setSelectedClass,
        isAuthenticated,
        user,
        logout,
        openLoginModal
    } = useApp();

    const navigate = useNavigate();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/materials', label: 'Materials', icon: FileText },
        { path: '/videos', label: 'Videos', icon: Video },
        { path: '/mcqs', label: 'MCQs', icon: HelpCircle },
        { path: '/hard-copy', label: 'Hard Copy', icon: Truck },
        { path: '/notifications', label: 'Notifications', icon: Bell },
    ];

    const handleNavClick = () => {
        closeMobileMenu();
    };

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            openLoginModal();
        }
        closeMobileMenu();
    };

    const handleLogout = () => {
        logout();
        closeMobileMenu();
    };

    return (
        <header className="header">
            <div className="header-container container">
                {/* Logo */}
                <Link to="/" className="header-logo" onClick={closeMobileMenu}>
                    <img src={logo} alt="Genii Books" className="logo-image" />
                    <div className="logo-text-container">
                        <span className="logo-text">Genii Books</span>
                        <span className="logo-tagline">make learning simple</span>
                    </div>
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

                {/* Right Section: Class Selector + Profile */}
                <div className="header-right">
                    {/* Class Selector */}
                    <div className="header-class-selector">
                        <ChevronDown size={16} className="selector-icon" />
                        <select
                            value={selectedClass}
                            onChange={handleClassChange}
                            className="class-select"
                            disabled={isAuthenticated}
                        >
                            {CLASSES.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Profile Icon */}
                    <button
                        className="profile-btn"
                        onClick={handleProfileClick}
                        aria-label={isAuthenticated ? 'My Profile' : 'Login'}
                    >
                        <User size={20} />
                        {isAuthenticated && <span className="profile-indicator"></span>}
                    </button>
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
                        <img src={logo} alt="Genii Books" className="mobile-logo-image" />
                        <span className="logo-text">Genii Books</span>
                    </div>
                    <button
                        className="mobile-close-btn"
                        onClick={closeMobileMenu}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* User Section in Mobile */}
                <div className="mobile-user-section">
                    {isAuthenticated ? (
                        <div className="mobile-user-info" onClick={() => { navigate('/profile'); closeMobileMenu(); }} style={{ cursor: 'pointer' }}>
                            <div className="user-avatar">
                                <User size={24} />
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name || 'Student'}</span>
                                <span className="user-email">{user?.email || 'View Profile →'}</span>
                            </div>
                        </div>
                    ) : (
                        <button className="btn btn-primary mobile-login-btn" onClick={handleProfileClick}>
                            <User size={18} />
                            <span>Login / Register</span>
                        </button>
                    )}
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
                        disabled={isAuthenticated}
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

                    {/* My Profile & My Downloads Links */}
                    {isAuthenticated && (
                        <>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                                }
                                onClick={handleNavClick}
                            >
                                <User size={20} />
                                <span>My Profile</span>
                            </NavLink>
                            <NavLink
                                to="/my-downloads"
                                className={({ isActive }) =>
                                    `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                                }
                                onClick={handleNavClick}
                            >
                                <Download size={20} />
                                <span>My Downloads</span>
                            </NavLink>
                            <NavLink
                                to="/my-orders"
                                className={({ isActive }) =>
                                    `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                                }
                                onClick={handleNavClick}
                            >
                                <ShoppingBag size={20} />
                                <span>My Orders</span>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Logout Button */}
                {isAuthenticated && (
                    <div className="mobile-logout-section">
                        <button className="mobile-logout-btn" onClick={handleLogout}>
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
