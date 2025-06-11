import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(userName, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error("Error during registration:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>

                {error && (
                    <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                required
                                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                value={userName}
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                required
                                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                value={email}
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                required
                                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                value={password}
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;
