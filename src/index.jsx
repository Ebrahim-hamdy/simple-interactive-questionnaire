import React from 'react';
import ReactDOM from 'react-dom';

import QuestionnaireComponent from './components/Questionnaire/Questionnaire.component';

class App extends React.Component {
  render() {
    return <QuestionnaireComponent />;
  }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement)
