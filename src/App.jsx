import "./scss/index.scss";

function App() {
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
          short.dinujaya.com, crafted by Dinujaya, serves as a complimentary
          utility designed for URL abbreviation and the generation of succinct
          links.
        </p>
      </section>
    </main>
  );
}

export default App;
