import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Title = styled.div`
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

const BlockQuoteBlock = (props) => {
  return (
    <div style={{border: '1px dashed #aaa', borderRadius: 10, paddingLeft: 10, margin: 5}}>
      {props.children}
    </div>
  );
}

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
        {doc.exist &&
          <BWrapper>
            <LButton to={`/edit/${doc.title}`}>편집</LButton>
            <LButton to={`/history/${doc.title}`}>역사</LButton>
          </BWrapper>
        }
      </Title>
      <Body>
        <ReactMarkdown
        source={doc.content}
        skipHtml={false}
        escapeHtml={false}
        parserOptions={{
          commonmark: true
        }} 
        renderers={{
          code: CodeBlock,
          blockquote: BlockQuoteBlock
        }}/>
        {!doc.exist && <Link to={`/edit/${doc.title}`}>문서 생성하기</Link>}
      </Body>
    </div>
  );
};
export default Home;