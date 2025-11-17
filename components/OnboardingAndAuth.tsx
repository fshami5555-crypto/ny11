
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ONBOARDING_BACKGROUNDS, TRANSLATIONS } from '../constants';
import { Language, CoachOnboardingData } from '../types';

type OnboardingStep = 'language' | 'role' | 'register_user' | 'register_coach' | 'login';

const OnboardingAndAuth: React.FC = () => {
    const { setLanguage, register, login, registerCoach, showToast, language } = useAppContext();
    const [step, setStep] = useState<OnboardingStep>('language');
    const [userFormData, setUserFormData] = useState({ name: '', email: '', phone: '' });
    const [coachFormData, setCoachFormData] = useState<CoachOnboardingData>({
        name: '', email: '', phone: '', specialty: '', bio: '', experienceYears: '', clientsHelped: '', avatar: ''
    });
    const [userRegStep, setUserRegStep] = useState(1);
    const [coachRegStep, setCoachRegStep] = useState(1);
    
    const t = TRANSLATIONS[language];

    const handleLanguageSelect = (lang: Language) => {
        setLanguage(lang);
        setStep('role');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, form: 'user' | 'coach') => {
        const { name, value } = e.target;
        if (form === 'user') {
            setUserFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setCoachFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleUserRegister = () => {
        if (!userFormData.name || !userFormData.email || !userFormData.phone) {
             showToast('Please fill all fields', 'error');
            return;
        }
        register({ name: userFormData.name, email: userFormData.email, phone: userFormData.phone });
    };

    const handleCoachRegister = () => {
        const { name, email, phone, specialty, bio, experienceYears, clientsHelped, avatar } = coachFormData;
        if (!name || !email || !phone || !specialty || !bio || !experienceYears || !clientsHelped || !avatar) {
             showToast('Please fill all fields', 'error');
            return;
        }
        registerCoach(coachFormData);
    };

    const handleLogin = () => {
        if (!userFormData.email) {
            showToast('Please enter your email', 'error');
            return;
        }
        const success = login(userFormData.email);
        if(!success) {
            showToast('User not found', 'error');
        }
    }

    const getStepIndex = () => {
        if (step === 'register_coach') return 4;
        switch(userRegStep) {
            case 1: return 1;
            case 2: return 2;
            case 3: return 3;
            default: return 0;
        }
    };
    
    const backgroundStyle = {
        backgroundImage: `url(${ONBOARDING_BACKGROUNDS[getStepIndex()]})`
    };

    const renderUserRegistration = () => (
        <>
            {userRegStep === 1 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4">{t.whatsYourName}</h2>
                    <input type="text" name="name" value={userFormData.name} onChange={(e) => handleInputChange(e, 'user')} placeholder={t.namePlaceholder} className="w-full p-3 rounded-lg border border-gray-300 dark:bg-dark-card dark:border-gray-600" />
                    <button onClick={() => setUserRegStep(2)} className="w-full bg-brand-green text-brand-green-dark mt-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.next}</button>
                </div>
            )}
            {userRegStep === 2 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4">{t.whatsYourEmail}</h2>
                    <input type="email" name="email" value={userFormData.email} onChange={(e) => handleInputChange(e, 'user')} placeholder={t.emailPlaceholder} className="w-full p-3 rounded-lg border border-gray-300 dark:bg-dark-card dark:border-gray-600" />
                    <button onClick={() => setUserRegStep(3)} className="w-full bg-brand-green text-brand-green-dark mt-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.next}</button>
                </div>
            )}
            {userRegStep === 3 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4">{t.whatsYourPhone}</h2>
                    <input type="tel" name="phone" value={userFormData.phone} onChange={(e) => handleInputChange(e, 'user')} placeholder={t.phonePlaceholder} className="w-full p-3 rounded-lg border border-gray-300 dark:bg-dark-card dark:border-gray-600" />
                    <button onClick={handleUserRegister} className="w-full bg-brand-green text-brand-green-dark mt-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.register}</button>
                </div>
            )}
        </>
    );

    const renderCoachRegistration = () => (
        <div className="animate-fade-in w-full">
            <h2 className="text-2xl font-bold mb-1 text-center">{t.coachOnboardingTitle}</h2>
            <p className="text-sm text-gray-500 mb-4 text-center">{t.coachOnboardingSubtitle}</p>
             {coachRegStep === 1 && (
                <div className="animate-fade-in">
                    <input type="text" name="name" placeholder={t.namePlaceholder} value={coachFormData.name} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 mb-3 rounded-lg border dark:bg-dark-card dark:border-gray-600" />
                    <input type="email" name="email" placeholder={t.emailPlaceholder} value={coachFormData.email} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 mb-3 rounded-lg border dark:bg-dark-card dark:border-gray-600" />
                    <input type="tel" name="phone" placeholder={t.phonePlaceholder} value={coachFormData.phone} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 rounded-lg border dark:bg-dark-card dark:border-gray-600" />
                    <button onClick={() => setCoachRegStep(2)} className="w-full bg-brand-green text-brand-green-dark mt-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.next}</button>
                </div>
            )}
            {coachRegStep === 2 && (
                <div className="animate-fade-in">
                    <input type="text" name="specialty" placeholder={t.specialtyPlaceholder} value={coachFormData.specialty} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 mb-3 rounded-lg border dark:bg-dark-card dark:border-gray-600" />
                    <textarea name="bio" placeholder={t.bioPlaceholder} value={coachFormData.bio} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 rounded-lg border dark:bg-dark-card dark:border-gray-600 h-24 resize-none" />
                    <button onClick={() => setCoachRegStep(3)} className="w-full bg-brand-green text-brand-green-dark mt-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.next}</button>
                </div>
            )}
            {coachRegStep === 3 && (
                <div className="animate-fade-in">
                    <input type="number" name="experienceYears" placeholder={t.experiencePlaceholder} value={coachFormData.experienceYears} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 mb-3 rounded-lg border dark:bg-dark-card dark:border-gray-600" />
                    <input type="number" name="clientsHelped" placeholder={t.clientsPlaceholder} value={coachFormData.clientsHelped} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 mb-3 rounded-lg border dark:bg-dark-card dark:border-gray-600" />
                    <input type="text" name="avatar" placeholder={t.avatarPlaceholder} value={coachFormData.avatar} onChange={(e) => handleInputChange(e, 'coach')} className="w-full p-3 rounded-lg border dark:bg-dark-card dark:border-gray-600" />
                    <button onClick={handleCoachRegister} className="w-full bg-brand-green text-brand-green-dark mt-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.completeRegistration}</button>
                </div>
            )}
        </div>
    );


    const renderContent = () => {
        switch (step) {
            case 'language':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">{t.chooseLang}</h2>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => handleLanguageSelect(Language.EN)} className="bg-brand-green text-brand-green-dark px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition">English</button>
                            <button onClick={() => handleLanguageSelect(Language.AR)} className="bg-brand-green text-brand-green-dark px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition">العربية</button>
                        </div>
                    </div>
                );
            case 'role':
                 return (
                    <div className="text-center animate-fade-in">
                        <h2 className="text-3xl font-bold mb-6">{t.registerAs}</h2>
                        <div className="flex flex-col gap-4">
                            <button onClick={() => setStep('register_user')} className="bg-brand-green text-brand-green-dark px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition">{t.regularUser}</button>
                            <button onClick={() => setStep('register_coach')} className="bg-brand-green-light text-brand-green-dark px-8 py-3 rounded-lg font-semibold text-lg hover:bg-brand-green transition">{t.healthCoach}</button>
                            <div className="my-2 text-gray-500">or</div>
                            <button onClick={() => setStep('login')} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">{t.login}</button>
                        </div>
                    </div>
                );
            case 'register_user':
                return renderUserRegistration();
            case 'register_coach':
                return renderCoachRegistration();
            case 'login':
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">{t.loginToYourAccount}</h2>
                        <input type="email" name="email" value={userFormData.email} onChange={(e) => handleInputChange(e, 'user')} placeholder={t.emailPlaceholder} className="w-full p-3 rounded-lg border border-gray-300 dark:bg-dark-card dark:border-gray-600" />
                        <button onClick={handleLogin} className="w-full bg-brand-green text-brand-green-dark mt-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.login}</button>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen w-screen bg-cover bg-center text-white" style={backgroundStyle}>
            <div className="h-full w-full bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center mb-6 text-center">
                    <h1 className="text-6xl font-black italic tracking-tighter text-white">NY11</h1>
                    <p className="tracking-[0.3em] text-xs text-white/80 uppercase mt-1">Healthy Kitchen</p>
                </div>

                <div className="bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text p-8 rounded-2xl shadow-2xl min-w-[350px] max-w-md w-full flex justify-center">
                    {renderContent()}
                </div>
                 {step !== 'language' && step !== 'role' && <button onClick={() => setStep('role')} className="mt-4 text-white hover:underline">Back</button>}
            </div>
        </div>
    );
};

export default OnboardingAndAuth;
