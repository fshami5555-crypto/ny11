import { User, Coach, MarketItem, UserRole, Language, Goal, DailyPlan } from './types';

export const USERS: User[] = [
  { id: 'admin1', name: 'Admin', email: 'admin@ny11.com', phone: '000000000', role: UserRole.ADMIN, avatar: 'https://i.pravatar.cc/150?u=admin1' },
  { id: 'user1', name: 'John Doe', email: 'john@test.com', phone: '123456789', role: UserRole.USER, age: 30, weight: 80, height: 180, avatar: 'https://i.pravatar.cc/150?u=user1' },
];

export const COACHES: Coach[] = [
    { 
      id: 'coach1', 
      name: 'Sarah Ahmed', 
      specialty: 'Nutrition Specialist', 
      avatar: 'https://picsum.photos/id/1027/200/200',
      bio: 'Sarah is a certified nutritionist with a passion for helping people discover the power of healthy eating. She believes in creating sustainable lifestyle changes, not restrictive diets.',
      experienceYears: 8,
      clientsHelped: 500
    },
    { 
      id: 'coach2', 
      name: 'Mike Thompson', 
      specialty: 'Fitness & Strength', 
      avatar: 'https://picsum.photos/id/1005/200/200',
      bio: 'A former athlete, Mike specializes in strength training and functional fitness. He helps clients build strength, improve mobility, and achieve peak physical performance.',
      experienceYears: 10,
      clientsHelped: 750
    },
    { 
      id: 'coach3', 
      name: 'Fatima Ali', 
      specialty: 'Wellness Coach', 
      avatar: 'https://picsum.photos/id/1011/200/200',
      bio: 'Fatima takes a holistic approach to health, focusing on mind-body connection. She helps clients with stress management, mindful eating, and overall well-being.',
      experienceYears: 6,
      clientsHelped: 400
    },
];

export const MARKET_ITEMS: MarketItem[] = [
    { id: 'm1', name: 'Grilled Chicken Salad', description: 'Fresh greens, grilled chicken, and a light vinaigrette.', price: 12.50, image: 'https://picsum.photos/id/23/400/300', category: 'meal' },
    { id: 'm2', name: 'Quinoa Bowl', description: 'A hearty bowl of quinoa with roasted vegetables.', price: 11.00, image: 'https://picsum.photos/id/25/400/300', category: 'meal' },
    { id: 'm3', name: 'Salmon with Asparagus', description: 'Pan-seared salmon served with fresh asparagus.', price: 15.00, image: 'https://picsum.photos/id/31/400/300', category: 'meal' },
    { id: 'd1', name: 'Green Smoothie', description: 'A refreshing blend of spinach, kale, and fruit.', price: 6.50, image: 'https://picsum.photos/id/40/400/300', category: 'drink' },
    { id: 'd2', name: 'Fresh Orange Juice', description: '100% pure squeezed orange juice.', price: 5.00, image: 'https://picsum.photos/id/42/400/300', category: 'drink' },
];

export const ONBOARDING_BACKGROUNDS = [
    'https://picsum.photos/id/1060/1200/800', // Language
    'https://picsum.photos/id/102/1200/800', // Role / Name
    'https://picsum.photos/id/103/1200/800', // Email
    'https://picsum.photos/id/104/1200/800',  // Phone
    'https://picsum.photos/id/105/1200/800' // Coach Specialty
];

