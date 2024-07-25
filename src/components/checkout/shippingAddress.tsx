// ShippingAddress.tsx
import React, { useState } from 'react';
import { Address } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  selectPrimaryAddress,
  removeAddress,
} from '../../redux/reducers/addressReducer';
import { useDispatch } from 'react-redux';

interface ShippingAddressProps {
  addresses: Address[]; // Define the prop type for the addresses
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ addresses }) => {

  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const reduxAddresses = useSelector((state: RootState) => state.address.addresses);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleSelectPrimary = (id: number) => {
    dispatch(selectPrimaryAddress(id));
  };

  const handleRemoveAddress = (id: number) => {
    dispatch(removeAddress(id));
  };

  return (
    <div>
      <h2>Shipping Address</h2>
      {selectedAddress ? (
        <div>
          <p>Name: {selectedAddress.name}</p>
          <p>Street: {selectedAddress.street}</p>
          <p>City: {selectedAddress.city}</p>
          <p>State: {selectedAddress.state}</p>
          <p>Postal Code: {selectedAddress.postalCode}</p>
          <button onClick={() => setSelectedAddress(null)}>Change Address</button>
        </div>
      ) : (
        <div>
          <h3>Select Shipping Address:</h3>
          <ul>
            {reduxAddresses.map((address) => (
              <li key={address.id}>
                <p>Name: {address.name}</p>
                <p>Street: {address.street}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Postal Code: {address.postalCode}</p>
                <button onClick={() => handleSelectAddress(address)}>Select Address</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
