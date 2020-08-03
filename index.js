import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

class App extends Component {
  constructor() {
    this.questionNameRef = false;
    super();
    this.state = {
      name: "React",
      questions: []
    };
  }

  handleChange;

  render() {
    return (
      <div>
        question : <textarea ref={ref => (this.questionNameRef = ref)} />
        <hr />
        a .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionA = ref;
          }}
        />
        <br />
        b .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionB = ref;
          }}
        />
        <br />
        c .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionC = ref;
          }}
        />
        <br />
        d .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionD = ref;
          }}
        />
        <br />
        answer :{" "}
        <select >
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
        </select>

        <br/>
        <button >add question</button>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