export const GOAL_PLANS: Record<Goal, DailyPlan> = {
  [Goal.WEIGHT_LOSS]: {
    breakfast: [{ name: 'Oatmeal with Berries', calories: 300, completed: false, image: 'https://picsum.photos/id/1080/400/300', description: 'A warm bowl of oatmeal topped with fresh mixed berries.' }],
    lunch: [{ name: 'Grilled Chicken Salad', calories: 400, completed: false, image: 'https://picsum.photos/id/23/400/300', description: 'Lean grilled chicken breast over a bed of fresh greens and vegetables.' }],
    dinner: [{ name: 'Baked Salmon with Asparagus', calories: 450, completed: false, image: 'https://picsum.photos/id/31/400/300', description: 'Nutrient-rich baked salmon served with a side of steamed asparagus.' }],
    snacks: [{ name: 'Greek Yogurt', calories: 150, completed: false, image: 'https://picsum.photos/id/41/400/300', description: 'A cup of plain Greek yogurt.' }],
    exercises: [{ name: '45 min Cardio', duration: '45 min', completed: false }],
  },
  [Goal.WEIGHT_GAIN]: {
    breakfast: [{ name: 'Scrambled Eggs with Avocado Toast', calories: 500, completed: false, image: 'https://picsum.photos/id/1078/400/300', description: 'Three scrambled eggs with two slices of whole-wheat toast topped with avocado.' }],
    lunch: [{ name: 'Beef Burrito Bowl', calories: 700, completed: false, image: 'https://picsum.photos/id/1015/400/300', description: 'A hearty bowl with brown rice, black beans, beef, and cheese.' }],
    dinner: [{ name: 'Pasta with Meat Sauce', calories: 650, completed: false, image: 'https://picsum.photos/id/1074/400/300', description: 'A generous portion of pasta with a rich, homemade meat sauce.' }],
    snacks: [{ name: 'Handful of Almonds & a Banana', calories: 300, completed: false, image: 'https://picsum.photos/id/1016/400/300', description: 'A healthy, calorie-dense snack.' }],
    exercises: [{ name: 'Full Body Strength Training', duration: '60 min', completed: false }],
  },
  [Goal.MUSCLE_BUILD]: {
    breakfast: [{ name: 'Protein Pancakes', calories: 450, completed: false, image: 'https://picsum.photos/id/1025/400/300', description: 'Fluffy pancakes made with protein powder, served with syrup.' }],
    lunch: [{ name: 'Chicken Breast with Quinoa & Broccoli', calories: 600, completed: false, image: 'https://picsum.photos/id/1028/400/300', description: 'A classic muscle-building meal with lean protein and complex carbs.' }],
    dinner: [{ name: 'Steak with Sweet Potato', calories: 700, completed: false, image: 'https://picsum.photos/id/1035/400/300', description: 'A juicy steak served with a baked sweet potato for energy.' }],
    snacks: [{ name: 'Protein Shake', calories: 250, completed: false, image: 'https://picsum.photos/id/106/400/300', description: 'A quick and easy protein shake to fuel muscle recovery.' }],
    exercises: [{ name: 'Heavy Lifting (Push Day)', reps: '3-4 sets of 8-12', completed: false }],
  },
  [Goal.FITNESS]: {
    breakfast: [{ name: 'Smoothie with Spinach and Fruit', calories: 350, completed: false, image: 'https://picsum.photos/id/40/400/300', description: 'A vibrant smoothie packed with vitamins and minerals.' }],
    lunch: [{ name: 'Tuna Wrap', calories: 450, completed: false, image: 'https://picsum.photos/id/43/400/300', description: 'A whole-wheat wrap filled with tuna salad and fresh lettuce.' }],
    dinner: [{ name: 'Turkey Meatballs with Zucchini Noodles', calories: 500, completed: false, image: 'https://picsum.photos/id/48/400/300', description: 'A light yet satisfying dinner to keep you energized.' }],
    snacks: [{ name: 'Apple with Peanut Butter', calories: 200, completed: false, image: 'https://picsum.photos/id/51/400/300', description: 'A balanced snack with fiber and healthy fats.' }],
    exercises: [{ name: 'High-Intensity Interval Training (HIIT)', duration: '20 min', completed: false }],
  },
  [Goal.MAINTENANCE]: {
    breakfast: [{ name: 'Everything Bagel with Cream Cheese', calories: 400, completed: false, image: 'https://picsum.photos/id/55/400/300', description: 'A classic breakfast to start your day.' }],
    lunch: [{ name: 'Leftover Turkey Meatballs', calories: 500, completed: false, image: 'https://picsum.photos/id/48/400/300', description: 'Easy and delicious leftovers from last night.' }],
    dinner: [{ name: 'Homemade Pizza', calories: 600, completed: false, image: 'https://picsum.photos/id/58/400/300', description: 'A balanced homemade pizza with your favorite toppings.' }],
    snacks: [{ name: 'Popcorn', calories: 150, completed: false, image: 'https://picsum.photos/id/60/400/300', description: 'A light snack for when you feel peckish.' }],
    exercises: [{ name: '30 min Jogging', duration: '30 min', completed: false }],
  },
};

