import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../components/UI/Layout';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login-select');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/login-select');
    }
  }, [router]);

  if (!user) {
    return (
      <Layout title="Loading..." description="Loading dashboard..." showHeader={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" description="Private Class Tracker Dashboard">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {user.firstName} {user.lastName}!
            </h1>
            <p className="text-gray-600">
              Role: {user.role} | Email: {user.email}
            </p>
            {user.passwordChanged && (
              <p className="text-green-600 text-sm mt-2">
                ✓ Password has been changed
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Management</h2>
              <p className="text-gray-600 mb-4">Manage student information and enrollment.</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Manage Students
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Class Sessions</h2>
              <p className="text-gray-600 mb-4">Schedule and manage class sessions.</p>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Manage Sessions
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports</h2>
              <p className="text-gray-600 mb-4">View attendance and performance reports.</p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                View Reports
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                router.push('/login-select');
              }}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
