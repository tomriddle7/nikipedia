import React, { useState, useEffect } from "react";
import { firebaseInstance, dbService } from 'fbase';
import styled from 'styled-components';

const Title = styled.span`
  display: flex;
  justify-content: space-between;
`;

const Doc = styled.textarea`
  width: 100%;
  height: 50vh;
  resize: none;
`;

const Edit = (props) => {
  const [doc, setDoc] = useState({});
  const getDoc = async () => {
    const title = props.match.params.id;
    const document = await dbService.collection('pages').doc(title).get();
    let content = '';
    let superauth = true;
    if (document.data()) {
      content =  document.data().content.replace(/\\n/gi, '\n');
      superauth = document.data().superauth;
    }
    else {
      content = '';
      superauth = false;
    }
    setDoc({ title, content, superauth });
  };
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoc({ 'title': doc.title, 'content': value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (doc.superauth) {
      return;
    }
    try {
      await dbService.doc(`pages/${doc.title}`).update({
        content: doc.content,
        updatedAt: firebaseInstance.firestore.Timestamp.now(),
        history: firebaseInstance.firestore.FieldValue.arrayUnion({ 'name': props.userObj.displayName, 'timeStamp': firebaseInstance.firestore.Timestamp.now() })
      });
    }
    catch {
      try {
        await dbService.doc(`pages/${doc.title}`).set({
          content: doc.content,
          updatedAt: firebaseInstance.firestore.Timestamp.now(),
          history: [{ 'name': props.userObj.displayName, 'timeStamp': firebaseInstance.firestore.Timestamp.now() }]
        });
      }
      catch(e) {
        console.log(e);
      }
    }
    window.location = `/nikipedia/#/w/${doc.title}`;
  };

  useEffect(() => {
    getDoc();
  }, [props.match.params]);
  // console.log(doc);

  return (
    <div>
      <Title>
        <h1>{doc.title}</h1>
      </Title>
      <div style={{ marginTop: 30 }}>
        <Doc
          defaultValue={doc.content}
          onChange={onChange}
          disabled={doc.superauth}
        />
        <div>
          {doc.superauth ? <p>수정권한이 부족합니다.</p> : <button onClick={onSubmit}>저장</button>}
        </div>
      </div>
    </div>
  );
}

export default Edit;
