import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import styled from 'styled-components';

const Change = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RecentChanges = (props) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("pages")
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);
  console.log(nweets);

  return (
    <div>
      <h1>Recent Changes</h1>
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet, index) => (
          <Change key={index}>
            <h4 onClick={() => {window.location = '/#/w/' + nweet.id}}>{nweet.id}</h4>
            <span>{nweet.updatedAt.toDate().toDateString() + ' ' + nweet.updatedAt.toDate().toLocaleTimeString('ko-KR')}</span>
          </Change>
        ))}
      </div>
    </div>
  );
};
export default RecentChanges;