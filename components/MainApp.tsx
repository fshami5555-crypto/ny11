import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Dashboard from './Dashboard';
import ChatPage from './Chat';
import Market from './Market';
import Stats from './Stats';
import Settings from './Settings';
import ActiveChats from './ActiveChats';
import { useAppContext } from '../context/AppContext';
import { TranslationSet } from '../constants';
import { Theme, Language, Notification } from '../types';
import { format } from 'date-fns';

type ActivePage = 'dashboard' | 'chat' | 'activeChats' | 'market' | 'stats' | 'settings';

const Header: React.FC = () => {
    const { language, setLanguage, theme, setTheme } = useAppContext();

    const toggleTheme = () => {
        setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    };

    const toggleLanguage = () => {
        setLanguage(language === Language.EN ? Language.AR : Language.EN);
    };

    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>`;
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>`;


    return (
        <header className="flex-shrink-0 z-10 bg-white dark:bg-dark-card shadow-sm h-16 flex items-center justify-between px-4">
            <div className="flex items-center">
                <h1 className="text-3xl font-black italic tracking-tight text-brand-green-dark dark:text-brand-green">NY11</h1>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-green transition-colors" dangerouslySetInnerHTML={{ __html: theme === 'light' ? moonIcon : sunIcon }} />
                <button onClick={toggleLanguage} className="text-gray-600 dark:text-gray-300 font-semibold text-lg hover:text-brand-green dark:hover:text-brand-green transition-colors">
                    {language === 'en' ? 'AR' : 'EN'}
                </button>
            </div>
        </header>
    );
};

const ICONS: { [key: string]: string } = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
    'chat-bubble-left-right': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.28c-.424.032-.848.122-1.25.295l-3.722.885c-.424.1-.848.24-1.25.445l-3.722.885c-.424.1-.848.24-1.25.445l-2.097.499a2.109 2.109 0 0 1-2.296-2.097v-4.286c0-.97.616-1.813 1.5-2.097l2.097-.499a2.109 2.109 0 0 1 2.296 2.097v.5a2.109 2.109 0 0 0 2.296 2.097h.5a2.109 2.109 0 0 0 2.097-2.097v-.5a2.109 2.109 0 0 1 2.097-2.097h.5a2.109 2.109 0 0 1 2.097 2.097v.5a2.109 2.109 0 0 0 2.296 2.097h.5a2.109 2.109 0 0 0 2.097-2.097zM16.5 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.28c-.424.032-.848.122-1.25.295l-3.722.885c-.424.1-.848.24-1.25.445l-3.722.885c-.424.1-.848.24-1.25.445l-2.097.499a2.109 2.109 0 0 1-2.296-2.097v-4.286c0-.97.616-1.813 1.5-2.097l2.097-.499a2.109 2.109 0 0 1 2.296 2.097v.5a2.109 2.109 0 0 0 2.296 2.097h.5a2.109 2.109 0 0 0 2.097-2.097v-.5a2.109 2.109 0 0 1 2.097-2.097h.5a2.109 2.109 0 0 1 2.097 2.097v.5a2.109 2.109 0 0 0 2.296 2.097h.5a2.109 2.109 0 0 0 2.097-2.097z" /></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-4.663M12 12.375a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z" /></svg>`,
    'shopping-bag': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" /></svg>`,
    'chart-bar': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" /></svg>`,
    'cog-6-tooth': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995a6.427 6.427 0 0 1 0 .255c0 .382.145.755.438.995l1.003.827c.48.398.668 1.05.26 1.431l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 0 1-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.542-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 0 1-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.437-.995a6.428 6.428 0 0 1 0-.255c0-.382-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 0 1-.26-1.431l1.296-2.247a1.125 1.125 0 0 1 1.37.49l1.217.456c.355.133.75.072 1.075.124.073-.044.146-.087.22-.127.332-.183.582.495.645.87l.213-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>`,
};

const NavIcon: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void; 'data-tour-id': string; }> = ({ icon, label, isActive, onClick, 'data-tour-id': dataTourId }) => (
    <button
      onClick={onClick}
      aria-label={label}
      data-tour-id={dataTourId}
      className="flex flex-col items-center justify-center w-full h-full pt-1 transition-colors duration-200 group"
    >
        <div 
            className={`w-7 h-7 mb-1 transition-colors duration-200 ${isActive ? 'text-brand-green' : 'text-gray-500 dark:text-gray-400 group-hover:text-brand-green'}`}
            dangerouslySetInnerHTML={{ __html: ICONS[icon] || '' }}
        />
        <span className={`text-xs font-medium transition-colors duration-200 ${isActive ? 'text-brand-green-dark dark:text-brand-green' : 'text-gray-600 dark:text-gray-400 group-hover:text-brand-green-dark dark:group-hover:text-brand-green'}`}>
            {label}
        </span>
    </button>
);


const BottomNav: React.FC<{ activePage: ActivePage; setActivePage: (page: ActivePage) => void }> = ({ activePage, setActivePage }) => {
    const { language, translations } = useAppContext();
    const t = translations[language];
    const isRtl = language === 'ar';

    const navItems = [
        { id: 'dashboard', icon: 'home', label: t.dashboard, 'data-tour-id': 'nav-dashboard' },
        { id: 'activeChats', icon: 'chat-bubble-left-right', label: t.activeChats, 'data-tour-id': 'nav-active-chats' },
        { id: 'chat', icon: 'users', label: t.experts, 'data-tour-id': 'nav-experts' },
        { id: 'market', icon: 'shopping-bag', label: t.market, 'data-tour-id': 'nav-market' },
        { id: 'stats', icon: 'chart-bar', label: t.stats, 'data-tour-id': 'nav-stats' },
        { id: 'settings', icon: 'cog-6-tooth', label: t.settings, 'data-tour-id': 'nav-settings' },
    ] as const;

    return (
        <div data-tour-id="bottom-nav" className={`fixed bottom-0 left-0 right-0 h-16 bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-gray-700 flex shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.07)] dark:shadow-none ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            {navItems.map(item => (
                <NavIcon
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={activePage === item.id}
                    onClick={() => setActivePage(item.id)}
                    data-tour-id={item['data-tour-id']}
                />
            ))}
        </div>
    );
};

