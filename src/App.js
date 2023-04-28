import { Component, useState } from "react";
import "./App.css";
import { sampleText } from "./sampleText";
import { marked } from "marked";
import { useEffect } from "react";

function App() {
  const original_text = localStorage.getItem("text");

  const [text, setText] = useState(original_text);

  useEffect(() => {
    if (original_text) {
      setText(original_text);
    } else {
      //if text is empty, it resets the original_text to the sample one
      setText(sampleText);
    }
  }, []);

  useEffect(() => {
    //console.log("Je suis mis a jour.");
    localStorage.setItem("text", text);
    console.log(text);
  }, [text]);

  function handleChange(event) {
    const text = event.target.value;
    setText(text); //update du text en fonction de l'event
  }

  function renderText(text) {
    const __html = marked(text, { sanitize: true });
    return { __html };
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <textarea
            onChange={handleChange}
            rows="35"
            className="form-control"
            value={text}
          />
        </div>
        <div className="col-sm-6">
          <div dangerouslySetInnerHTML={renderText(text)}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
