import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import Search from './Search';

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
  img {
    max-width: 30px;
    max-height: auto;
  }
  @media (max-width: 768px) {
    .logo {
        margin-left: 2rem;
        padding: 15px 10px;
    }
  }
`

const Menu = styled.div`
  display: flex;
`

const Navbar = () => {
  return (
    <Nav>
      <Menu>
        <div className='logo'>
          <img src={require("../../assets/ico-wiki.png")}/>
        </div>
        <Burger />
      </Menu>
      <Search />
    </Nav>
  )
}

export default Navbar