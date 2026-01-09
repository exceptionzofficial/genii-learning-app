import { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Lock,
    GraduationCap,
    School,
    MapPin,
    ArrowLeft,
    ArrowRight,
    Check,
    BookOpen,
    Stethoscope,
    Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES, BOARD_TYPES } from '../../data/mockData';
import './RegistrationForm.css';

function RegistrationForm() {
    const { registerUser, closeModal, selectedPlan, completePurchase } = useApp();

    // Multi-step form (1: Class/Board, 2: Personal Details, 3: Contact & Location)
    const [step, setStep] = useState(1);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        whatsapp: '',
        school: '',
        institution: '',
        pincode: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const classIcons = {
        class10: <BookOpen size={32} />,
        class11: <BookOpen size={32} />,
        class12: <GraduationCap size={32} />,
        neet: <Stethoscope size={32} />
    };

    const classColors = {
        class10: '#3498db',
        class11: '#9b59b6',
        class12: '#e67e22',
        neet: '#1abc9c'
    };

    const handleClassSelect = (classId) => {
        setSelectedClass(classId);
        if (classId === 'neet') {
            // NEET doesn't need board selection
            setSelectedBoard('neet');
            setStep(2);
        }
        // For other classes, stay on step 1 but show board selection
    };

    const handleBoardSelect = (boardId) => {
        setSelectedBoard(boardId);
        setStep(2);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};

        if (!formData.whatsapp.trim()) {
            newErrors.whatsapp = 'WhatsApp number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.whatsapp)) {
            newErrors.whatsapp = 'Please enter a valid 10-digit number';
        }

        if (selectedClass === 'neet') {
            if (!formData.institution.trim()) {
                newErrors.institution = 'Institution/coaching name is required';
            }
        } else {
            if (!formData.school.trim()) {
                newErrors.school = 'School name is required';
            }
        }

        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (step === 2 && validateStep2()) {
            setStep(3);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep3()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Register user
        const userData = {
            ...formData,
            classId: selectedClass,
            board: selectedBoard
        };

        registerUser(userData);

        // If there's a selected plan, complete purchase
        if (selectedPlan) {
            completePurchase(selectedPlan, selectedClass);
        }

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    // Render class selection (Step 1)
    const renderClassSelection = () => (
        <div className="step-content class-selection-step">
            <div className="step-header">
                <h3>Select Your Class</h3>
                <p>Choose your current class or exam preparation</p>
            </div>

            <div className="class-cards-grid">
                {CLASSES.map((cls) => (
                    <button
                        key={cls.id}
                        type="button"
                        className={`class-select-card ${selectedClass === cls.id ? 'class-card-selected' : ''}`}
                        onClick={() => handleClassSelect(cls.id)}
                        style={{ '--class-color': classColors[cls.id] }}
                    >
                        <div className="class-card-icon" style={{ backgroundColor: classColors[cls.id] }}>
                            {classIcons[cls.id]}
                        </div>
                        <span className="class-card-name">{cls.name}</span>
                    </button>
                ))}
            </div>

            {/* Show board selection for non-NEET classes */}
            {selectedClass && selectedClass !== 'neet' && (
                <div className="board-selection">
                    <h4>Select Board Type</h4>
                    <div className="board-options">
                        {BOARD_TYPES.map((board) => (
                            <button
                                key={board.id}
                                type="button"
                                className={`board-option ${selectedBoard === board.id ? 'board-option-selected' : ''}`}
                                onClick={() => handleBoardSelect(board.id)}
                            >
                                <span className="board-name">{board.name}</span>
                                <span className="board-description">{board.description}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // Render personal details (Step 2)
    const renderPersonalDetails = () => (
        <div className="step-content personal-details-step">
            <button
                type="button"
                className="back-button"
                onClick={() => {
                    setStep(1);
                    setSelectedBoard(null);
                }}
            >
                <ArrowLeft size={18} />
                <span>Back</span>
            </button>

            <div className="selected-class-badge" style={{ backgroundColor: classColors[selectedClass] }}>
                {classIcons[selectedClass]}
                <span>{CLASSES.find(c => c.id === selectedClass)?.name}</span>
                {selectedBoard && selectedBoard !== 'neet' && (
                    <span className="board-badge">{BOARD_TYPES.find(b => b.id === selectedBoard)?.name}</span>
                )}
            </div>

            <div className="step-header">
                <h3>Personal Details</h3>
                <p>Create your account to get started</p>
            </div>

            <div className="form-grid">
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
                        autoCapitalize="words"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
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
                        <Lock size={14} />
                        <span>Password</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                        placeholder="Create a password (min 6 characters)"
                    />
                    {errors.password && <span className="form-error">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <Lock size={14} />
                        <span>Confirm Password</span>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                </div>
            </div>

            <button type="button" className="btn btn-primary btn-lg continue-btn" onClick={handleNextStep}>
                <span>Continue</span>
                <ArrowRight size={18} />
            </button>
        </div>
    );

    // Render contact & location (Step 3)
    const renderContactLocation = () => (
        <div className="step-content contact-step">
            <button
                type="button"
                className="back-button"
                onClick={() => setStep(2)}
            >
                <ArrowLeft size={18} />
                <span>Back</span>
            </button>

            <div className="step-header">
                <h3>Contact & Location</h3>
                <p>We need a few more details</p>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                        <Phone size={14} />
                        <span>WhatsApp Number</span>
                    </label>
                    <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className={`form-input ${errors.whatsapp ? 'form-input-error' : ''}`}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                    />
                    {errors.whatsapp && <span className="form-error">{errors.whatsapp}</span>}
                </div>

                {selectedClass === 'neet' ? (
                    <div className="form-group">
                        <label className="form-label">
                            <School size={14} />
                            <span>Institution / Coaching Name</span>
                        </label>
                        <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            className={`form-input ${errors.institution ? 'form-input-error' : ''}`}
                            placeholder="Enter your institution name"
                        />
                        {errors.institution && <span className="form-error">{errors.institution}</span>}
                    </div>
                ) : (
                    <div className="form-group">
                        <label className="form-label">
                            <School size={14} />
                            <span>School Name</span>
                        </label>
                        <input
                            type="text"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            className={`form-input ${errors.school ? 'form-input-error' : ''}`}
                            placeholder="Enter your school name"
                        />
                        {errors.school && <span className="form-error">{errors.school}</span>}
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">
                        <MapPin size={14} />
                        <span>{selectedClass === 'neet' ? 'Pincode' : 'School Pincode'}</span>
                    </label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`form-input ${errors.pincode ? 'form-input-error' : ''}`}
                        placeholder="Enter 6-digit pincode"
                        maxLength={6}
                    />
                    {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                </div>
            </div>

            {/* Show selected plan if any */}
            {selectedPlan && (
                <div className="plan-summary">
                    <span className="plan-label">Selected Plan</span>
                    <div className="plan-details">
                        <span className="plan-name">{selectedPlan.name}</span>
                        <span className="plan-price">₹{selectedPlan.price?.toLocaleString()}</span>
                    </div>
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary btn-lg submit-btn"
                disabled={isSubmitting}
                onClick={handleSubmit}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Creating Account...</span>
                    </>
                ) : (
                    <>
                        <span>{selectedPlan ? 'Create Account & Pay' : 'Create Account'}</span>
                        <ArrowRight size={18} />
                    </>
                )}
            </button>

            <p className="terms-text">
                By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </p>
        </div>
    );

    // Success state
    if (isSuccess) {
        return (
            <div className="registration-success">
                <div className="success-icon">
                    <Check size={40} />
                </div>
                <h3>Account Created Successfully!</h3>
                <p>Welcome to Genii Books. Your learning journey begins now.</p>
                {selectedPlan && (
                    <p className="purchase-note">Your purchase has been completed. You can access your content from My Downloads.</p>
                )}
                <button className="btn btn-primary" onClick={closeModal}>
                    Start Learning
                </button>
            </div>
        );
    }

    return (
        <div className="registration-form">
            {/* Progress Indicator */}
            <div className="step-progress">
                <div className={`step-dot ${step >= 1 ? 'step-dot-active' : ''}`}>1</div>
                <div className={`step-line ${step >= 2 ? 'step-line-active' : ''}`}></div>
                <div className={`step-dot ${step >= 2 ? 'step-dot-active' : ''}`}>2</div>
                <div className={`step-line ${step >= 3 ? 'step-line-active' : ''}`}></div>
                <div className={`step-dot ${step >= 3 ? 'step-dot-active' : ''}`}>3</div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                {step === 1 && renderClassSelection()}
                {step === 2 && renderPersonalDetails()}
                {step === 3 && renderContactLocation()}
            </form>
        </div>
    );
}

export default RegistrationForm;
