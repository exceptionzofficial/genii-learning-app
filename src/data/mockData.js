// Mock Data for Genii Learning Platform
// All prices are placeholders - actual prices will be fetched from Admin Panel

export const CLASSES = [
    { id: 'class10', name: 'Class 10', description: 'Board Exam Preparation' },
    { id: 'class11', name: 'Class 11', description: 'Foundation Building' },
    { id: 'class12', name: 'Class 12', description: 'Board + Entrance Ready' },
    { id: 'neet', name: 'NEET', description: 'Medical Entrance' }
];

// Board Types for Class 10, 11, 12 (Not for NEET)
export const BOARD_TYPES = [
    { id: 'state', name: 'State Board', description: 'Tamil Nadu State Board syllabus' },
    { id: 'cbse', name: 'CBSE', description: 'Central Board of Secondary Education' }
];

export const SUBJECTS = {
    'class10': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    'class11': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'],
    'class12': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'],
    'neet': ['Physics', 'Chemistry', 'Biology', 'Zoology', 'Botany']
};



// Hard Copy Pricing (placeholder)
export const HARD_COPY_PRICING = {
    'class10': { price: 2500, shipping: 100 },
    'class11': { price: 3000, shipping: 100 },
    'class12': { price: 3500, shipping: 100 },
    'neet': { price: 4000, shipping: 100 }
};

// Sample PDF Materials
export const PDF_MATERIALS = {
    'class10': [
        {
            id: 'pdf-10-1',
            title: 'Mathematics - Complete Guide',
            subject: 'Mathematics',
            chapters: 15,
            pages: 320,
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
            preview: 5,
            description: 'Comprehensive mathematics guide covering all chapters with solved examples and practice problems.'
        },
        {
            id: 'pdf-10-2',
            title: 'Science - Physics & Chemistry',
            subject: 'Science',
            chapters: 14,
            pages: 280,
            thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
            preview: 5,
            description: 'Complete physics and chemistry notes with diagrams, formulas, and important questions.'
        },
        {
            id: 'pdf-10-3',
            title: 'Science - Biology',
            subject: 'Science',
            chapters: 8,
            pages: 180,
            thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400',
            preview: 5,
            description: 'Biology notes covering life processes, reproduction, genetics, and environment.'
        },
        {
            id: 'pdf-10-4',
            title: 'Social Science - History & Civics',
            subject: 'Social Science',
            chapters: 10,
            pages: 220,
            thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400',
            preview: 5,
            description: 'Detailed notes on Indian history, political science, and civics for board exams.'
        },
        {
            id: 'pdf-10-5',
            title: 'English Literature & Grammar',
            subject: 'English',
            chapters: 12,
            pages: 200,
            thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
            preview: 5,
            description: 'Complete English guide with grammar rules, literature analysis, and writing skills.'
        }
    ],
    'class11': [
        {
            id: 'pdf-11-1',
            title: 'Physics - Mechanics & Waves',
            subject: 'Physics',
            chapters: 10,
            pages: 280,
            thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
            preview: 5,
            description: 'Foundation physics covering mechanics, waves, and thermodynamics with solved problems.'
        },
        {
            id: 'pdf-11-2',
            title: 'Chemistry - Physical & Organic',
            subject: 'Chemistry',
            chapters: 14,
            pages: 320,
            thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400',
            preview: 5,
            description: 'Comprehensive chemistry notes covering atomic structure, bonding, and organic chemistry basics.'
        },
        {
            id: 'pdf-11-3',
            title: 'Biology - Cell & Diversity',
            subject: 'Biology',
            chapters: 12,
            pages: 260,
            thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
            preview: 5,
            description: 'Complete biology covering cell biology, plant and animal diversity.'
        },
        {
            id: 'pdf-11-4',
            title: 'Mathematics - Algebra & Trigonometry',
            subject: 'Mathematics',
            chapters: 16,
            pages: 350,
            thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
            preview: 5,
            description: 'Advanced mathematics covering sets, functions, trigonometry, and coordinate geometry.'
        }
    ],
    'class12': [
        {
            id: 'pdf-12-1',
            title: 'Physics - Electromagnetism & Modern Physics',
            subject: 'Physics',
            chapters: 12,
            pages: 340,
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
            preview: 5,
            description: 'Advanced physics covering electrostatics, magnetism, optics, and modern physics.'
        },
        {
            id: 'pdf-12-2',
            title: 'Chemistry - Inorganic & Organic',
            subject: 'Chemistry',
            chapters: 16,
            pages: 380,
            thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
            preview: 5,
            description: 'Complete chemistry covering d-block elements, coordination compounds, and organic reactions.'
        },
        {
            id: 'pdf-12-3',
            title: 'Biology - Reproduction & Genetics',
            subject: 'Biology',
            chapters: 14,
            pages: 320,
            thumbnail: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=400',
            preview: 5,
            description: 'Advanced biology covering reproduction, genetics, biotechnology, and ecology.'
        },
        {
            id: 'pdf-12-4',
            title: 'Mathematics - Calculus & Vectors',
            subject: 'Mathematics',
            chapters: 13,
            pages: 360,
            thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400',
            preview: 5,
            description: 'Advanced mathematics covering calculus, vectors, 3D geometry, and probability.'
        }
    ],
    'neet': [
        {
            id: 'pdf-neet-1',
            title: 'NEET Physics - Complete',
            subject: 'Physics',
            chapters: 20,
            pages: 500,
            thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
            preview: 5,
            description: 'Complete NEET physics covering all topics with previous year questions and solutions.'
        },
        {
            id: 'pdf-neet-2',
            title: 'NEET Chemistry - Complete',
            subject: 'Chemistry',
            chapters: 25,
            pages: 580,
            thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400',
            preview: 5,
            description: 'Comprehensive NEET chemistry covering physical, organic, and inorganic chemistry.'
        },
        {
            id: 'pdf-neet-3',
            title: 'NEET Biology - Botany',
            subject: 'Botany',
            chapters: 15,
            pages: 420,
            thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400',
            preview: 5,
            description: 'Complete botany for NEET covering plant physiology, morphology, and ecology.'
        },
        {
            id: 'pdf-neet-4',
            title: 'NEET Biology - Zoology',
            subject: 'Zoology',
            chapters: 15,
            pages: 450,
            thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
            preview: 5,
            description: 'Complete zoology for NEET covering animal physiology, genetics, and evolution.'
        }
    ]
};

