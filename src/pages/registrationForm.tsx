import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { RegistrationData } from '../types';

const registrationSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 characters'),
  birthDate: z.string().min(10, 'Invalid birth date format'),
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: RegistrationData) => {
    // Handle form submission (send data to your backend API)
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" {...register('username')} />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" {...register('address')} />
        {errors.address && <p className="error">{errors.address.message}</p>}
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input type="tel" id="mobileNumber" {...register('mobileNumber')} />
        {errors.mobileNumber && <p className="error">{errors.mobileNumber.message}</p>}
      </div>
      <div>
        <label htmlFor="birthDate">Birth Date:</label>
        <input type="date" id="birthDate" {...register('birthDate')} />
        {errors.birthDate && <p className="error">{errors.birthDate.message}</p>}
      </div>
      <button type="submit">Register</button>
      <p className="link">Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default RegistrationForm;
