import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiService } from '../services/api.service';
import { PasswordChangeModal } from '../components/PasswordChangeModal';
import { InfoModal } from '../components/InfoModal';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMasterPassword, setShowMasterPassword] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();
  const { role } = router.query;

  // Determine the title based on role
  const getTitle = () => {
    switch (role) {
      case 'Moderator':
        return 'Moderator Login';
      case 'Teacher':
        return 'Teacher Login';
      case 'Admin':
        return 'Developer Platform Access';
      default:
        return 'Login';
    }
  };

  // Determine if master password should be shown for admin
  const showMasterOption = role === 'Admin';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.login(formData);
      
      // Store the token
      localStorage.setItem('authToken', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Check if user needs to change password
      if (!response.user.passwordChanged) {
        setCurrentUser(response.user);
        setShowPasswordModal(true);
      } else {
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMasterUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.masterUnlock(masterPassword);
      
      if (response.data.valid) {
        // Create a temporary admin token or redirect to setup
        router.push('/setup');
      } else {
        setError('Invalid master password');
      }
    } catch (err: any) {
      setError(err.message || 'Master unlock failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChangeSuccess = () => {
    setShowPasswordModal(false);
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {getTitle()}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {role === 'Admin' ? 'Developer access required' : 'Sign in to your account'}
          </p>
        </div>

        {!showMasterPassword ? (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              {showMasterOption && (
                <button
                  type="button"
                  onClick={() => setShowMasterPassword(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Need admin access?
                </button>
              )}
              <button
                type="button"
                onClick={() => router.push('/login-select')}
                className="text-sm text-gray-600 hover:text-gray-500"
              >
                Back to role selection
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleMasterUnlock}>
            <div>
              <label htmlFor="masterPassword" className="sr-only">
                Master Password
              </label>
              <input
                id="masterPassword"
                name="masterPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Master password"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Unlock'}
              </button>
              <button
                type="button"
                onClick={() => setShowMasterPassword(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Password Change Modal */}
      {currentUser && (
        <PasswordChangeModal
          isOpen={showPasswordModal}
          onClose={() => {}} // Prevent closing for first-time users
          onSuccess={handlePasswordChangeSuccess}
          userId={currentUser.id}
          isFirstTime={true}
        />
      )}

      {/* Information Modal */}
      <InfoModal
        isOpen={showInfoModal}
        onClose={handleInfoModalClose}
        title="Password Changed Successfully"
        message="Your password has been changed successfully. You can change your password anytime from your profile page."
      />
    </div>
  );
}
