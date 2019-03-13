import React, { Component } from "react";

import QuestionnaireQuestions from "./Questions/QuestionnaireQuestions";
import QuestionsService from "../../shared/services/QuestionService";

import "../../../public/assets/sass/global.scss";

class QuestionnaireComponent extends Component {
  constructor() {
    super();
    this.questionsService = new QuestionsService();
  }

  state = {
    questions: []
  };

  initialState = () => {
    return this.questionsService.getInitialQuestion().slice(0);
  };

  componentDidMount = () => {
    this.questions = this.questionsService.getQuestions();
    this.displayActiveQuestions();
  };

  displayActiveQuestions = () => {
    const activeQuestions = this.questionsService.getActiveQuestions(
      this.questions
    );
    this.setState({ questions: activeQuestions });
  };

  editQuestion = question => {
    question.valid = false;
    this.setState({ questions: this.state.questions });
  };

  setResponse = question => {
    const element = document.getElementById(question.id);
    const response = this.getResponseValue(question);

    question.value = response;

    if (question.value) {
      question.valid = true;
      this.displayActiveQuestions();
    }
  };

  getResponseValue = question => {
    if (question.type.toLowerCase() === "radio") {
      const radios = document.getElementsByName(question.id);
      const selectRadio = Array.from(radios).find(radio => radio.checked);

      return selectRadio.value;

    } else if (question.type.toLowerCase() === "checkbox") {
      var checkedValues = [];
      var checkboxs = document.getElementsByName(question.id);
      checkboxs.forEach(item => {
        if (item.checked) checkedValues.push(item.value);
      });

      return checkedValues;
    }

    return document.getElementById(question.id).value;
  };

  resetQuestion = question => {
    const element = document.getElementById(question.id);
    const field_type = question.type.toLowerCase();

    question.valid = false;

    switch (field_type) {
      case "text":
      case "date":
      case "number":
        element.value = "";
        break;

      case "radio":
      case "checkbox":
        const elements = document.getElementsByName(question.id);
        elements.forEach(item => (item.checked = false));
        break;

      case "select":
        element.selectedIndex = -1;
        break;

      default:
        break;
    }
  };

  clearQuestions = () => {
    this.questions = this.initialState();
    this.displayActiveQuestions();
    this.resetQuestion(this.state.questions[0]);
  };

  submitQuestions = () => {
    const lastQuestion = this.questions[this.questions.length - 1];
    const beforeLastQuestion = this.questions[this.questions.length - 2];

    if (
        (!this.questionsService.isQuestionEnabled(lastQuestion) &&
        beforeLastQuestion.valid) ||
        lastQuestion.valid
    ) {
      this.clearQuestions();
    }
  };

  render() {
    return (
      <div className="container-fluid mt-5">
        <h1 className="text-center">Questionnaire</h1>
        <main>
          <form>
            <div>
              {this.state.questions.map(question => {
                return (
                  <div key={question.id}>
                    <QuestionnaireQuestions
                      question={question}
                      setResponse={this.setResponse}
                      edit={this.editQuestion}
                      reset={this.resetQuestion}
                    />
                  </div>
                );
              })}
            </div>
            <div className="card card-outline-secondary my-5">
              <div className="card-footer clearfix">
                <div className="float-right">
                  <button
                    type="button"
                    className="btn btn-success mx-1"
                    onClick={this.submitQuestions}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mx-1"
                    onClick={this.clearQuestions}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default QuestionnaireComponent;
