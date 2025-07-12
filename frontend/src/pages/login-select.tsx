import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../components/UI/Layout';

export default function LoginSelect() {
  const router = useRouter();

  return (
    <Layout title="Private Class Tracker - Select Role" description="Choose your role to continue" showHeader={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Private Class Tracker
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Select your role to continue
            </p>
          </div>
          
          <div className="space-y-4">
            {/* Moderator Option */}
            <button
              onClick={() => router.push('/login?role=Moderator')}
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="mr-3">👨‍💼</span>
              Moderator
            </button>
            
            {/* Teacher Option */}
            <button
              onClick={() => router.push('/login?role=Teacher')}
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <span className="mr-3">👨‍🏫</span>
              Teacher
            </button>
          </div>
          
          {/* Discreet Evan Link */}
          <div className="text-center pt-4">
            <button
              onClick={() => router.push('/login?role=Admin')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              Evan
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
