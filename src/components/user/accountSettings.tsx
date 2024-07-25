import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateUser } from '../../redux/reducers/userReducer';
import { z } from 'zod';

const AccountSettings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Define Zod validation schema
  const validationSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    currentPassword: z.string().min(6), // Assuming minimum password length of 6 characters
    newPassword: z.string().min(6), // Assuming minimum password length of 6 characters
  });

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    currentPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data
      validationSchema.parse(formData);
      // Dispatch action to update user info
      await dispatch(updateUser(formData));
      // Reset form data and clear errors
      setFormData({
        username: user.username,
        email: user.email,
        currentPassword: '',
        newPassword: '',
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0];
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Current Password:</label>
          <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
          {errors.currentPassword && <p>{errors.currentPassword}</p>}
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
          {errors.newPassword && <p>{errors.newPassword}</p>}
        </div>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default AccountSettings;
