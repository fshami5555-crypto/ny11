
import React from 'react';
import { useAppContext } from '../context/AppContext';

const Admin: React.FC = () => {
    const { logout, users, coaches } = useAppContext();

    return (
        <div className="p-6 bg-gray-100 dark:bg-dark-bg min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Logout</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Management */}
                <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">User Management</h2>
                    <div className="max-h-96 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-white dark:bg-dark-card">
                                <tr>
                                    <th className="p-2 border-b dark:border-gray-700">Name</th>
                                    <th className="p-2 border-b dark:border-gray-700">Email</th>
                                    <th className="p-2 border-b dark:border-gray-700">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.filter(u => u.role !== 'admin').map(user => (
                                    <tr key={user.id}>
                                        <td className="p-2 border-b dark:border-gray-700">{user.name}</td>
                                        <td className="p-2 border-b dark:border-gray-700">{user.email}</td>
                                        <td className="p-2 border-b dark:border-gray-700"><span className={`px-2 py-1 text-xs rounded-full ${user.role === 'user' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>{user.role}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Coach Management */}
                <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Coach Management</h2>
                    <div className="max-h-96 overflow-y-auto">
                         <table className="w-full text-left">
                            <thead className="sticky top-0 bg-white dark:bg-dark-card">
                                <tr>
                                    <th className="p-2 border-b dark:border-gray-700">Name</th>
                                    <th className="p-2 border-b dark:border-gray-700">Specialty</th>
                                    <th className="p-2 border-b dark:border-gray-700">Clients</th>
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
        </div>
    );
};

export default Admin;