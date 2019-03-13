import React from "react";

const QuestionnaireAnswers = ({ options, type, id, disabled }) => {
  switch (type) {
    case "TEXT":
      return (
        <div>
          <input
            type="text"
            className="form-control"
            id={id}
            name={id}
            disabled={disabled}
          />
        </div>
      );

    case "NUMBER":
      return (
        <div>
          <input
            type="number"
            className="form-control"
            id={id}
            name={id}
            disabled={disabled}
          />
        </div>
      );

    case "DATE":
      return (
        <div>
          <input
            type="date"
            className="form-control"
            id={id}
            name={id}
            disabled={disabled}
          />
        </div>
      );

    case "RADIO":
      return (
        <div className="form-check" id={id}>
          {options.map(({ key, text }) => {
            return (
              <div key={key}>
                <input
                  type="radio"
                  className="form-check-input"
                  id={key}
                  name={id}
                  value={key}
                  disabled={disabled}
                />
                <label className="form-check-label" htmlFor={key}>
                  {text}
                </label>
              </div>
            );
          })}
        </div>
      );

    case "CHECKBOX":
      return (
        <div className="form-check" id={id}>
          {options.map(({ key, text, checked }) => {
            return (
              <div key={key}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={text}
                  id={key}
                  name={id}
                  disabled={disabled}
                />
                <label className="form-check-label" htmlFor={key}>
                  {text}
                </label>
              </div>
            );
          })}
        </div>
      );

    case "SELECT":
      return (
        <div>
          <select className="form-control" id={id} disabled={disabled}>
            {options.map(({ key, text }) => {
              return (
                <option key={key} value={key}>
                  {text}
                </option>
              );
            })}
          </select>
        </div>
      );

    default:
      return <div>Answers cannot be rendered</div>;
  }
};

export default QuestionnaireAnswers;
