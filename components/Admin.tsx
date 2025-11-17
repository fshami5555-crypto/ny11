import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CoachOnboardingData, MarketItem, UserRole } from '../types';
import { TRANSLATIONS } from '../constants';

type AdminTab = 'accounts' | 'coaches' | 'store' | 'payments';

const Admin: React.FC = () => {
    const { 
        logout, 
        users, 
        coaches, 
        registerCoach, 
        marketItems, 
        addMarketItem, 
        updateMarketItem,
        deleteMarketItem,
        language, 
        showToast 
    } = useAppContext();
    
    const t = TRANSLATIONS[language];
    const [activeTab, setActiveTab] = useState<AdminTab>('accounts');
    
    const [showAddCoachForm, setShowAddCoachForm] = useState(false);
    const [newCoach, setNewCoach] = useState<CoachOnboardingData>({ name: '', email: '', phone: '', specialty: '', bio: '', experienceYears: '', clientsHelped: '', avatar: '', password: '' });
    
    const [editingItem, setEditingItem] = useState<MarketItem | null>(null);
    const [newItem, setNewItem] = useState<Omit<MarketItem, 'id'>>({ name: '', description: '', price: 0, image: '', category: 'meal' });

    const handleCoachInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewCoach({ ...newCoach, [e.target.name]: e.target.value });
    };

    const handleItemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: name === 'price' ? parseFloat(value) : value });
    };

    const handleAddCoach = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(newCoach).some(val => val === '')) {
            showToast('Please fill all coach fields.', 'error');
            return;
        }
        registerCoach(newCoach);
        setNewCoach({ name: '', email: '', phone: '', specialty: '', bio: '', experienceYears: '', clientsHelped: '', avatar: '', password: '' });
        setShowAddCoachForm(false);
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.name || !newItem.description || newItem.price <= 0 || !newItem.image) {
            showToast('Please fill all item fields correctly.', 'error');
            return;
        }
        addMarketItem(newItem);
        setNewItem({ name: '', description: '', price: 0, image: '', category: 'meal' });
    };
    
    const handleUpdateItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;
        updateMarketItem({ ...newItem, id: editingItem.id });
        setEditingItem(null);
        setNewItem({ name: '', description: '', price: 0, image: '', category: 'meal' });
    };

    const handleEditItemClick = (item: MarketItem) => {
        setEditingItem(item);
        setNewItem(item);
    };
    
    const handleCancelEdit = () => {
        setEditingItem(null);
        setNewItem({ name: '', description: '', price: 0, image: '', category: 'meal' });
    };

    const handleDeleteItem = (itemId: string) => {
        if (window.confirm(t.confirmDelete)) {
            deleteMarketItem(itemId);
        }
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'accounts':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.users}</h3>
                            <div className="max-h-96 overflow-y-auto">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-white dark:bg-dark-card">
                                        <tr>
                                            <th className="p-2 border-b dark:border-gray-700">{t.name}</th>
                                            <th className="p-2 border-b dark:border-gray-700">{t.email}</th>
                                            <th className="p-2 border-b dark:border-gray-700">{t.yourGoal}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.filter(u => u.role === UserRole.USER && u.id !== 'guest').map(user => (
                                            <tr key={user.id}>
                                                <td className="p-2 border-b dark:border-gray-700">{user.name}</td>
                                                <td className="p-2 border-b dark:border-gray-700">{user.email}</td>
                                                <td className="p-2 border-b dark:border-gray-700 capitalize">{user.goal?.replace('_', ' ') || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.coaches}</h3>
                            <div className="max-h-96 overflow-y-auto">
                                 <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-white dark:bg-dark-card">
                                        <tr>
                                            <th className="p-2 border-b dark:border-gray-700">{t.name}</th>
                                            <th className="p-2 border-b dark:border-gray-700">{t.specialty}</th>
                                            <th className="p-2 border-b dark:border-gray-700">{t.clients}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coaches.map(coach => (
                                            <tr key={coach.id}>
                                                <td className="p-2 border-b dark:border-gray-700">{coach.name}</td>
                                                <td className="p-2 border-b dark:border-gray-700">{coach.specialty}</td>
                                                <td className="p-2 border-b dark:border-gray-700">{coach.clientsHelped}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'coaches':
                 return (
                    <div className="animate-fade-in space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.existingCoaches}</h3>
                                <button onClick={() => setShowAddCoachForm(prev => !prev)} className="bg-brand-green text-brand-green-dark py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition">
                                    {showAddCoachForm ? t.close : t.addNewCoach}
                                </button>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-white dark:bg-dark-card">
                                        <tr>
                                            <th className="p-2 border-b dark:border-gray-700">{t.name}</th>
                                            <th className="p-2 border-b dark:border-gray-700">{t.specialty}</th>
                                            <th className="p-2 border-b dark:border-gray-700">{t.clients}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coaches.map(coach => (
                                            <tr key={coach.id}>
                                                <td className="p-2 border-b dark:border-gray-700">{coach.name}</td>
                                                <td className="p-2 border-b dark:border-gray-700">{coach.specialty}</td>
                                                <td className="p-2 border-b dark:border-gray-700">{coach.clientsHelped}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                       
                       {showAddCoachForm && (
                           <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg animate-fade-in">
                               <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.addNewCoach}</h3>
                               <form onSubmit={handleAddCoach} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input type="text" name="name" value={newCoach.name} onChange={handleCoachInputChange} placeholder={t.name} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <input type="email" name="email" value={newCoach.email} onChange={handleCoachInputChange} placeholder={t.email} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <input type="text" name="phone" value={newCoach.phone} onChange={handleCoachInputChange} placeholder={t.phonePlaceholder} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <input type="text" name="specialty" value={newCoach.specialty} onChange={handleCoachInputChange} placeholder={t.specialty} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <input type="number" name="experienceYears" value={newCoach.experienceYears} onChange={handleCoachInputChange} placeholder={t.experience} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <input type="number" name="clientsHelped" value={newCoach.clientsHelped} onChange={handleCoachInputChange} placeholder={t.clients} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <input type="text" name="avatar" value={newCoach.avatar} onChange={handleCoachInputChange} placeholder={t.avatarUrl} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <input type="password" name="password" value={newCoach.password} onChange={handleCoachInputChange} placeholder={t.password} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <textarea name="bio" value={newCoach.bio} onChange={handleCoachInputChange} placeholder={t.bio} className="md:col-span-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                  <button type="submit" className="md:col-span-2 bg-brand-green text-brand-green-dark py-3 rounded-lg font-semibold hover:opacity-90 transition">{t.addCoach}</button>
                               </form>
                           </div>
                       )}
                    </div>
                 );
            case 'store':
                 return (
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        <div className="lg:col-span-2 bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                             <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.storeManagement}</h3>
                             <div className="max-h-[500px] overflow-y-auto space-y-3">
                                {marketItems.map(item => (
                                    <div key={item.id} className="flex items-center p-2 border rounded-lg dark:border-gray-700">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                        <div className="flex-1">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <button onClick={() => handleEditItemClick(item)} className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900">{t.edit}</button>
                                            <button onClick={() => handleDeleteItem(item.id)} className="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300 px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900">{t.delete}</button>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                             <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{editingItem ? t.edit : t.addNewItem}</h3>
                             <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="space-y-4">
                                <input type="text" name="name" value={newItem.name} onChange={handleItemInputChange} placeholder={t.itemName} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                <textarea name="description" value={newItem.description} onChange={handleItemInputChange} placeholder={t.description} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                <input type="number" step="0.01" name="price" value={newItem.price} onChange={handleItemInputChange} placeholder={t.price} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                <input type="text" name="image" value={newItem.image} onChange={handleItemInputChange} placeholder={t.imageUrl} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                <select name="category" value={newItem.category} onChange={handleItemInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                    <option value="meal">{t.meal}</option>
                                    <option value="drink">{t.drink}</option>
                                </select>
                                <div className="flex flex-col space-y-2">
                                    <button type="submit" className="w-full bg-brand-green text-brand-green-dark py-3 rounded-lg font-semibold hover:opacity-90 transition">{editingItem ? t.updateItem : t.addItem}</button>
                                    {editingItem && (
                                        <button type="button" onClick={handleCancelEdit} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">{t.cancel}</button>
                                    )}
                                </div>
                             </form>
                        </div>
                    </div>
                 );
             case 'payments':
                return (
                    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-lg text-center animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.paymentManagement}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t.paymentsInfo}</p>
                    </div>
                );
        }
    };

    const TabButton: React.FC<{ tab: AdminTab, label: string }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === tab ? 'bg-brand-green text-brand-green-dark' : 'bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-gray-700'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="p-6 bg-gray-100 dark:bg-dark-bg min-h-screen text-gray-800 dark:text-white">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h1 className="text-4xl font-bold">{t.adminDashboard}</h1>
                <button onClick={logout} className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
                    {t.logout}
                </button>
            </div>

            <div className="mb-6 flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2">
                <TabButton tab="accounts" label={t.accountManagement} />
                <TabButton tab="coaches" label={t.coachManagement} />
                <TabButton tab="store" label={t.storeManagement} />
                <TabButton tab="payments" label={t.paymentManagement} />
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Admin;