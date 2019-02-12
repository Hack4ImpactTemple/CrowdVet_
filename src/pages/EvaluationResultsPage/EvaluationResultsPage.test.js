import React from 'react';
import ReactDOM from 'react-dom';
import EvaluationPage from './EvaluationPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EvaluationPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
