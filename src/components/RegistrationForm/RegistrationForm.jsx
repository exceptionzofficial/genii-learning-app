import { useState } from 'react';
import {
    User,
    Phone,
    Mail,
    GraduationCap,
    Loader2,
    CheckCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES } from '../../data/mockData';
import './RegistrationForm.css';

function RegistrationForm() {
    const { selectedPlan, registerUser, closeModal, completePurchase, selectedClass } = useApp();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        studentClass: selectedClass
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Enter valid 10-digit phone number';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
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

        // Simulate API call / Razorpay integration
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Register user
        registerUser(formData);

        // Complete purchase if there's a selected plan
        if (selectedPlan) {
            completePurchase({
                id: `purchase-${Date.now()}`,
                classId: formData.studentClass,
                packageType: selectedPlan.type,
                packageName: selectedPlan.name,
                price: selectedPlan.price,
                purchaseDate: new Date().toISOString(),
                userEmail: formData.email
            });
        }

        setIsSubmitting(false);
        setIsSuccess(true);

        // Close modal after showing success
        setTimeout(() => {
            closeModal();
            setIsSuccess(false);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="registration-success">
                <div className="success-icon">
                    <CheckCircle size={48} />
                </div>
                <h3>Registration Successful!</h3>
                <p>A confirmation email has been sent to {formData.email}</p>
                {selectedPlan && (
                    <p className="success-plan">You now have access to {selectedPlan.name}</p>
                )}
            </div>
        );
    }

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            {/* Plan Info */}
            {selectedPlan && (
                <div className="selected-plan-info">
                    <span className="plan-label">Selected Plan</span>
                    <div className="plan-details">
                        <span className="plan-name">{selectedPlan.name}</span>
                        <span className="plan-price">₹{selectedPlan.price.toLocaleString()}</span>
                    </div>
                </div>
            )}

            {/* Name Field */}
            <div className="form-group">
                <label className="form-label" htmlFor="name">
                    <User size={16} />
                    <span>Full Name</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* Phone Field */}
            <div className="form-group">
                <label className="form-label" htmlFor="phone">
                    <Phone size={16} />
                    <span>Phone Number</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                    className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                    maxLength={10}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
                <label className="form-label" htmlFor="email">
                    <Mail size={16} />
                    <span>Email Address</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Class Selection */}
            <div className="form-group">
                <label className="form-label" htmlFor="studentClass">
                    <GraduationCap size={16} />
                    <span>Class</span>
                </label>
                <select
                    id="studentClass"
                    name="studentClass"
                    value={formData.studentClass}
                    onChange={handleChange}
                    className="form-input form-select"
                >
                    {CLASSES.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                            {cls.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary btn-lg registration-submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Processing...</span>
                    </>
                ) : (
                    <span>{selectedPlan ? 'Proceed to Payment' : 'Register'}</span>
                )}
            </button>

            <p className="form-note">
                By registering, you agree to our Terms & Conditions and Privacy Policy
            </p>
        </form>
    );
}

export default RegistrationForm;
