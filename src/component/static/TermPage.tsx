import React from "react";
import Document from "./Document";
const pathFile = require("../../doc/TermsOfService.md");

const TermPage: React.FC = () => {
  return <Document pathFile={pathFile} />;
};
export default TermPage;
