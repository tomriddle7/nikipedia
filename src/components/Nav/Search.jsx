import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  border-radius: 16px;
  width: 150px;
  margin-bottom: 50px;
  background-color: #eeeeee;
  margin: 12px 0;
  padding: 9px 10px;
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
    return (
      <>
        <Form>
          <Input
              placeholder="Search"
          />
        </Form>
      </>
    )
  }
  export default Search