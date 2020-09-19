import React from 'react';
import { Link } from "react-router-dom";
import { authService } from "fbase";
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #38b48b;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    top: 0;
    left: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #000;
  @media (max-width: 768px) {
    color: #fff;
  }
`;

const LeftNav = (props, isLoggedIn) => {
  const CloseNav = (value) => {
    props.onClick(value);
  }

  const onLogOutClick = (value) => {
    props.onClick(value);
    authService.signOut();
  }

  return (
    <Ul open={props.open}>
      <li>
        <SLink to="/" onClick={() => CloseNav(false)}>Home</SLink>
      </li>
      <li>
        <SLink to="/recentChanges" onClick={() => CloseNav(false)}>Recent Changes</SLink>
      </li>
      <li>
        {props.isLoggedIn
        ? <SLink to="/" onClick={() => onLogOutClick(false)}>Log Out</SLink>
        : <SLink to="/login" onClick={() => CloseNav(false)}>Log In</SLink>
        }
      </li>
    </Ul>
  )
}

export default LeftNav