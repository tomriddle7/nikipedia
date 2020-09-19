import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Title = styled.span`
  display: flex;
  justify-content: space-between;
`;

const CodeBlock = (props) => {
  return (
    <pre style={{background: '#000', color: '#fff', padding: 10}}>
      <code>
        {props.value}
      </code>
    </pre>
  );
}

const Home = (props) => {
  const [doc, setDoc] = useState({});
  const getDoc = async () => {
    const title = props.match.params.id;
    const document = await dbService.collection('pages').doc(title).get();
    let content = '';
    let exist = false;
    if (document.data()) {
      content =  document.data().content.replace(/\\n/gi, '\n');
      exist = true;
    }
    else {
      content = '해당 문서를 찾을 수 없습니다.';
      exist = false;
    }
    setDoc({ title, content, exist });
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
          <Link to={`/history/${doc.title}`}>History</Link>
        </div>
      </Title>
      <div style={{ marginTop: 30 }}>
        <ReactMarkdown
        source={doc.content}
        skipHtml={false}
        escapeHtml={false}
        parserOptions={{
          commonmark: true
        }} 
        renderers={{
          code: CodeBlock
        }}/>
        {!doc.exist && <Link to={`/edit/${doc.title}`}>문서 생성하기</Link>}
      </div>
    </div>
  );
};
export default Home;