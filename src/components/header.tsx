import React, {useState , useEffect,  useRef} from "react";
import { IoMdSearch, IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import '../styles/header.css';

export interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  navigationLinks: NavLink[];
  onSearchClick?: () => void; 
  isLoggedIn?: boolean; 
}

const Header: React.FC<HeaderProps> = ({ navigationLinks, onSearchClick, isLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown if clicked outside
 const handleClickOutside = (event: MouseEvent) => { 
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  // Add a click event listener to the document
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup - remove the event listener 
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 

  return (
    <header className="header-container">
      <nav className="navigation">
        <ul>
          {navigationLinks.map((link) => (
            <li key={link.label} className={link.label === "Categories" ? "dropdown" : ""} > 
              {link.label === 'Categories' ? (
                <button onClick={toggleDropdown}>{link.label}</button> 
              ) : (
                <Link to={link.href}>{link.label}</Link> 
              )}

              {link.label === "Categories" && isDropdownOpen && ( 
                <div className="dropdown-content" ref={dropdownRef}>
                  <li><Link to="/products">Rings</Link></li>
                  <li><Link to="/products">Bracelets</Link></li>
                  <li><Link to="/products">Chains</Link></li>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="logo">
        <a href="/" className="logo-link">
        Garv Jewels
        </a>
      </div>
      <div className="login-container">
        <button className="search" onClick={onSearchClick}>
          <IoMdSearch className="search-icon" />
        </button>
        {isLoggedIn ? (
          <Link to={"/login"} className="login-button"> <IoMdPerson/></Link>
        ) : (
          <Link to={"/login"} className="login-button"><IoMdPerson/></Link>
        )}
      </div>
    </header>
  );
};

export default Header;