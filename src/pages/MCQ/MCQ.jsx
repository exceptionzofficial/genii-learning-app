import { useState, useEffect } from 'react';
import {
    HelpCircle,
    CheckCircle,
    XCircle,
    ChevronRight,
    ChevronLeft,
    RotateCcw,
    Loader2,
    AlertCircle,
    BookOpen,
    Trophy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { contentAPI } from '../../services/api';
import './MCQ.css';

function MCQ() {
    const { selectedClass, selectedBoard, isAuthenticated, openLoginModal } = useApp();
    const [mcqSets, setMcqSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentSet, setCurrentSet] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchMCQSets();
    }, [selectedClass, selectedBoard]);

    const fetchMCQSets = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await contentAPI.getMCQs(selectedClass, selectedBoard);
            if (response.success) {
                setMcqSets(response.data || []);
            } else {
                setError(response.message || 'Failed to fetch MCQs');
            }
        } catch (err) {
            console.error('Error fetching MCQs:', err);
            setError('Failed to load MCQs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStartTest = (set) => {
        if (!isAuthenticated) {
            openLoginModal();
            return;
        }
        setCurrentSet(set);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);
        setScore(0);
    };

    const handleAnswerSelect = (optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: optionIndex
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < currentSet.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResults();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateResults = () => {
        let correctCount = 0;
        currentSet.questions.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowResults(true);
    };

    const resetTest = () => {
        setCurrentSet(null);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);
        setScore(0);
    };

    if (loading) {
        return (
            <div className="mcq-page loading-center">
                <Loader2 size={48} className="spin" />
                <p>Loading Question Banks...</p>
            </div>
        );
    }

    if (currentSet) {
        if (!currentSet.questions || currentSet.questions.length === 0) {
            return (
                <div className="mcq-page">
                    <div className="container error-state">
                        <AlertCircle size={48} />
                        <h3>Empty Question Set</h3>
                        <p>This MCQ set doesn't have any questions yet.</p>
                        <button onClick={resetTest} className="btn-retry">Back to List</button>
                    </div>
                </div>
            );
        }

        if (showResults) {
            const percentage = (score / currentSet.questions.length) * 100;
            const wrong = currentSet.questions.length - score;
            return (
                <div className="mcq-page">
                    <div className="container results-container">
                        {/* Score Summary Card */}
                        <div className="result-card">
                            <div className="result-header">
                                <Trophy size={56} className="trophy-icon" />
                                <h2>Quiz Completed!</h2>
                                <div className="score-display">
                                    <span className="score-num">{score}</span>
                                    <span className="score-total">/ {currentSet.questions.length}</span>
                                </div>
                                <p className="percentage-text">{percentage.toFixed(1)}% Accuracy</p>
                            </div>

                            <div className="stats-row">
                                <div className="stat-box correct">
                                    <CheckCircle size={22} />
                                    <div>
                                        <span className="stat-val">{score}</span>
                                        <span className="stat-lbl">Correct</span>
                                    </div>
                                </div>
                                <div className="stat-box wrong">
                                    <XCircle size={22} />
                                    <div>
                                        <span className="stat-val">{wrong}</span>
                                        <span className="stat-lbl">Wrong</span>
                                    </div>
                                </div>
                                <div className="stat-box total">
                                    <HelpCircle size={22} />
                                    <div>
                                        <span className="stat-val">{currentSet.questions.length}</span>
                                        <span className="stat-lbl">Total</span>
                                    </div>
                                </div>
                            </div>

                            <div className="performance-summary">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                                </div>
                            </div>

                            <button className="btn-primary full-width" onClick={resetTest}>
                                <RotateCcw size={20} /> Back to MCQ Sets
                            </button>
                        </div>

                        {/* Detailed Answer Review */}
                        <div className="review-section">
                            <h3 className="review-heading">Answer Review</h3>
                            <div className="review-list">
                                {currentSet.questions.map((q, qIdx) => {
                                    const userAns = userAnswers[qIdx];
                                    const isCorrect = userAns === q.correctAnswer;
                                    return (
                                        <div key={qIdx} className={`review-card ${isCorrect ? 'review-correct' : 'review-wrong'}`}>
                                            <div className="review-card-header">
                                                <div className="review-q-badge">
                                                    {isCorrect
                                                        ? <CheckCircle size={20} className="icon-correct" />
                                                        : <XCircle size={20} className="icon-wrong" />}
                                                    <span>Question {qIdx + 1}</span>
                                                </div>
                                                <span className={`review-verdict ${isCorrect ? 'correct' : 'wrong'}`}>
                                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                                </span>
                                            </div>
                                            <p className="review-question-text">{q.question}</p>
                                            <div className="review-options">
                                                {q.options.map((opt, oIdx) => {
                                                    const isThisCorrect = oIdx === q.correctAnswer;
                                                    const isUserPick = oIdx === userAns;
                                                    let optionClass = 'review-option';
                                                    if (isThisCorrect) optionClass += ' option-correct';
                                                    if (isUserPick && !isThisCorrect) optionClass += ' option-wrong';

                                                    return (
                                                        <div key={oIdx} className={optionClass}>
                                                            <div className="review-option-letter">
                                                                {String.fromCharCode(65 + oIdx)}
                                                            </div>
                                                            <div className="review-option-text">{opt}</div>
                                                            <div className="review-option-indicator">
                                                                {isThisCorrect && <CheckCircle size={16} />}
                                                                {isUserPick && !isThisCorrect && <XCircle size={16} />}
                                                            </div>
                                                            {isUserPick && !isThisCorrect && (
                                                                <span className="your-answer-tag">Your Answer</span>
                                                            )}
                                                            {isThisCorrect && (
                                                                <span className="correct-answer-tag">Correct Answer</span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const currentQuestion = currentSet.questions[currentQuestionIndex];

        if (!currentQuestion) {
            return (
                <div className="mcq-page">
                    <div className="container error-state">
                        <AlertCircle size={48} />
                        <h3>Question Data Error</h3>
                        <p>Something went wrong while loading this question.</p>
                        <button onClick={resetTest} className="btn-retry">Restart Assessment</button>
                    </div>
                </div>
            );
        }

        const isAnswered = userAnswers[currentQuestionIndex] !== undefined;

        return (
            <div className="mcq-page">
                <div className="container test-container">
                    <div className="test-header">
                        <div className="test-info">
                            <h3>{currentSet.title}</h3>
                            <span className="q-counter">Question {currentQuestionIndex + 1} of {currentSet.questions.length}</span>
                        </div>
                        <button className="btn-exit" onClick={resetTest}><XCircle size={24} /></button>
                    </div>

                    <div className="progress-dots">
                        {currentSet.questions.map((_, i) => (
                            <div
                                key={i}
                                className={`dot ${i === currentQuestionIndex ? 'active' : ''} ${userAnswers[i] !== undefined ? 'answered' : ''}`}
                            ></div>
                        ))}
                    </div>

                    <div className="question-area">
                        <h2 className="question-text">{currentQuestion.question}</h2>
                        <div className="options-list">
                            {currentQuestion.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`option-item ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}`}
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                                    <div className="option-text">{option}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="test-footer">
                        <button
                            className="btn-nav"
                            disabled={currentQuestionIndex === 0}
                            onClick={handlePrevious}
                        >
                            <ChevronLeft size={20} /> Previous
                        </button>
                        <button
                            className={`btn-next ${!isAnswered ? 'disabled' : ''}`}
                            disabled={!isAnswered}
                            onClick={handleNext}
                        >
                            {currentQuestionIndex === currentSet.questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mcq-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="hero-title">Practice MCQs</h1>
                    <p className="page-description">Test your knowledge with chapter-wise objective questions</p>
                </div>
            </div>

            <div className="container mcq-container">
                {error ? (
                    <div className="error-state">
                        <AlertCircle size={48} />
                        <p>{error}</p>
                        <button onClick={fetchMCQSets} className="btn-retry">Try Again</button>
                    </div>
                ) : mcqSets.length === 0 ? (
                    <div className="empty-state">
                        <BookOpen size={64} />
                        <h3>No MCQ Sets Yet</h3>
                        <p>We are currently adding questions for this class. Stay tuned!</p>
                    </div>
                ) : (
                    <div className="mcq-grid">
                        {mcqSets.map((set) => (
                            <div key={set.contentId} className="mcq-card">
                                <div className="card-icon">
                                    <HelpCircle size={32} />
                                </div>
                                <div className="card-content">
                                    <h3>{set.title}</h3>
                                    <p className="card-desc">{set.description || 'Practice set for active learning'}</p>
                                    <div className="card-meta">
                                        <span className="meta-tag">{set.subject}</span>
                                        <span className="meta-info">{set.questions?.length || 0} Questions</span>
                                    </div>
                                    <button className="btn-start" onClick={() => handleStartTest(set)}>
                                        Start Practice <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MCQ;