// Sample Video Courses
export const VIDEO_COURSES = {
    'class10': [
        {
            id: 'vid-10-1',
            title: 'Mathematics Masterclass',
            subject: 'Mathematics',
            lessons: 45,
            duration: '32 hours',
            thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400',
            instructor: 'Mr. Rajesh Kumar',
            description: 'Complete mathematics course with step-by-step problem solving.'
        },
        {
            id: 'vid-10-2',
            title: 'Science Complete Course',
            subject: 'Science',
            lessons: 60,
            duration: '48 hours',
            thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
            instructor: 'Dr. Priya Sharma',
            description: 'Physics, Chemistry, and Biology explained with experiments and animations.'
        },
        {
            id: 'vid-10-3',
            title: 'Social Science Made Easy',
            subject: 'Social Science',
            lessons: 35,
            duration: '25 hours',
            thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400',
            instructor: 'Mr. Amit Verma',
            description: 'History, Geography, and Civics with maps and timelines.'
        }
    ],
    'class11': [
        {
            id: 'vid-11-1',
            title: 'Physics Foundation',
            subject: 'Physics',
            lessons: 50,
            duration: '40 hours',
            thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
            instructor: 'Dr. Suresh Mehta',
            description: 'Build strong physics fundamentals for competitive exams.'
        },
        {
            id: 'vid-11-2',
            title: 'Chemistry Concepts',
            subject: 'Chemistry',
            lessons: 55,
            duration: '42 hours',
            thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400',
            instructor: 'Mrs. Kavitha Iyer',
            description: 'Conceptual chemistry with molecular visualizations.'
        },
        {
            id: 'vid-11-3',
            title: 'Biology Basics',
            subject: 'Biology',
            lessons: 45,
            duration: '35 hours',
            thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
            instructor: 'Dr. Meena Krishnan',
            description: 'Cell biology and life processes explained visually.'
        }
    ],
    'class12': [
        {
            id: 'vid-12-1',
            title: 'Physics Advanced',
            subject: 'Physics',
            lessons: 55,
            duration: '45 hours',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
            instructor: 'Dr. Suresh Mehta',
            description: 'Advanced physics for boards and entrance exams.'
        },
        {
            id: 'vid-12-2',
            title: 'Chemistry Mastery',
            subject: 'Chemistry',
            lessons: 60,
            duration: '48 hours',
            thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
            instructor: 'Mrs. Kavitha Iyer',
            description: 'Complete chemistry course for board exam success.'
        },
        {
            id: 'vid-12-3',
            title: 'Biology Complete',
            subject: 'Biology',
            lessons: 50,
            duration: '40 hours',
            thumbnail: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=400',
            instructor: 'Dr. Meena Krishnan',
            description: 'Advanced biology with detailed diagrams and explanations.'
        }
    ],
    'neet': [
        {
            id: 'vid-neet-1',
            title: 'NEET Physics Complete',
            subject: 'Physics',
            lessons: 80,
            duration: '65 hours',
            thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
            instructor: 'Dr. NEET Expert Team',
            description: 'Complete NEET physics with previous year solutions.'
        },
        {
            id: 'vid-neet-2',
            title: 'NEET Chemistry Complete',
            subject: 'Chemistry',
            lessons: 85,
            duration: '70 hours',
            thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400',
            instructor: 'Dr. NEET Expert Team',
            description: 'Comprehensive NEET chemistry preparation course.'
        },
        {
            id: 'vid-neet-3',
            title: 'NEET Biology Complete',
            subject: 'Biology',
            lessons: 100,
            duration: '85 hours',
            thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
            instructor: 'Dr. NEET Expert Team',
            description: 'Complete botany and zoology for NEET aspirants.'
        }
    ]
};