export const TRANSLATIONS = {
  [Language.EN]: {
    // General
    appName: 'ny11',
    save: 'Save',
    close: 'Close',
    calories: 'Calories',
    next: 'Next',
    
    // Onboarding
    welcome: 'Welcome to ny11',
    chooseLang: 'Choose your language',
    whatsYourName: "What's your name?",
    namePlaceholder: 'Enter your name',
    whatsYourEmail: "What's your email?",
    emailPlaceholder: 'Enter your email',
    whatsYourPhone: "What's your phone number?",
    phonePlaceholder: 'Enter your phone number',
    login: 'Login',
    register: 'Register',
    loginToYourAccount: 'Login to your account',
    registerAs: 'Join as a...',
    regularUser: 'Regular User',
    healthCoach: 'Health Coach',
    coachOnboardingTitle: "Become a ny11 Coach",
    coachOnboardingSubtitle: "Join our platform and help people achieve their health goals.",
    specialty: 'Specialty',
    specialtyPlaceholder: 'e.g., Nutrition Specialist',
    bio: 'Bio',
    bioPlaceholder: 'Tell us about your experience and philosophy...',
    experienceYears: 'Years of Experience',
    experiencePlaceholder: 'e.g., 5',
    clientsHelped: 'Clients Helped',
    clientsPlaceholder: 'e.g., 100',
    avatarUrl: 'Avatar URL',
    avatarPlaceholder: 'https://example.com/photo.jpg',
    completeRegistration: 'Complete Registration',
    
    // Nav
    dashboard: 'Dashboard',
    experts: 'Experts',
    activeChats: 'Chats',
    market: 'Market',
    stats: 'Statistics',
    settings: 'Settings',
    
    // Dashboard
    myProfile: 'My Profile',
    edit: 'Edit',
    age: 'Age',
    weight: 'Weight',
    height: 'Height',
    todaysPlan: "Today's Plan",
    yourGoal: 'What is your primary goal?',
    weightLoss: 'Weight Loss',
    weightGain: 'Weight Gain',
    muscleBuild: 'Muscle Building',
    fitness: 'General Fitness',
    maintenance: 'Maintain Weight',
    finishSetup: 'Finish Setup',
    mealDetails: 'Meal Details',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks',
    exercises: 'Exercises',
    setupProfileTitle: "Let's set up your profile",
    setupProfileSubtitle: 'Based on this information, we will tailor your daily meals and exercises.',
    whatsYourAge: "What's your age?",
    agePlaceholder: 'e.g., 30',
    whatsYourWeight: "What's your weight? (kg)",
    weightPlaceholder: 'e.g., 80',
    whatsYourHeight: "What's your height? (cm)",
    heightPlaceholder: 'e.g., 180',
    generatingPlan: 'Generating Your Plan...',
    generatingPlanDesc: "We're personalizing your daily schedule based on your goals.",
    
    // Chat
    connectWithExpert: 'Connect with an Expert',
    connectWithExpertDesc: 'Choose a specialist to start your personalized health journey.',
    whyAnExpert: 'Why an Expert?',
    whyAnExpertDesc: 'Our certified experts provide 1-on-1 guidance tailored to your unique body and goals. Get a plan that works, accountability, and the motivation you need to succeed.',
    viewProfile: 'View Profile',
    backToExperts: 'Back to Experts',
    yearsExp: 'Years Exp.',
    // FIX: Removed duplicate `clientsHelped` property.
    startChat: 'Start Chat',
    typeAMessage: 'Type a message...',
    serviceQuote: 'Service Quote',
    accept: 'Accept',
    decline: 'Decline',
    yourActiveChats: 'Your Active Chats',
    selectAChat: 'Select a conversation to continue.',
    
    // Market
    shoppingCart: 'Shopping Cart',
    cartIsEmpty: 'Your cart is empty.',
    total: 'Total:',
    checkout: 'Checkout',
    add: 'Add',

    // Stats
    yourProgress: 'Your Progress',
    overallAdherence: 'Overall Adherence',
    weeklyAdherence: 'Weekly Adherence',
    rechartsPlaceholder: 'Chart will be rendered here with Recharts library.',
    
    // Settings
    profileInfo: 'Profile Information',
    name: 'Name',
    email: 'Email',
    preferences: 'Preferences',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    logout: 'Logout',
    testNotification: 'Test Notification',
    
    // Notifications
    newMessageFrom: 'New message from {name}',
    planUpdatedTitle: 'Plan Updated!',
    planUpdatedBody: 'Your new plan is available on your dashboard.',
    appointmentReminderTitle: 'Upcoming Appointment',
    appointmentReminderBody: 'You have a meeting with your coach in 15 minutes.',
  },
  [Language.AR]: {
    // General
    appName: 'ny11',
    save: 'حفظ',
    close: 'إغلاق',
    calories: 'السعرات الحرارية',
    next: 'التالي',

    // Onboarding
    welcome: 'أهلاً بك في ny11',
    chooseLang: 'اختر لغتك',
    whatsYourName: "ما هو اسمك؟",
    namePlaceholder: 'أدخل اسمك',
    whatsYourEmail: "ما هو بريدك الإلكتروني؟",
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    whatsYourPhone: "ما هو رقم هاتفك؟",
    phonePlaceholder: 'أدخل رقم هاتفك',
    login: 'تسجيل الدخول',
    register: 'تسجيل',
    loginToYourAccount: 'تسجيل الدخول إلى حسابك',
    registerAs: 'الانضمام كـ...',
    regularUser: 'مستخدم عادي',
    healthCoach: 'مدرب صحي',
    coachOnboardingTitle: 'كن مدربًا في ny11',
    coachOnboardingSubtitle: 'انضم إلى منصتنا وساعد الناس على تحقيق أهدافهم الصحية.',
    specialty: 'التخصص',
    specialtyPlaceholder: 'مثال: أخصائي تغذية',
    bio: 'نبذة تعريفية',
    bioPlaceholder: 'أخبرنا عن خبرتك وفلسفتك...',
    experienceYears: 'سنوات الخبرة',
    experiencePlaceholder: 'مثال: 5',
    // FIX: Removed duplicate `clientsHelped` property to prefer the shorter version used in Chat context.
    clientsPlaceholder: 'مثال: 100',
    avatarUrl: 'رابط الصورة الشخصية',
    avatarPlaceholder: 'https://example.com/photo.jpg',
    completeRegistration: 'إكمال التسجيل',

    // Nav
    dashboard: 'الرئيسية',
    experts: 'الخبراء',
    activeChats: 'المحادثات',
    market: 'المتجر',
    stats: 'الإحصائيات',
    settings: 'الإعدادات',

    // Dashboard
    myProfile: 'ملفي الشخصي',
    edit: 'تعديل',
    age: 'العمر',
    weight: 'الوزن',
    height: 'الطول',
    todaysPlan: "خطة اليوم",
    yourGoal: 'ما هو هدفك الأساسي؟',
    weightLoss: 'خسارة الوزن',
    weightGain: 'زيادة الوزن',
    muscleBuild: 'بناء العضلات',
    fitness: 'اللياقة العامة',
    maintenance: 'الحفاظ على الوزن',
    finishSetup: 'إنهاء الإعداد',
    mealDetails: 'تفاصيل الوجبة',
    breakfast: 'الفطور',
    lunch: 'الغداء',
    dinner: 'العشاء',
    snacks: 'وجبات خفيفة',
    exercises: 'التمارين',
    setupProfileTitle: 'لنقم بإعداد ملفك الشخصي',
    setupProfileSubtitle: 'بناءً على هذه المعلومات، سنقوم بتخصيص وجباتك وتمارينك اليومية.',
    whatsYourAge: 'كم عمرك؟',
    agePlaceholder: 'مثال، 30',
    whatsYourWeight: 'ما هو وزنك؟ (كجم)',
    weightPlaceholder: 'مثال، 80',
    whatsYourHeight: 'ما هو طولك؟ (سم)',
    heightPlaceholder: 'مثال، 180',
    generatingPlan: 'جاري إنشاء خطتك...',
    generatingPlanDesc: 'نقوم بتخصيص جدولك اليومي بناءً على أهدافك.',
    
    // Chat
    connectWithExpert: 'تواصل مع خبير',
    connectWithExpertDesc: 'اختر مختصًا لبدء رحلتك الصحية المخصصة.',
    whyAnExpert: 'لماذا خبير؟',
    whyAnExpertDesc: 'يقدم خبراؤنا المعتمدون إرشادات فردية مصممة خصيصًا لجسمك وأهدافك. احصل على خطة فعالة، ومساءلة، والحافز الذي تحتاجه للنجاح.',
    viewProfile: 'عرض الملف الشخصي',
    backToExperts: 'العودة إلى الخبراء',
    yearsExp: 'سنوات خبرة',
    clientsHelped: 'عملاء',
    startChat: 'ابدأ المحادثة',
    typeAMessage: 'اكتب رسالة...',
    serviceQuote: 'عرض سعر الخدمة',
    accept: 'قبول',
    decline: 'رفض',
    yourActiveChats: 'محادثاتك النشطة',
    selectAChat: 'اختر محادثة للمتابعة.',
    
    // Market
    shoppingCart: 'سلة التسوق',
    cartIsEmpty: 'سلة التسوق فارغة.',
    total: 'المجموع:',
    checkout: 'الدفع',
    add: 'إضافة',

    // Stats
    yourProgress: 'تقدمك',
    overallAdherence: 'الالتزام العام',
    weeklyAdherence: 'الالتزام الأسبوعي',
    rechartsPlaceholder: 'سيتم عرض الرسم البياني هنا باستخدام مكتبة Recharts.',

    // Settings
    profileInfo: 'معلومات الملف الشخصي',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    preferences: 'التفضيلات',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    logout: 'تسجيل الخروج',
    testNotification: 'اختبار إشعار',
    
    // Notifications
    newMessageFrom: 'رسالة جديدة من {name}',
    planUpdatedTitle: 'تم تحديث الخطة!',
    planUpdatedBody: 'خطتك الجديدة متاحة في لوحة التحكم.',
    appointmentReminderTitle: 'موعد قادم',
    appointmentReminderBody: 'لديك اجتماع مع مدربك خلال 15 دقيقة.',
  }
}