// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate('/home'); // Redirect to Home after successful signup
//     } catch (err) {
//       setError('Error creating account. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
//       <form onSubmit={handleSignup}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
//         />
//         <button
//           type="submit"
//           className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
//         >
//           Sign Up
//         </button>
//       </form>
//       {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
//       <p className="text-center mt-4">
//         Already have an account?{' '}
//         <a href="/login" className="text-blue-600 hover:underline">
//           Login
//         </a>
//       </p>
//     </div>
//   );
// };

// export default Signup;



import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState(''); // 👈 name input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔥 Update displayName in Firebase
      await updateProfile(user, {
        displayName: name,
      });

      // 💾 Optional: Store in localStorage
      localStorage.setItem('userName', name);

      navigate('/home'); // Redirect after successful signup
    } catch (err) {
      setError('Error creating account. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
      <p className="text-center mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
