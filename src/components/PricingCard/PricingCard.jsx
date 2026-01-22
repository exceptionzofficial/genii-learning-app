import { Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './PricingCard.css';

function PricingCard({
    plan,
    isPopular = false,
    features = [],
    classId
}) {
    const {
        openLoginModal,
        openCheckoutModal,
        isClassPackagePurchased,
        isAuthenticated
    } = useApp();

    const isPurchased = isClassPackagePurchased(classId, plan.type);

    const handleBuyClick = () => {
        if (isAuthenticated) {
            // User is logged in - proceed to checkout
            openCheckoutModal({
                ...plan,
                classId,
                purchasedAt: new Date().toISOString()
            });
        } else {
            // User not logged in - open login modal
            openLoginModal();
        }
    };

    return (
        <div className={`pricing-card ${isPopular ? 'pricing-card-popular' : ''} ${isPurchased ? 'pricing-card-purchased' : ''}`}>
            {/* Popular Badge */}
            {isPopular && (
                <div className="popular-badge">
                    <Sparkles size={14} />
                    <span>Most Popular</span>
                </div>
            )}

            {/* Plan Name */}
            <h3 className="pricing-name">{plan.name}</h3>

            {/* Pricing */}
            <div className="pricing-amount">
                <span className="original-price">₹{plan.originalPrice?.toLocaleString()}</span>
                <div className="current-price">
                    <span className="currency">₹</span>
                    <span className="price">{plan.price.toLocaleString()}</span>
                </div>
                <span className="pricing-note">One-time purchase</span>
            </div>

            {/* Features List */}
            <ul className="pricing-features">
                {features.map((feature, index) => (
                    <li key={index} className="pricing-feature">
                        <Check size={16} className="feature-check" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            {isPurchased ? (
                <button className="btn btn-secondary pricing-btn" disabled>
                    <Check size={18} />
                    <span>Purchased</span>
                </button>
            ) : (
                <button
                    className={`btn pricing-btn ${isPopular ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={handleBuyClick}
                >
                    Buy Now
                </button>
            )}
        </div>
    );
}

export default PricingCard;
