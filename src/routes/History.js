import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Title = styled.span`
  display: flex;
  justify-content: space-between;
`;

const Change = styled.span`
  display: flex;
  justify-content: space-between;
`;

const History = (props) => {
  const [doc, setDoc] = useState({});
  const getDoc = async () => {
    const title = props.match.params.id;
    const document = await dbService.collection('pages').doc(title).get();
    let history = [];
    if (document.data()) {
      history =  document.data().history;
    }
    setDoc({ title, history });
  };
  useEffect(() => {
    getDoc();
  }, [props.match.params]);
  // console.log(doc);

  return (
    <div>
      <Title>
        <h1>{doc.title}</h1>
        <div>
          <Link to={`/edit/${doc.title}`}>Edit</Link>
          <Link to={`/w/${doc.title}`}>Doc</Link>
        </div>
      </Title>
      <div style={{ marginTop: 30 }}>
        {doc.history && doc.history.length > 0 && doc.history.slice(0).reverse().map((his, index) => (
          <Change key={index}>
            <span>{his.name}</span>
            <span>{his.timeStamp.toDate().toDateString() + ' ' + his.timeStamp.toDate().toLocaleTimeString('ko-KR')}</span>
          </Change>
        ))}
      </div>
    </div>
  );
};
export default History;