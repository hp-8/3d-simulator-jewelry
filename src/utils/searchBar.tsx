import React, { useState, ChangeEvent } from "react";


interface SearchBarProps {
  searchTerm: string; // Prop for current search term
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback for search term changes
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => {
  const [userInput, setUserInput] = useState(searchTerm); // Local state for user input

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    onSearchTermChange(event); // Pass the event to the parent component callback
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default button behavior
    handleInputChange({ target: { value: userInput } } as ChangeEvent<HTMLInputElement>); // Simulate ChangeEvent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={userInput}
        onChange={handleInputChange}
      />
      <button onClick={handleClick}>Search</button> {/* Simulate search button click */}
    </div>
  );
};

export default SearchBar;