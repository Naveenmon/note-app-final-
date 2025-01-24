import React from 'react';
import styled from 'styled-components';
import logo from '../src/assets/logo.png';

// Styled components for Navbar, Logo, and Search Input
const NavbarContainer = styled.nav`
  background-color: #fff;
  padding: 10px 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  color: #8A2BE2;
  margin: 0;
`;

const LogoImage = styled.img`
  margin-right: 8px;
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 250px;
  width: 100%;
`;

const SearchInput = styled.input`
  height: 30px;  /* Reduced height */
  line-height: 24px;  /* Adjusted line-height */
  padding: 0 0.8rem;  /* Reduced padding */
  width: 100%;
  padding-left: 2rem;  /* Adjusted padding to fit icon properly */
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  background-color: rgb(219, 199, 238);
  color: #0d0c22;
  box-shadow: 0 0 5px #8A2BE2, 0 0 0 10px rgb(241, 226, 255);
  transition: 0.3s ease;
  font-size: 14px;  /* Reduced font size */
  
  &::placeholder {
    color: #777;
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 0.8rem;  /* Adjusted left position to fit within reduced padding */
  fill: #777;
  width: 1rem;
  height: 1rem;
`;

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <NavbarContainer>
      <Logo>
        <LogoImage src={logo} width={40} height={40} />
        <span>Note App</span> {/* You can replace this with your app name */}
      </Logo>
      <SearchGroup>
        <SearchIcon className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </SearchIcon>
        <SearchInput 
          type="search" 
          placeholder="Search" 
          onChange={(e) => setSearchTerm(e.target.value)} 
          value={searchTerm} 
        />
      </SearchGroup>
    </NavbarContainer>
  );
};

export default Navbar;
