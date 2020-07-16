import React from "react";
import Document from "./Document";
const pathFile = require("../../../doc/PrivacyPolicy.md");

const PrivacyPage: React.FC = () => {
  return <Document pathFile={pathFile} />;
};
export default PrivacyPage;
