import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authAPI } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    // User state
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Selected class
    const [selectedClass, setSelectedClass] = useState('class10');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalType, setModalType] = useState(null);

    // Purchase state
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // Restore session on app load
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const token = localStorage.getItem('token');
                const savedUser = localStorage.getItem('user');

                if (token && savedUser) {
                    // Validate token with backend
                    const result = await authAPI.getMe(token);

                    if (result.success) {
                        setUser(result.data);
                        setIsAuthenticated(true);
                        // Update stored user data
                        localStorage.setItem('user', JSON.stringify(result.data));
                    } else {
                        // Token is invalid, clear storage
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
            } catch (error) {
                console.error('Session restore error:', error);
                // On error, try to use cached user data
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    try {
                        setUser(JSON.parse(savedUser));
                        setIsAuthenticated(true);
                    } catch {
                        localStorage.removeItem('user');
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, []);

    // Open login modal
    const openLoginModal = useCallback(() => {
        setModalType('login');
        setIsModalOpen(true);
    }, []);

    // Open registration modal
    const openRegistrationModal = useCallback((plan = null) => {
        setSelectedPlan(plan);
        setModalType('registration');
        setIsModalOpen(true);
    }, []);

    // Open checkout modal
    const openCheckoutModal = useCallback((item) => {
        setModalContent(item);
        setModalType('checkout');
        setIsModalOpen(true);
    }, []);

    // Open PDF preview modal
    const openPDFPreview = useCallback((pdf) => {
        setModalContent(pdf);
        setModalType('pdfPreview');
        setIsModalOpen(true);
    }, []);

    // Open video preview modal
    const openVideoPreview = useCallback((video) => {
        setModalContent(video);
        setModalType('videoPreview');
        setIsModalOpen(true);
    }, []);

    // Close modal
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setModalContent(null);
        setModalType(null);
        setSelectedPlan(null);
    }, []);

    // Register user (called after successful API registration)
    const registerUser = useCallback((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    // Login user
    const loginUser = useCallback(async (phone, password) => {
        try {
            const result = await authAPI.login(phone, password);

            if (result.success) {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', JSON.stringify(result.data.user));
                setUser(result.data.user);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    }, []);

    // Complete purchase
    const completePurchase = useCallback((purchaseData) => {
        setPurchasedItems(prev => [...prev, purchaseData]);
        localStorage.setItem('genii_purchases', JSON.stringify([...purchasedItems, purchaseData]));
    }, [purchasedItems]);

    // Check if item is purchased
    const isItemPurchased = useCallback((itemId) => {
        return purchasedItems.some(item => item.id === itemId);
    }, [purchasedItems]);

    // Check if class package is purchased
    const isClassPackagePurchased = useCallback((classId, packageType) => {
        return purchasedItems.some(
            item => item.classId === classId &&
                (item.packageType === packageType || item.packageType === 'bundle')
        );
    }, [purchasedItems]);

    // Toggle mobile menu
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    // Close mobile menu
    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    // Logout
    const logout = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('genii_purchases');
    }, []);

    const value = {
        // User state
        user,
        isAuthenticated,
        registerUser,
        loginUser,
        logout,

        // Class selection
        selectedClass,
        setSelectedClass,

        // Modal management
        isModalOpen,
        modalContent,
        modalType,
        selectedPlan,
        openLoginModal,
        openRegistrationModal,
        openCheckoutModal,
        openPDFPreview,
        openVideoPreview,
        closeModal,

        // Purchase management
        purchasedItems,
        completePurchase,
        isItemPurchased,
        isClassPackagePurchased,

        // Mobile menu
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,

        // Loading state
        isLoading,
        setIsLoading
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}

export default AppContext;
