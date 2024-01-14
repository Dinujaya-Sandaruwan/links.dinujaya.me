import React from "react";
import { useState } from "react";
import useLimitText from "./hooks/useLimitText";
import "./scss/index.scss";
import { FaCopy } from "react-icons/fa6";
import { MdDone } from "react-icons/md";

function App() {
  const [copy, setCopy] = useState(false);
  const copyText = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const arr = [];

  for (let index = 0; index < 50; index++) {
    arr.push(index);
  }

  return (
    <main>
      <h1 className="main-title">Let's Create Short Links</h1>
      <section className="short-url-area">
        <h2 className="paste-here-title">Paste the URL to be shortened</h2>
        <div className="input-area">
          <input type="text" className="url-input" />
          <button>Short Now</button>
        </div>
        <p className="info-text">
          short.dinujaya.com is a professionally crafted, free tool for URL
          shortening and generating concise links, streamlining the process of
          effortless content sharing.
        </p>
      </section>
      <section className="short-urls-display-area">
        <div className="header">
          <span>Short URL</span>
          <span>Clicks</span>
          <span>Copy now</span>
        </div>
        <div className="body">
          {arr.map((item, index) => (
            <React.Fragment key={index}>
              <hr className="seperator" />
              <div className="one-short-url" key={index}>
                <a href="#" className="url">
                  {useLimitText("short.dinujaya.com/desgc2u")}
                </a>
                <span className="clicks">23</span>
                <span className="copy" onClick={copyText}>
                  {copy ? <MdDone /> : <FaCopy />}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
