import { useApp } from '../../context/AppContext';
import PricingCard from '../../components/PricingCard/PricingCard';
import { PRICING, CLASSES, FAQS } from '../../data/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import './Pricing.css';

function Pricing() {
    const { selectedClass, setSelectedClass } = useApp();
    const [openFaq, setOpenFaq] = useState(null);

    const pricing = PRICING[selectedClass];

    const planFeatures = {
        pdfs: [
            'All PDF materials for your class',
            'Instant download access',
            'Lifetime access',
            'Mobile-friendly PDFs',
            'Regularly updated content'
        ],
        videos: [
            'All video courses for your class',
            'Experienced instructors',
            'Lifetime access',
            'Watch on any device',
            'New videos added regularly'
        ],
        bundle: [
            'All PDFs for your class',
            'All video courses for your class',
            'Lifetime access to everything',
            'Priority support',
            'Free future updates',
            'Best value for money'
        ]
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="pricing-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Pricing Plans</h1>
                    <p className="page-description">
                        One-time purchase. Lifetime access. No hidden fees.
                    </p>
                </div>
            </div>

            <div className="container pricing-container">
                {/* Class Tabs */}
                <div className="class-tabs-centered">
                    {CLASSES.map((cls) => (
                        <button
                            key={cls.id}
                            className={`class-tab ${selectedClass === cls.id ? 'class-tab-active' : ''}`}
                            onClick={() => setSelectedClass(cls.id)}
                        >
                            {cls.name}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards */}
                <div className="pricing-grid">
                    <PricingCard
                        plan={{ ...pricing.pdfs, type: 'pdfs' }}
                        features={planFeatures.pdfs}
                        classId={selectedClass}
                    />
                    <PricingCard
                        plan={{ ...pricing.bundle, type: 'bundle' }}
                        features={planFeatures.bundle}
                        isPopular={true}
                        classId={selectedClass}
                    />
                    <PricingCard
                        plan={{ ...pricing.videos, type: 'videos' }}
                        features={planFeatures.videos}
                        classId={selectedClass}
                    />
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openFaq === index ? 'faq-item-open' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span>{faq.question}</span>
                                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {openFaq === index && (
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
