import React, { Component } from "react";
import { render } from "react-dom";
import "../style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateQuestion } from "../utils/validateQuestion";
import { toast } from "../utils/toast";
const axios = require("axios");
import { Button } from "semantic-ui-react";
import { Form, TextArea } from "semantic-ui-react";

class AddQuestions extends Component {
  constructor() {
    this.questionNameRef = false;
    super();
    this.state = {
      name: "React",
      questions: [],
      quizTopic: "quiz topic",
      isUploading: false,
      currentQuestion : {
        name : '',
        options : []
      }
    };
  }

  handleToast = arg => {
    toast(arg);
  };

  handleAddQuestion = () => {
    let result = {
      name: this.state.currentQuestion.name,
      ansList: [
        this.optionA.value,
        this.optionB.value,
        this.optionC.value,
        this.optionD.value
      ],
      anwser: this.selectAnswer.value
    };
    console.log(result)
    
    let isValid = validateQuestion(result);
    if (isValid.success) {
      toast.success("Questions added succesfully");
      let questions = this.state.questions;
      questions.push(result);
      this.setState({
        questions
      });
      this.resetAllValues();
      return;
    } else {
      toast.error(isValid.msg);
      return;
    }
    console.log(result);
  };
  resetAllValues = () => {
    this.questionNameRef.ref.value = "";
    this.optionA.value = "";
    this.optionB.value = "";
    this.optionC.value = "";
    this.optionD.value = "";
    this.selectAnswer.value = "";
  };

  handleUploadQuestion = () => {
    this.setState({
      isUploading: true
    });
    let param = {
      questions: this.state.questions,
      topic: "topic"
    };
    let that = this;

    axios
      .post(
        "https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/",
        param
      )
      .then(function(response) {
        // handle succs
        console.log(response.data.success);
        if (response.data.success) {
          toast.success("Questions added succesfully");
          that.setState({
            isUploading: false
          });
        } else {
          toast.error("Problem while adding your questions. Please try again");
          that.setState({
            isUploading: false
          });
        }
      })
      .catch(function(error) {
        // handle error
        console.log("error", error);
        that.setState({
          isUploading: false
        });
      });
  };

  handleOnChange = arg => {
    let {type, value} =arg
    if(type == 'quesName'){
      this.setState(state => {
        let {currentQuestion} = state
        currentQuestion.name = value
        return currentQuestion
      })
    }
  }

  render() {
    window.state = this.state
    return (
      <div>
        {this.state.quizTopic}
        <br />
        total questions added - {this.state.questions.length}
        <hr />
        
        question : <Form>
          <TextArea placeholder="Write Question" onChange = {e => this.handleOnChange({type : 'quesName', value : e.target.value})}/>
        </Form>
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
        <Button
          primary={!this.state.isUploading}
          secondary={this.state.isUploading}
          onClick={() => this.handleUploadQuestion()}
          loading={this.state.isUploading}
        >
          upload question
        </Button>
        <Button primary>Secondary</Button>
        <ToastContainer />
      </div>
    );
  }
}

export default AddQuestions;
