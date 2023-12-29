import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const [token, setToken] = useState(null); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:51437/api/Auth/login', formData);
      const receivedToken = response.data.token; 

      setToken(receivedToken); 

    } catch (error) {
      setError('Invalid credentials'); 
    }
  };

  const handleAuthorizedRequest = () => {
    if (token) {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      axios.get('http://localhost:51437/api/Auth', { headers })
        .then(response => {
        })
        .catch(error => {
        });
    } else {
    }
  };

  useEffect(() => {
    handleAuthorizedRequest(); 
  }, [token]);

  return (
    <div className='w-3/5 p-5'>
      <h2 className='text-2xl font-bold text-green-500 underline underline-offset-8'>Sign in to your account</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex flex-col items-center'>
        <div className='bg-gray-200 w-64 p-2 flex items-center mb-3 ' >
          <input
            type="email"
            name="username"
            placeholder='Email'
            value={formData.username}
            onChange={handleInputChange}
            className='bg-gray-200 outline-none flex-1'
          />
        </div>
        <div className='bg-gray-200 w-64 p-2 flex items-center mb-3' >
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            className='bg-gray-200 outline-none flex-1'
          />
        </div>
        <button onClick={handleSignIn} className='border-2 border-green-500 text-green-500 rounded-full px-12 py-1 inline-block font-semibold hover:bg-green-500 hover:text-white'>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
