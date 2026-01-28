import { useState, useEffect } from 'react';
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
    ChevronRight,
    Loader2,
    RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ordersAPI, authAPI } from '../../services/api';
import { CLASSES } from '../../data/mockData';
import './Profile.css';

function Profile() {
    const { user, isAuthenticated, purchasedItems, logout, openLoginModal } = useApp();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        classId: user?.classId || 'class10'
    });

    // Orders state
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [ordersError, setOrdersError] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);

    // Fetch orders on component mount
    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    // Update form data when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                classId: user.classId || 'class10'
            });
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoadingOrders(true);
            setOrdersError('');
            const token = localStorage.getItem('token');

            if (!token) {
                setOrdersError('Please login to view orders');
                return;
            }

            const result = await ordersAPI.getMyOrders(token);

            if (result.success) {
                setOrders(result.data || []);
            } else {
                setOrdersError(result.message || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error('Fetch orders error:', error);
            setOrdersError('Failed to connect to server');
        } finally {
            setLoadingOrders(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'status-processing';
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'completed': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'processing': return <Clock size={16} />;
            case 'shipped': return <Truck size={16} />;
            case 'delivered': return <CheckCircle size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            default: return <Package size={16} />;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setSavingProfile(true);
            const token = localStorage.getItem('token');

            const result = await authAPI.updateProfile(token, formData);

            if (result.success) {
                // Update localStorage with new user data
                localStorage.setItem('user', JSON.stringify(result.data));
                setIsEditing(false);
            } else {
                alert(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Save profile error:', error);
            alert('Failed to save profile');
        } finally {
            setSavingProfile(false);
        }
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
                        <button className="btn btn-primary btn-lg" onClick={openLoginModal}>
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
                                    <button className="save-btn" onClick={handleSave} disabled={savingProfile}>
                                        {savingProfile ? <Loader2 size={16} className="spin" /> : <Save size={16} />}
                                        <span>{savingProfile ? 'Saving...' : 'Save'}</span>
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
                                <p className="form-value">{user?.phone || 'Not set'}</p>
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
                                        <span className="stat-number">{purchasedItems.filter(p => p.packageType === 'pdfs' || p.packageType === 'bundle' || p.type === 'single-pdf').length}</span>
                                        <span className="stat-label">PDFs Purchased</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <Video size={24} />
                                    <div className="stat-info">
                                        <span className="stat-number">{purchasedItems.filter(p => p.packageType === 'videos' || p.packageType === 'bundle' || p.type === 'single-video').length}</span>
                                        <span className="stat-label">Videos Unlocked</span>
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
                                <button className="refresh-btn" onClick={fetchOrders} disabled={loadingOrders}>
                                    <RefreshCw size={16} className={loadingOrders ? 'spin' : ''} />
                                </button>
                            </div>

                            {loadingOrders ? (
                                <div className="loading-orders">
                                    <Loader2 size={32} className="spin" />
                                    <p>Loading orders...</p>
                                </div>
                            ) : ordersError ? (
                                <div className="orders-error">
                                    <p>{ordersError}</p>
                                    <button onClick={fetchOrders}>
                                        <RefreshCw size={16} /> Retry
                                    </button>
                                </div>
                            ) : orders.length > 0 ? (
                                <div className="orders-list">
                                    {orders.map(order => (
                                        <div key={order.orderId} className="order-item">
                                            <div className="order-header">
                                                <div className="order-info">
                                                    <span className="order-id">#{order.orderId?.slice(-8) || 'N/A'}</span>
                                                    <span className="order-date">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</span>
                                                </div>
                                                <span className={`order-status ${getStatusColor(order.orderStatus)}`}>
                                                    {getStatusIcon(order.orderStatus)}
                                                    <span>{order.orderStatus || 'pending'}</span>
                                                </span>
                                            </div>
                                            <div className="order-content">
                                                <div className="order-type">
                                                    {order.orderType === 'hardcopy' ? <Truck size={16} /> : <FileText size={16} />}
                                                    <span>{order.orderType === 'hardcopy' ? 'Hard Copy' : 'Digital'}</span>
                                                </div>
                                                <p className="order-items">{order.packageType || 'Package'} - ₹{order.amount?.toLocaleString() || 0}</p>
                                            </div>
                                            {order.orderType === 'hardcopy' && order.orderStatus === 'shipped' && order.trackingId && (
                                                <div className="tracking-info">
                                                    <span>Tracking: {order.trackingId}</span>
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
