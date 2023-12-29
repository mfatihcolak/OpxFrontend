import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:51437/api/Auth/register', formData);
      console.log('Registration successful:', response.data);
      // Burada bir işlem yapılabilir, örneğin başarılı mesaj gösterilebilir.
    } catch (error) {
      console.error('Registration error:', error.response.data);
      // Hata durumunda bir hata mesajı gösterilebilir.
    }
  };

  return (
    <div className='w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
      <h2 className='text-3xl font-bold mb-2 underline underline-offset-8'>Register</h2>
      <p className='mb-2'>Sign Up</p>
      <div className='mb-4'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleInputChange}
          className='bg-gray-200 rounded px-3 py-1 outline-none w-full'
        />
      </div>
      <div className='mb-4'>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          className='bg-gray-200 rounded px-3 py-1 outline-none w-full'
        />
      </div>
      <button onClick={handleRegister} className='border-2 border-white rounded-full px-12 py-1 inline-block font-semibold hover:bg-white hover:text-green-500'>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
