import React, { useState, useEffect } from 'react';

/**
 * Auth Debug Component
 * Shows current authentication status and token information
 * Add this to AdminPanel or any page to debug auth issues
 */
const AuthDebugger = () => {
  const [authInfo, setAuthInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    const adminProfile = localStorage.getItem('adminProfile');

    let parsedUser = null;
    let parsedProfile = null;

    try {
      parsedUser = user ? JSON.parse(user) : null;
    } catch (e) {
      parsedUser = { error: 'Failed to parse user data' };
    }

    try {
      parsedProfile = adminProfile ? JSON.parse(adminProfile) : null;
    } catch (e) {
      parsedProfile = { error: 'Failed to parse profile data' };
    }

    setAuthInfo({
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? `${token.substring(0, 20)}...${token.substring(token.length - 20)}` : 'No token',
      hasUser: !!user,
      user: parsedUser,
      hasProfile: !!adminProfile,
      profile: parsedProfile
    });
  }, []);

  const testApiCall = async () => {
    const token = localStorage.getItem('access_token');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      alert(
        response.ok 
          ? `✅ API Call Successful!\n\nStatus: ${response.status}\nUser: ${data.fullName}\nEmail: ${data.email}` 
          : `❌ API Call Failed!\n\nStatus: ${response.status}\nError: ${data.detail || data.message || 'Unknown error'}`
      );
    } catch (error) {
      alert(`❌ Network Error!\n\n${error.message}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 rounded-lg shadow-xl p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-blue-700">🔍 Auth Debug Info</h3>
        <button
          onClick={() => document.getElementById('authDebugger').remove()}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${authInfo.hasToken ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="font-medium">Token:</span>
          <span className={authInfo.hasToken ? 'text-green-600' : 'text-red-600'}>
            {authInfo.hasToken ? `Present (${authInfo.tokenLength} chars)` : 'Missing'}
          </span>
        </div>

        {authInfo.hasToken && (
          <div className="text-xs text-gray-600 ml-5 font-mono bg-gray-100 p-2 rounded">
            {authInfo.tokenPreview}
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${authInfo.hasUser ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="font-medium">User Data:</span>
          <span className={authInfo.hasUser ? 'text-green-600' : 'text-red-600'}>
            {authInfo.hasUser ? 'Present' : 'Missing'}
          </span>
        </div>

        {authInfo.user && (
          <div className="text-xs ml-5 bg-gray-100 p-2 rounded">
            <div><strong>Email:</strong> {authInfo.user.email}</div>
            <div><strong>Name:</strong> {authInfo.user.fullName}</div>
            <div><strong>Admin:</strong> {authInfo.user.isAdmin ? '✅ Yes' : '❌ No'}</div>
          </div>
        )}

        <div className="pt-2 mt-2 border-t border-gray-200">
          <button
            onClick={testApiCall}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded font-medium text-sm"
          >
            🧪 Test API Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthDebugger;
