import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Change = styled.span`
  display: flex;
  justify-content: space-between;
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
      <div style={{ marginTop: 30 }}>
        {changes.map((cng, index) => (
          <Change key={index}>
            <Link to={`/w/${cng.id}`}>{cng.id}</Link>
            <div>
              <span>{cng.history[cng.history.length - 1].name}</span>
              <span>{cng.history[cng.history.length - 1].timeStamp.toDate().toDateString() + ' ' + cng.history[cng.history.length - 1].timeStamp.toDate().toLocaleTimeString('ko-KR')}</span>
            </div>
          </Change>
        ))}
      </div>
    </div>
  );
};
export default RecentChanges;