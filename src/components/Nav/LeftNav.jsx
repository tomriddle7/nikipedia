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
    position: absolute;
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

const LeftNav = (props) => {
  const CloseNav = (value) => {
    props.onClick(value);
  }

  return (
    <Ul open={props.open}>
      <li>
        <SLink to="/" onClick={() => CloseNav(false)}>Home</SLink>
      </li>
      <li>
        <SLink to="/RecentChanges" onClick={() => CloseNav(false)}>Recent Changes</SLink>
      </li>
      <li>
        <SLink to="/" onClick={() => CloseNav(false)}>Sign In</SLink>
      </li>
      <li>
        <SLink to="/" onClick={() => CloseNav(false)}>Sign Up</SLink>
      </li>
    </Ul>
  )
}

export default LeftNav