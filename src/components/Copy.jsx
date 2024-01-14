import React from "react";
import { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { MdDone } from "react-icons/md";

const Copy = ({ shortUrl }) => {
  const [copy, setCopy] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:5005/${shortUrl}`);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <span className="copy" onClick={copyToClipboard}>
      {copy ? <MdDone /> : <FaCopy />}
    </span>
  );
};

export default Copy;
