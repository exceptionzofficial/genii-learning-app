import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    // User state
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Selected class
    const [selectedClass, setSelectedClass] = useState('10th');

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
    const [isLoading, setIsLoading] = useState(false);

    // Open registration modal
    const openRegistrationModal = useCallback((plan = null) => {
        setSelectedPlan(plan);
        setModalType('registration');
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

    // Register user
    const registerUser = useCallback((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        // In real app, this would save to backend
        localStorage.setItem('genii_user', JSON.stringify(userData));
    }, []);

    // Complete purchase
    const completePurchase = useCallback((purchaseData) => {
        setPurchasedItems(prev => [...prev, purchaseData]);
        // In real app, this would call backend API
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
        localStorage.removeItem('genii_user');
    }, []);

    const value = {
        // User state
        user,
        isAuthenticated,
        registerUser,
        logout,

        // Class selection
        selectedClass,
        setSelectedClass,

        // Modal management
        isModalOpen,
        modalContent,
        modalType,
        selectedPlan,
        openRegistrationModal,
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
