import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Title = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BWrapper = styled.div`
`;

const LButton = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  background-color: #38b48b;
  color: #fff;
  text-align: center;
  padding: 2px 6px 2px 6px;
  margin: 0px 4px;
  border-radius: 6px;
`;

const Body = styled.div`
  padding: 0px 16px;
  margin-top: 30px;
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
        <BWrapper>
          <LButton to={`/edit/${doc.title}`}>편집</LButton>
          <LButton to={`/w/${doc.title}`}>역사</LButton>
        </BWrapper>
      </Title>
      <Body>
        {doc.history && doc.history.length > 0 && doc.history.slice(0).reverse().map((his, index) => (
          <Change key={index}>
            <span>{his.name}</span>
            <span>{his.timeStamp.toDate().toDateString() + ' ' + his.timeStamp.toDate().toLocaleTimeString('ko-KR')}</span>
          </Change>
        ))}
      </Body>
    </div>
  );
};
export default History;