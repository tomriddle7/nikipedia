import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  border-radius: 16px;
  width: 150px;
  margin-bottom: 50px;
  background-color: #eeeeee;
  margin: 12px 0;
  padding: 8px 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  color: #808084;
`;

const Search = () => {
  const [searchTerm, setsearchTerm] = useState('');

  const UpdateTerm = event => {
    setsearchTerm(event.target.value);
  }

  const HandleSubmit = event => {
    event.preventDefault();
    window.location = `/nikipedia/#/w/${searchTerm}`
    setsearchTerm('');
  }

  return (
    <>
      <Form onSubmit={HandleSubmit}>
        <Input
            placeholder='Search'
            value={searchTerm}
            onChange={UpdateTerm}
        />
      </Form>
    </>
  )
}
export default Search