import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateUser } from '../../redux/reducers/userReducer';
import { z } from 'zod';

const UserInfo: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  // Define Zod validation schema
  const validationSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    mobileNumber: z.string().min(10).max(15),
    address: z.string().min(5).max(100),
    birthDate: z.date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateUser({ [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    try {
      // Validate form data
      validationSchema.parse(user);
      // Dispatch an action to save updated user data to the backend
      // dispatch(saveUserData(user));
      setIsEditing(false);
    } catch (error) {
      console.error('Validation Error:', error);
      // Handle validation errors
    }
  };

  return (
    <div>
      <h2>User Information</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          {isEditing ? (
            <input type="text" id="username" name="username" value={user.username} onChange={handleInputChange} />
          ) : (
            <span>{user.username}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          {isEditing ? (
            <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          {isEditing ? (
            <input type="tel" id="mobileNumber" name="mobileNumber" value={user.mobileNumber} onChange={handleInputChange} />
          ) : (
            <span>{user.mobileNumber}</span>
          )}
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          {isEditing ? (
            <input type="text" id="address" name="address" value={user.address} onChange={handleInputChange} />
          ) : (
            <span>{user.address}</span>
          )}
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          {isEditing ? (
            <input type="date" id="birthDate" name="birthDate" value={user.birthDate} onChange={handleInputChange} />
          ) : (
            <span>{user.birthDate}</span>
          )}
        </div>
        {isEditing ? (
          <button type="button" onClick={handleSaveClick}>Save</button>
        ) : (
          <button type="button" onClick={handleEditClick}>Edit</button>
        )}
      </form>
    </div>
  );
};

export default UserInfo;
