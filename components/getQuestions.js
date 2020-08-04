import React, { Component } from "react";
import { render } from "react-dom";
const axios = require("axios");

class GetQuestions extends Component {
  handleMock = () => {
    console.log("in mock service called");
    axios
      .get("https://pqt1i0myrj.execute-api.ap-south-1.amazonaws.com/dev/quiz-1/topics")
      .then(function(response) {
        // handle succs
        console.log('success', response.data);
      })
      .catch(function(error) {
        // handle error
        console.log('error',error);
      })
  };

  render() {
    return (
      <div>
        from get questions
        <hr />
        <button
          
          onClick={() => {
            this.handleMock();
          }}
        >
          mock service
        </button>
      </div>
    );
  }
}

export default GetQuestions;
