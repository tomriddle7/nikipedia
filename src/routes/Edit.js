import React, { useState, useEffect } from "react";
import { dbService, authService } from 'fbase';
import Auth from './Auth';
import styled from 'styled-components';

const Title = styled.span`
  display: flex;
  justify-content: space-between;
`;

const Doc = styled.textarea`
  width: 100%;
  height: 50vh;
`;

const Edit = (props) => {
  const [doc, setDoc] = useState({});
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getDoc = async () => {
    const title = props.match.params.id;
    const document = await dbService.collection('pages').doc(title).get();
    let source = '';
    if (document.data()) {
      source =  document.data().content.replace(/\\n/gi, '\n');
    }
    else {
      source = '해당 문서를 찾을 수 없습니다.';
    }
    setDoc({ title, 'content': source });
  };
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoc({ 'title': doc.title, 'content': value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`pages/${doc.title}`).update({
      content: doc.content,
    });
    window.location = `/nikipedia/#/w/${doc.title}`;
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        getDoc();
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
      <>
      {init ? (isLoggedIn ? 
      <div>
        <Title>
          <h1>{doc.title}</h1>
        </Title>
        <div style={{ marginTop: 30 }}>
          <Doc
            defaultValue={doc.content}
            onChange={onChange}
          />
        </div>
        <div>
          <button onClick={onSubmit}>저장</button>
        </div>
      </div>
       : <Auth />) : "로그인 중..."}
      </>
  );
}

export default Edit;