// Features for home page
export const FEATURES = [
    {
        id: 1,
        icon: 'FileText',
        title: 'Quality Study Materials',
        description: 'Expertly crafted PDFs covering entire syllabus with solved examples'
    },
    {
        id: 2,
        icon: 'Video',
        title: 'Video Lectures',
        description: 'Learn from experienced teachers with high-quality video content'
    },
    {
        id: 3,
        icon: 'BookOpen',
        title: 'Preview Before Buy',
        description: 'Check first 5 pages of any PDF before making purchase decision'
    },
    {
        id: 4,
        icon: 'Download',
        title: 'Instant Download',
        description: 'Get immediate access to your purchased materials'
    },
    {
        id: 5,
        icon: 'IndianRupee',
        title: 'Affordable Pricing',
        description: 'One-time purchase with lifetime access to materials'
    },
    {
        id: 6,
        icon: 'Truck',
        title: 'Hard Copy Delivery',
        description: 'Get printed materials delivered to your doorstep'
    }
];

// Testimonials
export const TESTIMONIALS = [
    {
        id: 1,
        name: 'Priya Sharma',
        class: 'Class 12',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        text: 'The study materials are excellent! Helped me score 95% in my board exams.'
    },
    {
        id: 2,
        name: 'Rahul Kumar',
        class: 'NEET 2025',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        text: 'Video lectures are very clear and the PDFs are comprehensive. Highly recommended!'
    },
    {
        id: 3,
        name: 'Anita Singh',
        class: 'Class 10',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        text: 'Best platform for board exam preparation. The preview feature is very helpful.'
    },
    {
        id: 4,
        name: 'Vikram Patel',
        class: 'Class 11',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        text: 'Affordable and high-quality materials. The one-time purchase is great value.'
    }
];

// Stats for home page
export const STATS = [
    { label: 'Students', value: '10,000+' },
    { label: 'PDFs', value: '500+' },
    { label: 'Video Hours', value: '1000+' },
    { label: 'Success Rate', value: '95%' }
];

// FAQ Data
export const FAQS = [
    {
        question: 'How do I preview PDFs before purchasing?',
        answer: 'Click on any PDF material and you can view the first 5 pages for free. This helps you understand the quality before making a purchase.'
    },
    {
        question: 'Is this a subscription or one-time purchase?',
        answer: 'All our materials are one-time purchases with lifetime access. You pay once for each PDF or video and get permanent access.'
    },
    {
        question: 'How do I download my purchased PDFs?',
        answer: 'After successful payment, go to "My Downloads" section in the menu. All your purchased PDFs will be available there for instant download.'
    },
    {
        question: 'Can I order hard copies of the materials?',
        answer: 'Yes! We offer printed hard copies delivered to your doorstep. Go to the "Hard Copy" section in the menu and fill in your delivery details.'
    },
    {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major payment methods through Razorpay including Credit/Debit cards, UPI, Net Banking, and Wallets.'
    },
    {
        question: 'Will I receive a confirmation after payment?',
        answer: 'Yes, you will receive an email acknowledgement immediately after successful payment with your order details and download links.'
    }
];
