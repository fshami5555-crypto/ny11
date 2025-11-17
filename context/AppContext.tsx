import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, Language, Theme, CartItem, Plan, DailyPlan, QuoteStatus, Message, MessageSender, UserRole, Goal, Coach, CoachOnboardingData, Notification } from '../types';
import { USERS, COACHES, MARKET_ITEMS, GOAL_PLANS, TRANSLATIONS } from '../constants';
import { format } from 'date-fns';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
}

interface AppContextType {
    currentUser: User | null;
    users: User[];
    coaches: Coach[];
    language: Language;
    theme: Theme;
    cart: CartItem[];
    toasts: Toast[];
    plan: Plan;
    notifications: Notification[];
    login: (email: string) => boolean;
    logout: () => void;
    register: (user: Omit<User, 'id' | 'role'>) => void;
    registerCoach: (data: CoachOnboardingData) => void;
    setLanguage: (lang: Language) => void;
    setTheme: (theme: Theme) => void;
    addToCart: (item: CartItem['id']) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    showToast: (message: string, type: 'success' | 'error') => void;
    updatePlan: (newPlan: Plan) => void;
    updateDailyPlan: (date: string, dailyPlan: DailyPlan) => void;
    updateQuoteStatus: (messageId: string, status: QuoteStatus, conversation: Message[], setConversation: React.Dispatch<React.SetStateAction<Message[]>>) => void;
    updateUserProfile: (profileData: Partial<Omit<User, 'id' | 'role' | 'email'>>) => void;
    showNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(USERS);
    const [coaches, setCoaches] = useState<Coach[]>(COACHES);
    const [language, setLanguage] = useState<Language>(Language.EN);
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [plan, setPlan] = useState<Plan>({});
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const login = (email: string) => {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
            setCurrentUser(user);
             // On login, generate plan if profile is complete
            if (user.age && user.weight && user.height && user.goal) {
                const today = format(new Date(), 'yyyy-MM-dd');
                const userPlan = GOAL_PLANS[user.goal] || GOAL_PLANS[Goal.MAINTENANCE];
                setPlan({ [today]: userPlan });
            } else {
                setPlan({}); // Clear plan if profile is incomplete
            }
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const register = (userData: Omit<User, 'id' | 'role'>) => {
        const newUser: User = { ...userData, id: `user${Date.now()}`, role: UserRole.USER };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setPlan({});
    };

    const registerCoach = (data: CoachOnboardingData) => {
        const newId = `coach${Date.now()}`;
        const newUser: User = {
            id: newId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: UserRole.COACH
        };
        const newCoach: Coach = {
            id: newId,
            name: data.name,
            specialty: data.specialty,
            bio: data.bio,
            experienceYears: parseInt(data.experienceYears, 10),
            clientsHelped: parseInt(data.clientsHelped, 10),
            avatar: data.avatar,
        };
        setUsers(prev => [...prev, newUser]);
        setCoaches(prev => [...prev, newCoach]);
        setCurrentUser(newUser);
    };

    const addToCart = (itemId: string) => {
        const itemToAdd = cart.find(i => i.id === itemId);
        if (itemToAdd) {
            setCart(cart.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
             const newItem = MARKET_ITEMS.find((i) => i.id === itemId);
             if(newItem) setCart([...cart, { ...newItem, quantity: 1 }]);
        }
    };
    
    const removeFromCart = (itemId: string) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const clearCart = () => setCart([]);

    const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, ...notification }]);
        setTimeout(() => {
            dismissNotification(id);
        }, 5000);
    }, []);

    const dismissNotification = (id: number) => {
        setNotifications(current => current.filter(notif => notif.id !== id));
    };
    
    const updatePlan = (newPlan: Plan) => {
        setPlan(prevPlan => ({...prevPlan, ...newPlan}));
    };

    const updateDailyPlan = (date: string, dailyPlan: DailyPlan) => {
        setPlan(prevPlan => ({...prevPlan, [date]: dailyPlan}));
    }
    
    const updateUserProfile = (profileData: Partial<Omit<User, 'id' | 'role' | 'email'>>) => {
        setCurrentUser(prevUser => {
            if (!prevUser) return null;
            const updatedUser = { ...prevUser, ...profileData };
            
            // Check if profile is now complete and generate the initial plan
            if (updatedUser.age && updatedUser.weight && updatedUser.height && updatedUser.goal) {
                const today = format(new Date(), 'yyyy-MM-dd');
                const userPlan = GOAL_PLANS[updatedUser.goal] || GOAL_PLANS[Goal.MAINTENANCE];
                // Use a timeout to simulate plan generation
                setTimeout(() => {
                  setPlan({ [today]: userPlan });
                }, 1000);
            }
            
            return updatedUser;
        });
    };

    const updateQuoteStatus = (messageId: string, status: QuoteStatus, conversation: Message[], setConversation: React.Dispatch<React.SetStateAction<Message[]>>) => {
        const updatedConversation = conversation.map(msg => {
            if (msg.id === messageId && msg.quote) {
                return { ...msg, quote: { ...msg.quote, status } };
            }
            return msg;
        });

        const statusMessage: Message = {
            id: `sys-${Date.now()}`,
            sender: MessageSender.SYSTEM,
            text: `You have ${status} the quote.`,
            timestamp: new Date().toISOString()
        };
        
        setConversation([...updatedConversation, statusMessage]);

        if (status === QuoteStatus.ACCEPTED) {
            setTimeout(() => {
                const newPlanData = GOAL_PLANS[Goal.MUSCLE_BUILD]; // Example plan
                const newPlan: Plan = { [format(new Date(), 'yyyy-MM-dd')]: newPlanData };
                
                const planMessage: Message = {
                    id: `plan-${Date.now()}`,
                    sender: MessageSender.COACH,
                    text: 'Great! Here is your personalized plan. It has been added to your dashboard.',
                    plan: newPlan,
                    timestamp: new Date().toISOString()
                };
                setConversation(prev => [...prev, planMessage]);
                updatePlan(newPlan);
                const t = TRANSLATIONS[language];
                showNotification({
                    title: t.planUpdatedTitle,
                    body: t.planUpdatedBody,
                });
            }, 2000);
        }
    };


    return (
        <AppContext.Provider value={{
            currentUser,
            users,
            coaches,
            language,
            theme,
            cart,
            toasts,
            plan,
            notifications,
            login,
            logout,
            register,
            registerCoach,
            setLanguage,
            setTheme,
            addToCart,
            removeFromCart,
            clearCart,
            showToast,
            updatePlan,
            updateDailyPlan,
            updateQuoteStatus,
            updateUserProfile,
            showNotification,
            dismissNotification,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};