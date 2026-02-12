import { useState, useEffect } from 'react';
import {
    Truck,
    Package,
    MapPin,
    User,
    Phone,
    Mail,
    CheckCircle,
    Loader2,
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { contentAPI, ordersAPI } from '../../services/api';
import './HardCopy.css';

function HardCopy() {
    const { isAuthenticated, openLoginModal, user } = useApp();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    const shippingCharge = 50;

    useEffect(() => {
        fetchHardCopyBooks();
    }, []);

    useEffect(() => {
        if (user && isAuthenticated) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || ''
            }));
        }
    }, [user, isAuthenticated]);

    const fetchHardCopyBooks = async () => {
        try {
            setLoading(true);
            const response = await contentAPI.getHardCopyContent();
            if (response.success) {
                setBooks(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching hard copy books:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (book) => {
        const existingItem = cart.find(item => item.contentId === book.contentId);
        if (existingItem) {
            setCart(cart.map(item =>
                item.contentId === book.contentId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...book, quantity: 1 }]);
        }
    };

    const removeFromCart = (contentId) => {
        setCart(cart.filter(item => item.contentId !== contentId));
    };

    const updateQuantity = (contentId, delta) => {
        setCart(cart.map(item => {
            if (item.contentId === contentId) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const calculateTotal = () => {
        const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return itemsTotal + shippingCharge;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Enter valid 10-digit number';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter valid email';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Enter valid 6-digit pincode';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            openLoginModal();
            return;
        }
        if (cart.length === 0) {
            alert('Please add books to cart');
            return;
        }
        setShowCheckout(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const orderData = {
                orderType: 'hardcopy',
                items: cart.map(item => ({
                    contentId: item.contentId,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity
                })),
                amount: calculateTotal(),
                paymentMethod: 'cod', // Cash on Delivery
                paymentStatus: 'pending',
                orderStatus: 'pending',
                shippingAddress: formData
            };

            const response = await ordersAPI.createOrder(orderData);

            if (response.success) {
                setIsSuccess(true);
                setOrderId(response.data.orderId);
                setCart([]);
                setShowCheckout(false);
            } else {
                alert(response.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order placement error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="hardcopy-page">
                <div className="page-header">
                    <div className="container">
                        <h1 className="hero-title">Order Placed!</h1>
                    </div>
                </div>
                <div className="container">
                    <div className="success-container">
                        <div className="success-icon-large">
                            <CheckCircle size={64} />
                        </div>
                        <h2>Order Placed Successfully!</h2>
                        <p>Order ID: <strong>{orderId.slice(-8)}</strong></p>
                        <p>A confirmation email has been sent to {formData.email}</p>
                        <p className="delivery-note">Expected delivery: 5-7 business days</p>
                        <button className="btn btn-primary" onClick={() => {
                            setIsSuccess(false);
                            setOrderId('');
                        }}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showCheckout) {
        return (
            <div className="hardcopy-page">
                <div className="page-header">
                    <div className="container">
                        <h1 className="hero-title">Checkout</h1>
                    </div>
                </div>

                <div className="container hardcopy-container">
                    <div className="hardcopy-grid">
                        {/* Delivery Form */}
                        <div className="order-form-section">
                            <h2 className="form-section-title">
                                <Truck size={20} />
                                <span>Delivery Details</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="order-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <User size={14} />
                                            <span>Full Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && <span className="form-error">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            <Phone size={14} />
                                            <span>Phone Number</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                                            placeholder="10-digit mobile number"
                                            maxLength={10}
                                        />
                                        {errors.phone && <span className="form-error">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Mail size={14} />
                                        <span>Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <span className="form-error">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <MapPin size={14} />
                                        <span>Address</span>
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`form-input form-textarea ${errors.address ? 'form-input-error' : ''}`}
                                        placeholder="House/Flat No., Street, Area"
                                        rows={3}
                                    />
                                    {errors.address && <span className="form-error">{errors.address}</span>}
                                </div>

                                <div className="form-row form-row-3">
                                    <div className="form-group">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                                            placeholder="City"
                                        />
                                        {errors.city && <span className="form-error">{errors.city}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className={`form-input ${errors.state ? 'form-input-error' : ''}`}
                                            placeholder="State"
                                        />
                                        {errors.state && <span className="form-error">{errors.state}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className={`form-input ${errors.pincode ? 'form-input-error' : ''}`}
                                            placeholder="6-digit"
                                            maxLength={6}
                                        />
                                        {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                                    </div>
                                </div>

                                <div className="checkout-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowCheckout(false)}>
                                        Back to Cart
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Truck size={18} />
                                                <span>Place Order - ₹{calculateTotal().toLocaleString()}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="order-summary-section">
                            <div className="order-summary-card">
                                <h2 className="summary-title">
                                    <Package size={20} />
                                    <span>Order Summary</span>
                                </h2>

                                <div className="cart-items">
                                    {cart.map(item => (
                                        <div key={item.contentId} className="cart-item-summary">
                                            <span className="item-title">{item.title}</span>
                                            <span className="item-qty">Qty: {item.quantity}</span>
                                            <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span>₹{shippingCharge}</span>
                                    </div>
                                    <div className="summary-row summary-total">
                                        <span>Total</span>
                                        <span>₹{calculateTotal().toLocaleString()}</span>
                                    </div>
                                </div>

                                <p className="delivery-info">
                                    Cash on Delivery | 5-7 business days
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="hardcopy-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="hero-title">Order Hard Copy Books</h1>
                    <p className="page-description">
                        Get printed materials delivered to your doorstep
                    </p>
                </div>
            </div>

            <div className="container">
                {/* Shopping Cart */}
                {cart.length > 0 && (
                    <div className="cart-section">
                        <div className="cart-header">
                            <h3>
                                <ShoppingCart size={20} />
                                Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                            </h3>
                            <button className="btn btn-primary" onClick={handleCheckout}>
                                Proceed to Checkout - ₹{calculateTotal().toLocaleString()}
                            </button>
                        </div>
                        <div className="cart-items-list">
                            {cart.map(item => (
                                <div key={item.contentId} className="cart-item">
                                    <div className="cart-item-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.contentId, -1)}>
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.contentId, 1)}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="cart-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        <button className="btn-remove" onClick={() => removeFromCart(item.contentId)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Books Grid */}
                <h2 className="section-title">Available Books</h2>

                {loading ? (
                    <div className="loading-state">
                        <Loader2 size={32} className="spin" />
                        <p>Loading hard copy books...</p>
                    </div>
                ) : books.length === 0 ? (
                    <div className="empty-state">
                        <BookOpen size={48} />
                        <h3>No Books Available</h3>
                        <p>Check back later for hard copy books.</p>
                    </div>
                ) : (
                    <div className="books-grid">
                        {books.map(book => {
                            const inCart = cart.find(item => item.contentId === book.contentId);
                            return (
                                <div key={book.contentId} className="book-card">
                                    <div className="book-thumbnail">
                                        {book.thumbnailUrl ? (
                                            <img src={book.thumbnailUrl} alt={book.title} />
                                        ) : (
                                            <div className="book-placeholder">
                                                <BookOpen size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="book-info">
                                        <h3>{book.title}</h3>
                                        <p className="book-description">{book.description}</p>
                                        <div className="book-meta">
                                            <span className="book-subject">{book.subject}</span>
                                            {book.pages && <span className="book-pages">{book.pages} pages</span>}
                                        </div>
                                        <div className="book-footer">
                                            <span className="book-price">₹{book.price}</span>
                                            {inCart ? (
                                                <button className="btn btn-secondary" disabled>
                                                    <CheckCircle size={16} />
                                                    In Cart ({inCart.quantity})
                                                </button>
                                            ) : (
                                                <button className="btn btn-primary" onClick={() => addToCart(book)}>
                                                    <Plus size={16} />
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HardCopy;
