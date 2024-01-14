import React from "react";

const useLimitText = (text, limit = 24) => {
  return text.slice(0, limit) + "...";
};

export default useLimitText;
