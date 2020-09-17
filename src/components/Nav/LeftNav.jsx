import React from 'react';
import { Link, withRouter } from "react-router-dom";
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

const LeftNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>
        <SLink to="/">Home</SLink>
      </li>
      <li>
        <SLink to="/RecentChanges">Recent Changes</SLink>
      </li>
      <li>
        <SLink to="/">Sign In</SLink>
      </li>
      <li>
        <SLink to="/">Sign Up</SLink>
      </li>
    </Ul>
  )
}

export default LeftNav