const NotificationCard: React.FC<{ notification: Notification; onDismiss: () => void }> = ({ notification, onDismiss }) => {
    return (
         <div className="bg-white dark:bg-dark-card rounded-xl shadow-2xl p-4 w-full max-w-sm flex items-start animate-fade-in">
            <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-brand-green-dark font-bold text-xl">
                {notification.icon || 'N'}
            </div>
            <div className="ml-4 flex-1">
                <h4 className="font-bold text-gray-800 dark:text-white">{notification.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{notification.body}</p>
            </div>
            <button onClick={onDismiss} className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    );
};

const NotificationContainer: React.FC = () => {
    const { notifications, dismissNotification } = useAppContext();
    return (
        <div className="fixed top-20 right-0 p-4 space-y-3 z-50 w-full max-w-md">
            {notifications.map(notif => (
                <NotificationCard key={notif.id} notification={notif} onDismiss={() => dismissNotification(notif.id)} />
            ))}
        </div>
    );
};

interface TourStep {
  selector?: string;
  title: string;
  content: string;
}

interface GuidedTourProps {
  steps: TourStep[];
  onComplete: () => void;
  t: TranslationSet;
}

const GuidedTour: React.FC<GuidedTourProps> = ({ steps, onComplete, t }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const step = steps[currentStepIndex];

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            onComplete();
        }
    };

    useLayoutEffect(() => {
        if (step?.selector) {
            const element = document.querySelector(step.selector) as HTMLElement;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                const timer = setTimeout(() => setTargetRect(element.getBoundingClientRect()), 300);
                return () => clearTimeout(timer);
            } else {
                handleNext(); // Skip step if element not found
            }
        } else {
            setTargetRect(null); // For non-element steps like the welcome message
        }
    }, [currentStepIndex, step]);

    const isLastStep = currentStepIndex === steps.length - 1;
    const isWelcomeStep = !step.selector;

    const tooltipStyle: React.CSSProperties = {};
    if (targetRect && tooltipRef.current) {
        const tooltipHeight = tooltipRef.current.offsetHeight;
        const PADDING = 16;

        // Center horizontally in the viewport
        tooltipStyle.left = '50%';
        tooltipStyle.transform = 'translateX(-50%)';
        tooltipStyle.maxWidth = `calc(100vw - ${PADDING * 2}px)`;

        // Position vertically: above if not enough space below, otherwise below
        if (targetRect.bottom + tooltipHeight + PADDING > window.innerHeight) {
            tooltipStyle.bottom = `${window.innerHeight - targetRect.top + 8}px`; // 8px margin from element
        } else {
            tooltipStyle.top = `${targetRect.bottom + 8}px`; // 8px margin from element
        }
    }

    return (
        <div className="fixed inset-0 z-[1000]">
            <div 
                className="absolute inset-0 bg-black transition-opacity duration-300"
                style={{ opacity: isWelcomeStep ? 0.8 : 0.7 }}
            ></div>

             {targetRect && (
                <div 
                    className="absolute rounded-lg transition-all duration-300 ease-in-out pointer-events-none"
                    style={{ 
                        left: targetRect.left - 8, 
                        top: targetRect.top - 8, 
                        width: targetRect.width + 16, 
                        height: targetRect.height + 16,
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
                    }}
                ></div>
            )}
            
            <div 
                ref={tooltipRef}
                className={`absolute w-full max-w-sm z-[1001] bg-white dark:bg-dark-card p-4 rounded-lg shadow-2xl animate-fade-in ${isWelcomeStep ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}
                style={isWelcomeStep ? {} : tooltipStyle}
            >
                <h3 className="font-bold text-lg text-brand-green mb-2">{step.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{step.content}</p>
                <div className="flex justify-end gap-3">
                    {!isWelcomeStep && <button onClick={onComplete} className="text-sm font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">{t.tourSkip}</button>}
                    <button 
                        onClick={handleNext} 
                        className="bg-brand-green text-brand-green-dark px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
                    >
                        {isLastStep ? t.tourFinish : t.next}
                    </button>
                </div>
            </div>
        </div>
    );
};

const MainApp: React.FC = () => {
    const [activePage, setActivePage] = useState<ActivePage>('chat');
    const { currentUser, language, plan, translations } = useAppContext();
    const t = translations[language];
    const [isTourActive, setIsTourActive] = useState(false);
    const [tourSteps, setTourSteps] = useState<TourStep[]>([]);

    useEffect(() => {
        const tourCompleted = localStorage.getItem('ny11_tour_completed');
        if (tourCompleted || !currentUser) return;

        const today = format(new Date(), 'yyyy-MM-dd');
        const hasPlan = !!plan[today];
        
        let steps: TourStep[] = [];
        const commonSteps = [
             {
                selector: '[data-tour-id="bottom-nav"]',
                title: t.tourNavTitle,
                content: t.tourNavBody
            },
            {
                selector: '[data-tour-id="nav-experts"]',
                title: t.tourExpertsTitle,
                content: t.tourExpertsBody
            },
            {
                selector: '[data-tour-id="nav-market"]',
                title: t.tourMarketTitle,
                content: t.tourMarketBody
            },
            {
                selector: '[data-tour-id="nav-settings"]',
                title: t.tourSettingsTitle,
                content: t.tourSettingsBody
            },
        ];

        if (currentUser.id === 'guest') {
            steps = [
                {
                    title: t.tourWelcomeTitle,
                    content: t.tourWelcomeBodyGuest,
                },
                {
                    selector: '[data-tour-id="login-prompt"]',
                    title: t.tourLoginPromptTitle,
                    content: t.tourLoginPromptBody,
                },
                ...commonSteps
            ];
        } else if (hasPlan) {
             steps = [
                {
                    title: t.tourWelcomeTitle,
                    content: t.tourWelcomeBody,
                },
                {
                    selector: '#tour-daily-plan',
                    title: t.tourPlanTitle,
                    content: t.tourPlanBody,
                },
                ...commonSteps
            ];
        }

        if (steps.length > 0) {
            const timer = setTimeout(() => {
                setTourSteps(steps);
                setIsTourActive(true);
            }, 500); 
            return () => clearTimeout(timer);
        }
    }, [currentUser, plan, language, t]);

    const handleTourComplete = () => {
        setIsTourActive(false);
        localStorage.setItem('ny11_tour_completed', 'true');
    };

    const scrollContainerRef = useRef<HTMLElement>(null);
    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);
    const scrollTopRef = useRef(0);
    const wasDraggedRef = useRef(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        if (!scrollContainerRef.current) return;
        isDraggingRef.current = true;
        wasDraggedRef.current = false;
        startYRef.current = e.pageY;
        scrollTopRef.current = scrollContainerRef.current.scrollTop;
    };

    const handleMouseLeaveOrUp = () => {
        isDraggingRef.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!isDraggingRef.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const walk = e.pageY - startYRef.current;
        if (Math.abs(walk) > 5) {
            wasDraggedRef.current = true;
        }
        scrollContainerRef.current.scrollTop = scrollTopRef.current - walk;
    };

    const handleClickCapture = (e: React.MouseEvent<HTMLElement>) => {
        if (wasDraggedRef.current) {
            e.stopPropagation();
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard />;
            case 'chat': return <ChatPage />;
            case 'activeChats': return <ActiveChats />;
            case 'market': return <Market />;
            case 'stats': return <Stats />;
            case 'settings': return <Settings />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-dark-bg">
            <style>
                {`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            {isTourActive && tourSteps.length > 0 && <GuidedTour steps={tourSteps} onComplete={handleTourComplete} t={t} />}
            <Header />
            <main
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveOrUp}
                onMouseUp={handleMouseLeaveOrUp}
                onMouseMove={handleMouseMove}
                onClickCapture={handleClickCapture}
                className="flex-1 overflow-y-auto p-4 pb-20 scrollbar-hide cursor-grab active:cursor-grabbing"
            >
                {renderPage()}
            </main>
            <NotificationContainer />
            <BottomNav activePage={activePage} setActivePage={setActivePage} />
        </div>
    );
};

export default MainApp;