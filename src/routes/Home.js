import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';

const Home = () => {
  const [doc, setDoc] = useState({});
  const getDoc = async () => {
    // const {
    //     match: {
    //       params: { id }
    //     }
    // } = this.props;
    const title = 'React';
    const document = await dbService.collection('pages').doc(title).get();
    const docData = {title, ...document.data()};
    setDoc(docData);
  };
  useEffect(() => {
    getDoc();
  }, []);
  console.log(doc);
  return (
    <div>
      <h1>{doc.title}</h1>
      <div>
        {doc.content}
      </div>
    </div>
  );
};
export default Home;