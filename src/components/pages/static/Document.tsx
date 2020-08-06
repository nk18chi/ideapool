import React from "react";
import ReactMarkdown from "react-markdown";
import { jsx, css } from "@emotion/core";
/** @jsx jsx */

const StyleDocument = css`
  text-align: initial;

  h1 {
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  h2 {
    margin: 32px 0 12px;
    font-size: 20px;
    font-weight: 600;
  }

  li {
    margin-left: 24px;
    list-style: disc;
    margin: 8px 0 8px 24px;
    line-height: 24px;
  }
`;

const Document: React.FC<{ pathFile: string }> = ({ pathFile }) => {
  const [markdownText, setMarkdownText] = React.useState("");

  React.useEffect(() => {
    fetch(pathFile)
      .then((response) => {
        if (response.ok) return response.text();
        else return Promise.reject("Didn't fetch text correctly");
      })
      .then((text) => {
        setMarkdownText(text);
      })
      .catch((error) => console.error(error));
  });

  return (
    <div className='document' css={StyleDocument}>
      <ReactMarkdown source={markdownText} />
    </div>
  );
};
export default Document;
