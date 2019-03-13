import React from "react";

import QuestionnaireAnswers from "../Answers/QuestionnaireAnswers";
import { QuestionValidator } from "../../../shared/utilities/QuestionValidator";

const QuestionnaireQuestions = ({ question, setResponse, edit, reset }) => {

  let validated = QuestionValidator.hasValidResponse(question);

  return (
    <div className="card card-outline-secondary my-5">
      <div className="card-header">
        <h3 className="mb-0 d-inline-block">{question.title}</h3>
        {validated.valid && (
          <div className="float-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => edit(question)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="form-group">
          <QuestionnaireAnswers
            options={question.options}
            type={question.type}
            id={question.id}
            disabled={question.valid}
          />
          {!question.valid &&
            question.validations.map((value, index) => {
              return (
                <p className="invalid-feedback d-block" key={index}>
                  {value.message}
                </p>
              );
            })}
        </div>
      </div>
      <div className="card-footer">
        <div className="text-right">
          <button
            type="button"
            className="btn btn-primary mx-1"
            onClick={() => setResponse(question)}
          >
            Next
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={() => reset(question)}
            disabled={question.valid}
          >
            Reset{question.valid}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireQuestions;
