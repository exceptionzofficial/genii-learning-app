import { useState } from 'react';
import {
    ShoppingCart,
    CreditCard,
    CheckCircle,
    Lock,
    FileText,
    Video,
    Package,
    X,
    Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ordersAPI } from '../../services/api';
import './CheckoutModal.css';

function CheckoutModal({ item, onClose }) {
    const { user, isAuthenticated, completePurchase } = useApp();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Determine item details
    const itemName = item?.name || item?.title || 'Package';
    const itemPrice = item?.price || 0;
    const itemType = item?.type || item?.packageType || 'digital';

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError('');

            const token = localStorage.getItem('token');

            if (!token) {
                setError('Please login to continue');
                return;
            }

            // Create order in backend with completed status (demo mode - no actual payment)
            const orderData = {
                orderType: itemType.includes('hardcopy') ? 'hardcopy' : 'digital',
                items: [{ id: item?.id, name: itemName, price: itemPrice }],
                classId: item?.classId || user?.classId || '',
                packageType: itemType,
                amount: itemPrice,
                paymentMethod: 'demo', // Demo mode - will change to razorpay when integrated
                paymentStatus: 'completed', // Mark as completed for demo
                orderStatus: 'completed' // Mark as completed for demo
            };

            const result = await ordersAPI.create(token, orderData);

            if (result.success) {
                // Mark as purchased locally
                completePurchase({
                    ...item,
                    orderId: result.data?.orderId,
                    purchasedAt: new Date().toISOString()
                });
                setSuccess(true);
            } else {
                setError(result.message || 'Failed to create order');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="checkout-modal">
                <div className="checkout-success">
                    <div className="success-icon">
                        <CheckCircle size={48} />
                    </div>
                    <h3>Purchase Successful!</h3>
                    <p>Thank you for your purchase. You now have full access to {itemName}.</p>
                    <button className="btn btn-primary" onClick={onClose}>
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-modal">
            <div className="checkout-header">
                <h2>Complete Your Purchase</h2>
                <button className="close-btn" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
                <div className="summary-header">
                    <ShoppingCart size={18} />
                    <span>Order Summary</span>
                </div>
                <div className="summary-item">
                    <div className="item-icon">
                        {itemType.includes('video') ? <Video size={24} /> :
                            itemType.includes('bundle') ? <Package size={24} /> :
                                <FileText size={24} />}
                    </div>
                    <div className="item-details">
                        <span className="item-name">{itemName}</span>
                        <span className="item-type">{itemType}</span>
                    </div>
                    <span className="item-price">₹{itemPrice.toLocaleString()}</span>
                </div>
                <div className="summary-total">
                    <span>Total Amount</span>
                    <span className="total-price">₹{itemPrice.toLocaleString()}</span>
                </div>
            </div>

            {/* User Info */}
            {isAuthenticated && user && (
                <div className="buyer-info">
                    <span className="buyer-label">Purchasing as:</span>
                    <span className="buyer-name">{user.name || user.phone}</span>
                </div>
            )}

            {/* Payment Method */}
            <div className="payment-section">
                <div className="payment-header">
                    <CreditCard size={18} />
                    <span>Payment Method</span>
                </div>
                <div className="payment-option selected">
                    <div className="payment-radio">
                        <div className="radio-dot"></div>
                    </div>
                    <div className="payment-details">
                        <span className="payment-name">Razorpay</span>
                        <span className="payment-desc">UPI, Cards, Netbanking, Wallets</span>
                    </div>
                    <div className="payment-icons">
                        <img src="https://cdn.razorpay.com/static/assets/logo/payment/upi.svg" alt="UPI" />
                    </div>
                </div>
                <p className="coming-soon-note">
                    🚀 Payment integration coming soon! Click below to complete demo purchase.
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="checkout-error">
                    {error}
                </div>
            )}

            {/* Security Note */}
            <div className="security-note">
                <Lock size={14} />
                <span>Your payment information is secure</span>
            </div>

            {/* Pay Button */}
            <button
                className="btn btn-primary btn-lg pay-btn"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 size={20} className="spin" />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <Lock size={18} />
                        <span>Pay ₹{itemPrice.toLocaleString()}</span>
                    </>
                )}
            </button>
        </div>
    );
}

export default CheckoutModal;
