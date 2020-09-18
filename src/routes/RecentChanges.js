import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Change = styled.span`
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
  // console.log(nweets);

  return (
    <div>
      <h1>Recent Changes</h1>
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet, index) => (
          <Change key={index}>
            <Link to={`/w/${nweet.id}`}>{nweet.id}</Link>
            <div>
              <span>{nweet.history[nweet.history.length - 1].name}</span>
              <span>{nweet.history[nweet.history.length - 1].timeStamp.toDate().toDateString() + ' ' + nweet.history[nweet.history.length - 1].timeStamp.toDate().toLocaleTimeString('ko-KR')}</span>
            </div>
          </Change>
        ))}
      </div>
    </div>
  );
};
export default RecentChanges;