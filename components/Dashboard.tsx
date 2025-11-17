import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { format, addDays, subDays } from 'date-fns';
import { DailyPlan, Meal, Exercise, User, Goal } from '../types';
import { TRANSLATIONS } from '../constants';

const MealDetailModal: React.FC<{ meal: Meal; onClose: () => void }> = ({ meal, onClose }) => {
    const { language } = useAppContext();
    const t = TRANSLATIONS[language];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl w-full max-w-sm m-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <img src={meal.image || 'https://picsum.photos/400/300'} alt={meal.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{meal.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{meal.description || 'No description available.'}</p>
                    <div className="flex justify-between items-center text-brand-green dark:text-brand-green-light">
                        <span className="font-semibold">{t.calories}</span>
                        <span className="font-bold text-lg">{meal.calories} kcal</span>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                    <button onClick={onClose} className="w-full bg-brand-green text-brand-green-dark py-2 rounded-lg font-semibold hover:opacity-90 transition">{t.close}</button>
                </div>
            </div>
        </div>
    );
};

const ProfileCard: React.FC = () => {
    const { currentUser, language } = useAppContext();
    const t = TRANSLATIONS[language];
    return (
        <div className="bg-brand-green-dark text-white p-6 rounded-xl shadow-lg mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 text-brand-green">{t.myProfile}</h2>
            <div className="grid grid-cols-3 gap-4 text-center mt-4">
                <div>
                    <p className="text-sm opacity-80">{t.age}</p>
                    <p className="font-bold text-lg">{currentUser?.age || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm opacity-80">{t.weight}</p>
                    <p className="font-bold text-lg">{currentUser?.weight ? `${currentUser.weight} kg` : 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm opacity-80">{t.height}</p>
                    <p className="font-bold text-lg">{currentUser?.height ? `${currentUser.height} cm` : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

const PlanItem: React.FC<{ item: Meal | Exercise; onToggle: () => void, isRtl: boolean; onMealClick: (meal: Meal) => void }> = ({ item, onToggle, isRtl, onMealClick }) => {
    const isExercise = 'duration' in item || 'reps' in item;

    const content = (
        <div className="flex items-center justify-between p-3 bg-white dark:bg-dark-card rounded-lg mb-2 shadow-sm w-full">
            <div className="flex items-center">
                <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-brand-green border-brand-green' : 'border-gray-300 dark:border-gray-600'}`}>
                    {item.completed && <i className="o-check text-brand-green-dark text-sm font-bold"></i>}
                </button>
                <div className={`mx-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <p className="font-semibold text-gray-800 dark:text-dark-text">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isExercise ? (item as Exercise).duration || (item as Exercise).reps : `${(item as Meal).calories} kcal`}
                    </p>
                </div>
            </div>
            {!isExercise && <i className={`o-chevron-left ${isRtl ? '' : 'transform rotate-180'}`}></i>}
        </div>
    );

    if (isExercise) {
        return <div className="w-full">{content}</div>;
    }

    return (
        <button onClick={() => onMealClick(item as Meal)} className="w-full text-left transition-transform transform hover:scale-105">
            {content}
        </button>
    );
};


const DailyPlanView: React.FC = () => {
    const { plan, updateDailyPlan, language } = useAppContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const isRtl = language === 'ar';
    const t = TRANSLATIONS[language];

    const dateKey = format(currentDate, 'yyyy-MM-dd');
    const dailyPlan = plan[dateKey] || { breakfast: [], lunch: [], dinner: [], snacks: [], exercises: [] };

    const handleToggleItem = (category: keyof DailyPlan, index: number) => {
        const newDailyPlan = { ...dailyPlan };
        const items = [...newDailyPlan[category]];
        const item = items[index];
        items[index] = { ...item, completed: !item.completed };
        // @ts-ignore
        newDailyPlan[category] = items;
        updateDailyPlan(dateKey, newDailyPlan);
    };
    
    const sections: { title: string, key: keyof DailyPlan }[] = [
        { title: t.breakfast, key: "breakfast" },
        { title: t.lunch, key: "lunch" },
        { title: t.dinner, key: "dinner" },
        { title: t.snacks, key: "snacks" },
        { title: t.exercises, key: "exercises" },
    ];
    
    return (
         <div className="animate-slide-up">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setCurrentDate(subDays(currentDate, 1))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card"><i className={`o-chevron-left ${isRtl && 'transform rotate-180'}`}></i></button>
                <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text">{format(currentDate, 'EEEE, MMM d')}</h2>
                <button onClick={() => setCurrentDate(addDays(currentDate, 1))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card"><i className={`o-chevron-right ${isRtl && 'transform rotate-180'}`}></i></button>
            </div>
            
            {sections.map(section => (
                (dailyPlan[section.key] && dailyPlan[section.key].length > 0) && (
                    <div key={section.key} className="mb-4">
                        <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-300">{section.title}</h3>
                        {dailyPlan[section.key].map((item, index) => (
                           <PlanItem key={index} item={item} onToggle={() => handleToggleItem(section.key, index)} isRtl={isRtl} onMealClick={setSelectedMeal} />
                        ))}
                    </div>
                )
            ))}
            {selectedMeal && <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />}
        </div>
    );
}

const ProfileSetup: React.FC<{ onComplete: (data: Partial<User>) => void }> = ({ onComplete }) => {
    const { language } = useAppContext();
    const t = TRANSLATIONS[language];
    const [step, setStep] = useState(1);
    const [profileData, setProfileData] = useState({
        age: '',
        weight: '',
        height: '',
        goal: '' as Goal | '',
    });

    const goals: { key: Goal, label: keyof typeof t }[] = [
        { key: Goal.WEIGHT_LOSS, label: 'weightLoss' },
        { key: Goal.WEIGHT_GAIN, label: 'weightGain' },
        { key: Goal.MUSCLE_BUILD, label: 'muscleBuild' },
        { key: Goal.FITNESS, label: 'fitness' },
        { key: Goal.MAINTENANCE, label: 'maintenance' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
         if (step === 1 && !profileData.age) return;
         if (step === 2 && !profileData.weight) return;
         if (step === 3 && !profileData.height) return;
         setStep(s => s + 1)
    };
    
    const handleSubmit = () => {
        if (!profileData.age || !profileData.weight || !profileData.height || !profileData.goal) {
            alert('Please fill all fields');
            return;
        }
        onComplete({
            age: parseInt(profileData.age, 10),
            weight: parseInt(profileData.weight, 10),
            height: parseInt(profileData.height, 10),
            goal: profileData.goal,
        });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl text-center animate-fade-in w-full max-w-sm">
                        <h3 className="text-2xl font-bold mb-4 dark:text-white">{t.whatsYourAge}</h3>
                        <input type="number" name="age" value={profileData.age} onChange={handleInputChange} className="w-full p-3 text-center text-lg rounded-lg border dark:bg-gray-700 dark:border-gray-600" placeholder={t.agePlaceholder} />
                        <button onClick={nextStep} className="w-full bg-brand-green text-brand-green-dark mt-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.next}</button>
                    </div>
                );
            case 2:
                return (
                    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl text-center animate-fade-in w-full max-w-sm">
                        <h3 className="text-2xl font-bold mb-4 dark:text-white">{t.whatsYourWeight}</h3>
                        <input type="number" name="weight" value={profileData.weight} onChange={handleInputChange} className="w-full p-3 text-center text-lg rounded-lg border dark:bg-gray-700 dark:border-gray-600" placeholder={t.weightPlaceholder} />
                        <button onClick={nextStep} className="w-full bg-brand-green text-brand-green-dark mt-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.next}</button>
                    </div>
                );
            case 3:
                return (
                    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl text-center animate-fade-in w-full max-w-sm">
                        <h3 className="text-2xl font-bold mb-4 dark:text-white">{t.whatsYourHeight}</h3>
                        <input type="number" name="height" value={profileData.height} onChange={handleInputChange} className="w-full p-3 text-center text-lg rounded-lg border dark:bg-gray-700 dark:border-gray-600" placeholder={t.heightPlaceholder} />
                        <button onClick={nextStep} className="w-full bg-brand-green text-brand-green-dark mt-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.next}</button>
                    </div>
                );
            case 4:
                return (
                     <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl text-center animate-fade-in w-full max-w-sm">
                        <h3 className="text-2xl font-bold mb-4 dark:text-white">{t.yourGoal}</h3>
                        <div className="space-y-3">
                            {goals.map(goal => (
                                <button
                                    key={goal.key}
                                    onClick={() => setProfileData(prev => ({ ...prev, goal: goal.key }))}
                                    className={`w-full p-3 rounded-lg font-semibold border-2 transition ${profileData.goal === goal.key ? 'bg-brand-green text-brand-green-dark border-brand-green' : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
                                >
                                    {t[goal.label]}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleSubmit} disabled={!profileData.goal} className="w-full bg-brand-green text-brand-green-dark mt-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed">{t.finishSetup}</button>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full pt-10 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{t.setupProfileTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-center">
                {t.setupProfileSubtitle}
            </p>
            {renderStep()}
        </div>
    );
};

const Dashboard: React.FC = () => {
    const { currentUser, updateUserProfile, plan, language } = useAppContext();
    const t = TRANSLATIONS[language];

    const isProfileComplete = !!(currentUser?.age && currentUser?.weight && currentUser?.height && currentUser?.goal);

    if (!isProfileComplete) {
        return <ProfileSetup onComplete={updateUserProfile} />;
    }

    const today = format(new Date(), 'yyyy-MM-dd');
    const hasPlan = !!plan[today];

    if (!hasPlan) {
        return (
            <div className="flex flex-col items-center justify-center text-center pt-20 animate-fade-in">
                <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{t.generatingPlan}</h2>
                <p className="text-gray-600 dark:text-gray-400">{t.generatingPlanDesc}</p>
            </div>
        )
    }

    return (
        <div>
            <ProfileCard />
            <DailyPlanView />
        </div>
    );
};

export default Dashboard;