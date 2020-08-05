import React, { Component } from "react";
import { render } from "react-dom";
import "../style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateQuestion } from "../utils/validateQuestion";
import { toast } from "../utils/toast";
const axios = require("axios");

class AddQuestions extends Component {
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
    toast(arg);
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
      toast.success('Questions added succesfully')
      let questions = this.state.questions;
      questions.push(result);
      this.setState({
        questions
      });
      this.resetAllValues();
      return;
    } else {
      toast.error(isValid.msg)
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
    this.selectAnswer.value = "";
  };

  handleUploadQuestion = () => {
    let param = {
      questions: this.state.questions,
      topic : 'topic'
    };

    axios
      .post(
        "https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/", param
      )
      .then(function(response) {
        // handle succs
        console.log(response.data.success)
        if(response.data.success){
          toast.success('Questions added succesfully')
        }
        else{
          toast.error('Problem while adding your questions. Please try again')
        }
      })
      .catch(function(error) {
        // handle error
        console.log("error", error);
      });
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
        <hr />
        <hr />
        <hr />
        <button onClick={() => this.handleUploadQuestion()}>
          upload question
        </button>
        <ToastContainer />
      </div>
    );
  }
}

export default AddQuestions;
