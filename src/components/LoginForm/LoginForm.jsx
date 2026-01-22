import { useState } from 'react';
import { Phone, Lock, Loader2, ArrowRight, UserPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './LoginForm.css';

function LoginForm({ onSwitchToRegister }) {
    const { loginUser, closeModal } = useApp();

    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setApiError('');
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit number';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        setApiError('');

        const result = await loginUser(formData.phone, formData.password);

        if (result.success) {
            closeModal();
        } else {
            setApiError(result.message || 'Invalid phone number or password');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="login-form">
            <div className="login-header">
                <h2>Welcome Back!</h2>
                <p>Login to continue your learning journey</p>
            </div>

            {apiError && (
                <div className="api-error">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
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
                        placeholder="Enter your 10-digit number"
                        maxLength={10}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <Lock size={14} />
                        <span>Password</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="form-error">{errors.password}</span>}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-lg login-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Logging in...</span>
                        </>
                    ) : (
                        <>
                            <span>Login</span>
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="login-footer">
                <p>Don't have an account?</p>
                <button type="button" className="switch-btn" onClick={onSwitchToRegister}>
                    <UserPlus size={16} />
                    <span>Create Account</span>
                </button>
            </div>
        </div>
    );
}

export default LoginForm;
