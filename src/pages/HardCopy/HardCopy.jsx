import { useState } from 'react';
import {
    Truck,
    Package,
    MapPin,
    User,
    Phone,
    Mail,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES, HARD_COPY_PRICING } from '../../data/mockData';
import './HardCopy.css';

function HardCopy() {
    const { selectedClass, setSelectedClass } = useApp();

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

    const pricing = HARD_COPY_PRICING[selectedClass];
    const totalPrice = pricing.price + pricing.shipping;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="hardcopy-page">
                <div className="page-header">
                    <div className="container">
                        <h1 className="page-title">Order Hard Copy</h1>
                    </div>
                </div>
                <div className="container">
                    <div className="success-container">
                        <div className="success-icon-large">
                            <CheckCircle size={64} />
                        </div>
                        <h2>Order Placed Successfully!</h2>
                        <p>We have received your order for {CLASSES.find(c => c.id === selectedClass)?.name} materials.</p>
                        <p>A confirmation email has been sent to {formData.email}</p>
                        <p className="delivery-note">Expected delivery: 5-7 business days</p>
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
                    <h1 className="page-title">Order Hard Copy</h1>
                    <p className="page-description">
                        Get printed materials delivered to your doorstep
                    </p>
                </div>
            </div>

            <div className="container hardcopy-container">
                <div className="hardcopy-grid">
                    {/* Order Form */}
                    <div className="order-form-section">
                        <h2 className="form-section-title">
                            <Truck size={20} />
                            <span>Delivery Details</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="order-form">
                            {/* Personal Details */}
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

                            {/* Address Details */}
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

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg order-submit"
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
                                        <span>Place Order - ₹{totalPrice.toLocaleString()}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary-section">
                        <div className="order-summary-card">
                            <h2 className="summary-title">
                                <Package size={20} />
                                <span>Order Summary</span>
                            </h2>

                            {/* Class Selection */}
                            <div className="summary-class-select">
                                <label>Select Class</label>
                                <div className="class-options">
                                    {CLASSES.map((cls) => (
                                        <button
                                            key={cls.id}
                                            type="button"
                                            className={`class-option ${selectedClass === cls.id ? 'class-option-active' : ''}`}
                                            onClick={() => setSelectedClass(cls.id)}
                                        >
                                            {cls.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="summary-details">
                                <div className="summary-row">
                                    <span>Materials Package</span>
                                    <span>₹{pricing.price.toLocaleString()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>₹{pricing.shipping}</span>
                                </div>
                                <div className="summary-row summary-total">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Includes */}
                            <div className="summary-includes">
                                <h4>Package Includes:</h4>
                                <ul>
                                    <li>All subject materials for {CLASSES.find(c => c.id === selectedClass)?.name}</li>
                                    <li>High-quality printed booklets</li>
                                    <li>Practice worksheets</li>
                                    <li>Quick revision notes</li>
                                </ul>
                            </div>

                            <p className="delivery-info">
                                Delivery within 5-7 business days
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HardCopy;
