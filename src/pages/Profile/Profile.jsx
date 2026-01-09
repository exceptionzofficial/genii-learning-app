import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Phone,
    GraduationCap,
    Edit3,
    Save,
    X,
    Package,
    Truck,
    CheckCircle,
    Clock,
    FileText,
    Video,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES } from '../../data/mockData';
import './Profile.css';

function Profile() {
    const { user, isAuthenticated, purchasedItems, logout, openRegistrationModal } = useApp();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        classId: user?.classId || 'class10'
    });

    // Mock order data (would come from backend in real app)
    const [orders] = useState([
        {
            id: 'ORD001',
            type: 'hardcopy',
            items: 'Class 10 Complete Package',
            date: '2025-01-05',
            status: 'shipped',
            trackingId: 'TRK123456789',
            estimatedDelivery: '2025-01-12'
        },
        {
            id: 'ORD002',
            type: 'digital',
            items: 'Class 11 Physics & Chemistry PDFs',
            date: '2025-01-08',
            status: 'delivered',
            downloadCount: 3
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'processing': return <Clock size={16} />;
            case 'shipped': return <Truck size={16} />;
            case 'delivered': return <CheckCircle size={16} />;
            default: return <Package size={16} />;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // In real app, this would call API to update user data
        console.log('Saving user data:', formData);
        setIsEditing(false);
        // Update user in context would happen here
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            classId: user?.classId || 'class10'
        });
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // If not authenticated, show login prompt
    if (!isAuthenticated) {
        return (
            <div className="profile-page">
                <div className="page-header">
                    <div className="container">
                        <h1 className="hero-title">My Profile</h1>
                    </div>
                </div>
                <div className="container">
                    <div className="not-logged-in">
                        <div className="empty-icon">
                            <User size={48} />
                        </div>
                        <h2>You're not logged in</h2>
                        <p>Login or register to view your profile and purchase history</p>
                        <button className="btn btn-primary btn-lg" onClick={openRegistrationModal}>
                            Login / Register
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="hero-title">My Profile</h1>
                    <p className="page-description">
                        Manage your account information and track orders
                    </p>
                </div>
            </div>

            <div className="container profile-container">
                <div className="profile-grid">
                    {/* User Info Card */}
                    <div className="profile-card user-info-card">
                        <div className="card-header">
                            <h2>
                                <User size={20} />
                                <span>Personal Information</span>
                            </h2>
                            {!isEditing ? (
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                    <Edit3 size={16} />
                                    <span>Edit</span>
                                </button>
                            ) : (
                                <div className="edit-actions">
                                    <button className="save-btn" onClick={handleSave}>
                                        <Save size={16} />
                                        <span>Save</span>
                                    </button>
                                    <button className="cancel-btn" onClick={handleCancel}>
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="user-avatar-section">
                            <div className="user-avatar-large">
                                <User size={40} />
                            </div>
                            <div className="user-status">
                                <span className="status-badge">Active Student</span>
                            </div>
                        </div>

                        <div className="user-form">
                            <div className="form-group">
                                <label>
                                    <User size={14} />
                                    <span>Full Name</span>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your name"
                                    />
                                ) : (
                                    <p className="form-value">{user?.name || 'Not set'}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    <Mail size={14} />
                                    <span>Email Address</span>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your email"
                                    />
                                ) : (
                                    <p className="form-value">{user?.email || 'Not set'}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    <Phone size={14} />
                                    <span>Phone Number</span>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your phone"
                                        maxLength={10}
                                    />
                                ) : (
                                    <p className="form-value">{user?.phone || 'Not set'}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    <GraduationCap size={14} />
                                    <span>Class</span>
                                </label>
                                {isEditing ? (
                                    <select
                                        name="classId"
                                        value={formData.classId}
                                        onChange={handleChange}
                                        className="form-input"
                                    >
                                        {CLASSES.map(cls => (
                                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="form-value">
                                        {CLASSES.find(c => c.id === user?.classId)?.name || 'Not set'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button className="logout-btn" onClick={handleLogout}>
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Right Column */}
                    <div className="profile-right-column">
                        {/* Quick Stats */}
                        <div className="profile-card quick-stats-card">
                            <h2>Quick Stats</h2>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <FileText size={24} />
                                    <div className="stat-info">
                                        <span className="stat-number">{purchasedItems.filter(p => p.packageType === 'pdfs' || p.packageType === 'bundle').length}</span>
                                        <span className="stat-label">PDF Packages</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <Video size={24} />
                                    <div className="stat-info">
                                        <span className="stat-number">{purchasedItems.filter(p => p.packageType === 'videos' || p.packageType === 'bundle').length}</span>
                                        <span className="stat-label">Video Courses</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <Package size={24} />
                                    <div className="stat-info">
                                        <span className="stat-number">{orders.length}</span>
                                        <span className="stat-label">Total Orders</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order History */}
                        <div className="profile-card orders-card">
                            <div className="card-header">
                                <h2>
                                    <Package size={20} />
                                    <span>Order History</span>
                                </h2>
                            </div>

                            {orders.length > 0 ? (
                                <div className="orders-list">
                                    {orders.map(order => (
                                        <div key={order.id} className="order-item">
                                            <div className="order-header">
                                                <div className="order-info">
                                                    <span className="order-id">#{order.id}</span>
                                                    <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                                                </div>
                                                <span className={`order-status ${getStatusColor(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    <span>{order.status}</span>
                                                </span>
                                            </div>
                                            <div className="order-content">
                                                <div className="order-type">
                                                    {order.type === 'hardcopy' ? <Truck size={16} /> : <FileText size={16} />}
                                                    <span>{order.type === 'hardcopy' ? 'Hard Copy' : 'Digital'}</span>
                                                </div>
                                                <p className="order-items">{order.items}</p>
                                            </div>
                                            {order.type === 'hardcopy' && order.status === 'shipped' && (
                                                <div className="tracking-info">
                                                    <span>Tracking: {order.trackingId}</span>
                                                    <span>Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                            <button className="order-details-btn">
                                                <span>View Details</span>
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-orders">
                                    <Package size={32} />
                                    <p>No orders yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
