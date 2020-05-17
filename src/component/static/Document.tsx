import React from "react";
import "./Document.scss";
import ReactMarkdown from "react-markdown";

const Document: React.FC<any> = ({ pathFile }) => {
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
    <div className='document'>
      <ReactMarkdown source={markdownText} />
    </div>
  );
};
export default Document;
