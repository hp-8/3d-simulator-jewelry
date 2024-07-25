import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import '../styles/loginForm.css'
import { Link } from 'react-router-dom';

interface LoginFormProps { } // Add if you need props

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm: React.FC<LoginFormProps> = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      // Add any default values for your form here
    },
    mode: 'onChange', // Better integration with Zod
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // Handle form submission (send data to your backend API)
    console.log('Form data:', data);
  };

  // Optional: Access form field values directly for immediate tasks
  const email = watch('email'); 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <Link to={'/register'}>New User? Register Here</Link>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
