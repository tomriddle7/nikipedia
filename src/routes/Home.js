import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
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
    let source = '';
    if (document.data()) {
      source =  document.data().content.replace(/\\n/gi, '\n');
    }
    else {
      source = '해당 문서를 찾을 수 없습니다.';
    }
    setDoc({ title, 'content': source });
  };
  useEffect(() => {
    getDoc();
  }, [props.match.params]);
  console.log(doc);

  return (
    <div>
      <Title>
        <h1>{doc.title}</h1>
        <div>
          <button>Edit</button>
          <button>History</button>
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
      </div>
    </div>
  );
};
export default Home;