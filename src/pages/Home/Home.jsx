import { Link } from 'react-router-dom';
import {
    ArrowRight,
    FileText,
    Video,
    BookOpen,
    Download,
    IndianRupee,
    Truck,
    Star,
    Users,
    Clock,
    Award,
    ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLASSES, FEATURES, TESTIMONIALS, STATS } from '../../data/mockData';
import './Home.css';

// Icon mapping for features
const iconMap = {
    FileText: FileText,
    Video: Video,
    BookOpen: BookOpen,
    Download: Download,
    IndianRupee: IndianRupee,
    Truck: Truck
};

function Home() {
    const { setSelectedClass } = useApp();

    const handleClassSelect = (classId) => {
        setSelectedClass(classId);
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg"></div>
                <div className="container hero-container">
                    <div className="hero-content">
                        <span className="hero-badge">
                            <Award size={14} />
                            <span>Trusted by 10,000+ Students</span>
                        </span>
                        <h1 className="hero-title">
                            Quality Study Materials for
                            <span className="hero-highlight"> Academic Excellence</span>
                        </h1>
                        <p className="hero-description">
                            Comprehensive PDFs, video courses, and study materials for 10th, 11th, 12th, and NEET students.
                            Preview before you buy, download instantly, or order hard copies delivered to your doorstep.
                        </p>
                        <div className="hero-actions">
                            <Link to="/materials" className="btn btn-primary btn-lg">
                                <span>Explore Materials</span>
                                <ArrowRight size={18} />
                            </Link>
                            <Link to="/pricing" className="btn btn-secondary btn-lg">
                                <span>View Pricing</span>
                            </Link>
                        </div>
                        <div className="hero-stats">
                            {STATS.map((stat, index) => (
                                <div key={index} className="hero-stat">
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Class Selection Section */}
            <section className="classes-section section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Choose Your Class</h2>
                        <p className="section-description">
                            Select your class to view tailored study materials and courses
                        </p>
                    </div>
                    <div className="classes-grid">
                        {CLASSES.map((cls) => (
                            <Link
                                key={cls.id}
                                to="/materials"
                                className="class-card"
                                onClick={() => handleClassSelect(cls.id)}
                            >
                                <div className="class-icon">
                                    <BookOpen size={28} />
                                </div>
                                <h3 className="class-name">{cls.name}</h3>
                                <p className="class-description">{cls.description}</p>
                                <span className="class-link">
                                    <span>View Materials</span>
                                    <ChevronRight size={16} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Genii?</h2>
                        <p className="section-description">
                            Everything you need for academic success in one platform
                        </p>
                    </div>
                    <div className="features-grid">
                        {FEATURES.map((feature) => {
                            const IconComponent = iconMap[feature.icon];
                            return (
                                <div key={feature.id} className="feature-card">
                                    <div className="feature-icon">
                                        {IconComponent && <IconComponent size={24} />}
                                    </div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-description">
                            Get started in just 3 simple steps
                        </p>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3 className="step-title">Browse & Preview</h3>
                            <p className="step-description">
                                Explore our collection and preview first 5 pages of any PDF for free
                            </p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3 className="step-title">Purchase Securely</h3>
                            <p className="step-description">
                                Buy with confidence using secure Razorpay payment gateway
                            </p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3 className="step-title">Download & Learn</h3>
                            <p className="step-description">
                                Instantly download your materials and start learning immediately
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">What Students Say</h2>
                        <p className="section-description">
                            Join thousands of successful students
                        </p>
                    </div>
                    <div className="testimonials-grid">
                        {TESTIMONIALS.map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="testimonial-header">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="testimonial-avatar"
                                    />
                                    <div className="testimonial-info">
                                        <h4 className="testimonial-name">{testimonial.name}</h4>
                                        <span className="testimonial-class">{testimonial.class}</span>
                                    </div>
                                </div>
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={14} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="testimonial-text">{testimonial.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to Excel in Your Studies?</h2>
                            <p className="cta-description">
                                Get instant access to premium study materials and video courses
                            </p>
                            <div className="cta-actions">
                                <Link to="/pricing" className="btn btn-primary btn-lg">
                                    <span>Get Started Now</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
