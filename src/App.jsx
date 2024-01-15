import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import PuffLoader from "react-spinners/PuffLoader";
import { FaGithub } from "react-icons/fa";

import useLimitText from "./hooks/useLimitText";
import "./scss/index.scss";
import useGetUrls from "./hooks/useGetUrls";

import Copy from "./components/Copy";
import usePostUrl from "./hooks/usePostUrl";

function App() {
  if (!localStorage.getItem("userId")) {
    localStorage.setItem("userId", uuidv4());
  }

  const {
    data: urls,
    isLoading,
    error,
  } = useGetUrls(localStorage.getItem("userId"));

  const ref = useRef(null);

  const addData = usePostUrl();

  const handleSubmit = () => {
    if (ref.current && ref.current.value) {
      addData.mutate({
        user: localStorage.getItem("userId"),
        fullUrl: ref.current.value,
      });
    }

    ref.current.value = "";
  };

  if (error) return <p>{error.message}</p>;

  return (
    <main>
      <h1 className="main-title">Let's Create Short Links</h1>
      <section className="short-url-area">
        <h2 className="paste-here-title">Paste the URL to be shortened</h2>
        <div className="input-area">
          <input ref={ref} type="text" className="url-input" />
          <button onClick={handleSubmit}>Short Now</button>
        </div>
        <p className="info-text">
          short.dinujaya.com is a professionally crafted, free tool for URL
          shortening and generating concise links, streamlining the process of
          effortless content sharing.
        </p>
      </section>

      {urls?.shortUrls.length != 0 && (
        <section className="short-urls-display-area">
          <div className="header">
            <span>Short URL</span>
            <span>Clicks</span>
            <span>Copy now</span>
          </div>

          <div className="body">
            {isLoading && (
              <PuffLoader
                color="#00ad88"
                loading
                size={80}
                cssOverride={{ margin: "auto", marginBlockStart: "2rem" }}
              />
            )}

            {urls?.shortUrls &&
              [...urls?.shortUrls].reverse().map((item, index) => (
                <React.Fragment key={index}>
                  <hr className="seperator" />
                  <div className="one-short-url">
                    <a href={item.full} target="_blank" className="url">
                      {useLimitText(item.full)}
                    </a>
                    <span className="clicks">{item.clicks}</span>
                    <Copy shortUrl={item.short} />
                  </div>
                </React.Fragment>
              ))}
          </div>
        </section>
      )}
      <footer>
        Created by Dinujaya S.{" "}
        <a
          href="https://github.com/Dinujaya-Sandaruwan/short.dinujaya.com"
          target="_blank"
        >
          Give a star on <FaGithub />
        </a>
      </footer>
    </main>
  );
}

export default App;
