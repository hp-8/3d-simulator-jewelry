import React, { useState } from 'react';
import AccountSettings from '../components/user/accountSettings';
import AddressBook from '../components/user/addressBook';
import OrderHistory from '../components/user/orderHistory';
import UserInfo from '../components/user/userInfo';
import { FaTimes, FaUser, FaListAlt, FaHome, FaCog } from 'react-icons/fa';

import '../styles/profilePage.css'; // Import CSS file for styling
import { Address } from '../types';

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'info':
        return <UserInfo />;
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <AddressBook onSelectAddress={function (address: Address): void {
          throw new Error('Function not implemented.');
        } } />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <UserInfo />;
    }
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li className={activeSection === 'info' ? 'active' : ''} onClick={() => setActiveSection('info')}>
            <FaUser /> User Information
          </li>
          <li className={activeSection === 'orders' ? 'active' : ''} onClick={() => setActiveSection('orders')}>
            <FaListAlt /> Order History
          </li>
          <li className={activeSection === 'addresses' ? 'active' : ''} onClick={() => setActiveSection('addresses')}>
            <FaHome /> Address Book
          </li>
          <li className={activeSection === 'settings' ? 'active' : ''} onClick={() => setActiveSection('settings')}>
            <FaCog /> Account Settings
          </li>
        </ul>
      </aside>

      <main className="content">
        <h1>My Profile</h1>
        {renderSection()}
        {activeSection !== 'info' && (
          <button onClick={() => setActiveSection('info')} className="go-back-btn">
            <FaTimes /> Back to Profile
          </button>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
