// AddressBook.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  fetchAddressesStart,
  fetchAddressesSuccess,
  addAddress,
  selectPrimaryAddress,
  removeAddress,
} from '../../redux/reducers/addressReducer';
import { z } from 'zod';
import { Address } from '../../types';

interface AddressBookProps {
  onSelectAddress: (address: Address) => void; // Define the prop type for onSelectAddress
}

const AddressBook: React.FC<AddressBookProps> = ({onSelectAddress}) => {
  
  const dispatch = useDispatch();
  const addresses = useSelector((state: RootState) => state.address.addresses);
  const loading = useSelector((state: RootState) => state.address.loading);
  const error = useSelector((state: RootState) => state.address.error);

  useEffect(() => {
    dispatch(fetchAddressesStart());
    // Simulated delay to mimic API call
    const delay = setTimeout(() => {
      const dummyAddresses = [
        {
          id: 1,
          name: 'John Doe',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          postalCode: '12345',
          isPrimary: true,
        },
        // Add more dummy addresses as needed
      ];
      dispatch(fetchAddressesSuccess(dummyAddresses));
    }, 1000);


    const handleAddressSelection = (selectedAddress: Address) => {
      onSelectAddress(selectedAddress);
    };

    return () => clearTimeout(delay); // Cleanup the timer
  }, [dispatch]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const AddressSchema = z.object({
    name: z.string().min(2).max(50),
    street: z.string().min(2).max(100),
    city: z.string().min(2).max(50).regex(/^[^\d]+$/), // No numbers allowed
    state: z.string().min(2).max(50).regex(/^[^\d]+$/), // Validate against a list of valid states
    postalCode: z.string().min(5).max(10).regex(/^\d+$/), // Only numbers allowed
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    try {
      // Validate form data
      AddressSchema.parse(newAddress);
      // Add new address
      dispatch(addAddress({ ...newAddress, id: addresses.length + 1, isPrimary: false }));
      // Reset form and hide add form
      setNewAddress({ name: '', street: '', city: '', state: '', postalCode: '' });
      setShowAddForm(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract validation errors
        const fieldErrors: Record<string, string> = {}; // Add type assertion here
        error.errors.forEach((err) => {
          const fieldName = err.path.join('.');
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleSelectPrimary = (id: number) => {
    dispatch(selectPrimaryAddress(id));
  };

  const handleRemoveAddress = (id: number) => {
    dispatch(removeAddress(id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Address Book</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            <p>Name: {address.name}</p>
            <p>Street: {address.street}</p>
            <p>City: {address.city}</p>
            <p>State: {address.state}</p>
            <p>Postal Code: {address.postalCode}</p>
            {address.isPrimary ? (
              <p>Primary Address</p>
            ) : (
              <button onClick={() => handleSelectPrimary(address.id)}>Set as Primary</button>
            )}
            <button onClick={() => handleRemoveAddress(address.id)}>Remove Address</button>
          </li>
        ))}
      </ul>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add New Address</button>}
      {showAddForm && (
        <div>
          <h2>Add New Address</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={newAddress.name} onChange={handleChange} />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
              <label>Street:</label>
              <input type="text" name="street" value={newAddress.street} onChange={handleChange} />
              {errors.street && <p>{errors.street}</p>}
            </div>
            <div>
              <label>City:</label>
              <input type="text" name="city" value={newAddress.city} onChange={handleChange} />
              {errors.city && <p>{errors.city}</p>}
            </div>
            <div>
              <label>State:</label>
              <input type="text" name="state" value={newAddress.state} onChange={handleChange} />
              {errors.state && <p>{errors.state}</p>}
            </div>
            <div>
              <label>Postal Code:</label>
              <input type="text" name="postalCode" value={newAddress.postalCode} onChange={handleChange} />
              {errors.postalCode && <p>{errors.postalCode}</p>}
            </div>
            <button onClick={handleAddAddress}>Add Address</button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
