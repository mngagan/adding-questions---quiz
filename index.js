import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateQuestion } from "./utils/validateQuestion";

let toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};
class App extends Component {
  constructor() {
    this.questionNameRef = false;
    super();
    this.state = {
      name: "React",
      questions: [],
      quizTopic: "quiz topic"
    };
  }

  handleToast = arg => {
    let { type, msg } = arg;
    if (type == "error") {
      toast.error(msg, toastOptions);
    } else if (type == "success") {
      toast.success(msg, toastOptions);
    }
  };

  handleAddQuestion = () => {
    let result = {
      name: this.questionNameRef.value,
      ansList: [
        this.optionA.value,
        this.optionB.value,
        this.optionC.value,
        this.optionD.value
      ],
      anwser: this.selectAnswer.value
    };
    let isValid = validateQuestion(result);
    if (isValid.success) {
      this.handleToast({ type: "success", msg: "Question added succesfully" });
      let questions = this.state.questions;
      questions.push(result);
      this.setState({
        questions
      });
      this.resetAllValues();
      return;
    } else {
      this.handleToast({ type: "error", msg: isValid.msg });
      return;
    }
    console.log(result);
  };
  resetAllValues = () => {
    this.questionNameRef.value = "";
    this.optionA.value = "";
    this.optionB.value = "";
    this.optionC.value = "";
    this.optionD.value = "";
    this.selectAnswer.value = '';
  };

  render() {
    return (
      <div>
        {this.state.quizTopic}
        <br />
        total questions added - {this.state.questions.length}
        <hr />
        question : <textarea ref={ref => (this.questionNameRef = ref)} />
        <hr />a .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionA = ref;
          }}
        />
        <br />b .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionB = ref;
          }}
        />
        <br />c .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionC = ref;
          }}
        />
        <br />d .{" "}
        <input
          type="text"
          ref={ref => {
            this.optionD = ref;
          }}
        />
        <br />
        answer :{" "}
        <select ref={ref => (this.selectAnswer = ref)}>
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
        </select>
        <br />
        <button onClick={() => this.handleAddQuestion()}>add question</button>
        <ToastContainer />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
