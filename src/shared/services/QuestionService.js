import { QuestionValidator } from "../utilities/QuestionValidator";
import { Question } from "../utilities/constructor/Question";
import { QuestionData } from "../../data/QuestionsData";

const parsedData = QuestionData.split("\n").map(data =>
  data.split(/(?<=[0-9a-zA-Z\[\]\"!?])[\|]/)
);

const mappedQuestions = parsedData.map(
  data =>
    new Question(
      data[0],
      data[1],
      data[2],
      data[3],
      JSON.parse(data[4]),
      JSON.parse(data[5]),
      data[6],
      JSON.parse(data[7]),
      JSON.parse(data[8])
    )
);

class QuestionsService {
  getQuestions() {
    if (this.questions) {
      return this.questions;
    }

    this.questions = JSON.parse(JSON.stringify(mappedQuestions));
    return this.questions;
  }

  getInitialQuestion() {
    return JSON.parse(JSON.stringify(mappedQuestions)).slice(0);
  }

  getActiveQuestions(questions) {
    const answeredQuestions = questions.filter(question => {
      return QuestionValidator.hasValidResponse(question).valid;
    });

    return questions.reduce((total, question) => {
      if (
        total.length <= answeredQuestions.length &&
        this.isQuestionEnabled(question)
      ) {
        return total.concat(question);
      }

      return total;
    }, []);
  }

  isQuestionEnabled(question) {
    const { enabled } = question;

    if (enabled === "true") {
      return true;
    }

    if (enabled === "false") {
      return false;
    }

    return enabled.split(" || ").reduce((enabled, expression) => {
      return enabled || this.parseEnabledExpression(expression);
    }, false);
  }

  parseEnabledExpression(expression) {
    const [id, operator, value] = expression.split(" ");
    const _question = this.questions.find(q => q.id === id);

    if (operator === "!=") {
      return _question.value !== value.replace(/['"]+/g, "");
    }

    if (operator === "==") {
      return _question.value === value.replace(/['"]+/g, "");
    }

    return false;
  }
}

export default QuestionsService;
