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
`;

const Edit = (props, userObj) => {
  const [doc, setDoc] = useState({});
  const getDoc = async () => {
    const title = props.match.params.id;
    const document = await dbService.collection('pages').doc(title).get();
    let content = '';
    if (document.data()) {
      content =  document.data().content.replace(/\\n/gi, '\n');
    }
    else {
      content = '';
    }
    setDoc({ title, content });
  };
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoc({ 'title': doc.title, 'content': value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await dbService.doc(`pages/${doc.title}`).update({
        content: doc.content,
        updatedAt: firebaseInstance.firestore.Timestamp.now(),
        history: firebaseInstance.firestore.FieldValue.arrayUnion({ 'name': 'John', 'timeStamp': firebaseInstance.firestore.Timestamp.now() })
      });
    }
    catch {
      try {
        await dbService.doc(`pages/${doc.title}`).set({
          content: doc.content,
          updatedAt: firebaseInstance.firestore.Timestamp.now(),
          history: [{ 'name': 'John', 'timeStamp': firebaseInstance.firestore.Timestamp.now() }]
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
  // console.log(props.match.path);

  return (
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
  );
}

export default Edit;
