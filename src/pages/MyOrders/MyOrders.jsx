import { useState, useEffect } from 'react';
import {
    Package,
    Clock,
    CheckCircle,
    Truck,
    MapPin,
    Phone,
    Mail,
    User,
    Calendar,
    FileText,
    Video,
    Loader2,
    ShoppingBag,
    XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ordersAPI } from '../../services/api';
import './MyOrders.css';

function MyOrders() {
    const { isAuthenticated, openLoginModal } = useApp();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, digital, hardcopy

    useEffect(() => {
        if (!isAuthenticated) {
            openLoginModal();
            return;
        }
        fetchOrders();
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await ordersAPI.getMyOrders();
            if (response.success) {
                setOrders(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
            case 'completed':
                return <CheckCircle size={18} className="status-icon-success" />;
            case 'shipped':
                return <Truck size={18} className="status-icon-info" />;
            case 'processing':
                return <Clock size={18} className="status-icon-warning" />;
            case 'pending':
                return <Clock size={18} className="status-icon-warning" />;
            case 'cancelled':
                return <XCircle size={18} className="status-icon-error" />;
            default:
                return <Package size={18} />;
        }
    };

    const getOrderTypeIcon = (type) => {
        return type === 'hardcopy' ? <Truck size={16} /> : <FileText size={16} />;
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.orderType === filter;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="my-orders-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="hero-title">My Orders</h1>
                    <p className="page-description">Track your digital and physical book orders</p>
                </div>
            </div>

            <div className="container">
                {/* Filter Tabs */}
                <div className="filter-tabs">
                    <button
                        className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Orders ({orders.length})
                    </button>
                    <button
                        className={`tab ${filter === 'digital' ? 'tab-active' : ''}`}
                        onClick={() => setFilter('digital')}
                    >
                        <FileText size={16} />
                        Digital ({orders.filter(o => o.orderType === 'digital').length})
                    </button>
                    <button
                        className={`tab ${filter === 'hardcopy' ? 'tab-active' : ''}`}
                        onClick={() => setFilter('hardcopy')}
                    >
                        <Truck size={16} />
                        Hard Copy ({orders.filter(o => o.orderType === 'hardcopy').length})
                    </button>
                </div>

                {/* Orders List */}
                {loading ? (
                    <div className="loading-state">
                        <Loader2 size={32} className="spin" />
                        <p>Loading your orders...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="empty-state">
                        <ShoppingBag size={48} />
                        <h3>No Orders Found</h3>
                        <p>You haven't placed any {filter !== 'all' ? filter : ''} orders yet.</p>
                        <Link to={filter === 'hardcopy' ? '/hard-copy' : '/materials'} className="btn btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {filteredOrders.map(order => (
                            <div key={order.orderId} className={`order-card order-${order.orderType}`}>
                                <div className="order-header">
                                    <div className="order-id-section">
                                        <span className="order-type-badge">
                                            {getOrderTypeIcon(order.orderType)}
                                            {order.orderType === 'hardcopy' ? 'Hard Copy' : 'Digital'}
                                        </span>
                                        <span className="order-id">Order #{order.orderId?.slice(-8)}</span>
                                    </div>
                                    <div className="order-status">
                                        {getStatusIcon(order.orderStatus)}
                                        <span className={`status-text status-${order.orderStatus}`}>
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-body">
                                    {/* Order Items */}
                                    <div className="order-items">
                                        <h4>Items:</h4>
                                        {order.items && order.items.length > 0 ? (
                                            <ul>
                                                {order.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        {item.title || 'Item'}
                                                        {item.quantity > 1 && ` x${item.quantity}`}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="order-package">{order.packageType || 'N/A'}</p>
                                        )}
                                    </div>

                                    {/* Hard Copy Specific Info */}
                                    {order.orderType === 'hardcopy' && order.shippingAddress && (
                                        <div className="shipping-info">
                                            <h4>
                                                <MapPin size={16} />
                                                Shipping Address
                                            </h4>
                                            <p>
                                                {order.shippingAddress.name}<br />
                                                {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                                                {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                                                <Phone size={12} style={{ display: 'inline' }} /> {order.shippingAddress.phone}
                                            </p>
                                            {order.trackingNumber && (
                                                <div className="tracking-info">
                                                    <Truck size={14} />
                                                    <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Timeline for Hard Copy */}
                                    {order.orderType === 'hardcopy' && (
                                        <div className="order-timeline">
                                            <div className={`timeline-step ${['pending', 'processing', 'shipped', 'delivered'].includes(order.orderStatus) ? 'completed' : ''}`}>
                                                <div className="timeline-dot"></div>
                                                <span>Pending</span>
                                            </div>
                                            <div className={`timeline-step ${['processing', 'shipped', 'delivered'].includes(order.orderStatus) ? 'completed' : ''}`}>
                                                <div className="timeline-dot"></div>
                                                <span>Processing</span>
                                            </div>
                                            <div className={`timeline-step ${['shipped', 'delivered'].includes(order.orderStatus) ? 'completed' : ''}`}>
                                                <div className="timeline-dot"></div>
                                                <span>Shipped</span>
                                            </div>
                                            <div className={`timeline-step ${order.orderStatus === 'delivered' ? 'completed' : ''}`}>
                                                <div className="timeline-dot"></div>
                                                <span>Delivered</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="order-footer">
                                    <div className="order-meta">
                                        <span>
                                            <Calendar size={14} />
                                            {formatDate(order.createdAt)}
                                        </span>
                                    </div>
                                    <div className="order-amount">
                                        Total: <strong>₹{(order.amount || 0).toLocaleString()}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyOrders;
