import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Body = styled.div`
  padding: 0px 16px;
  margin-top: 30px;
`;

const Change = styled.span`
  display: flex;
  justify-content: space-between;
`;

const Span = styled.span`
  margin: 0px 5px;
`;

const SLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

const RecentChanges = (props) => {
  const [changes, setChanges] = useState([]);
  useEffect(() => {
    dbService
      .collection("pages")
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const changeArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChanges(changeArray);
      });
  }, []);
  // console.log(changes);

  return (
    <div>
      <h1>Recent Changes</h1>
      <Body>
        {changes.map((cng, index) => (
          <Change key={index}>
            <SLink to={`/w/${cng.id}`}>{cng.id}</SLink>
            <div>
              <Span>{cng.history[cng.history.length - 1].name}</Span>
              <Span>{cng.history[cng.history.length - 1].timeStamp.toDate().toDateString() + ' ' + cng.history[cng.history.length - 1].timeStamp.toDate().toLocaleTimeString('ko-KR')}</Span>
            </div>
          </Change>
        ))}
      </Body>
    </div>
  );
};
export default RecentChanges;