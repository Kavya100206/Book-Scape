import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-4 text-center">Welcome to BookScape</h1>
        {isLogin ? <Login /> : <Signup />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full py-2 mt-4 text-sm text-blue-600 font-semibold hover:underline"
        >
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
