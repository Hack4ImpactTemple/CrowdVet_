import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Page from './Page';
import EvaluationPage from './pages/EvaluationPage/EvaluationPage.js';

ReactDOM.render(
    <Page content={
        <EvaluationPage 
            evaluations={[
                {
                    prompt: "1. Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree]",
                    description: "5 : The social impact model of this company makes sense, and is being measured clearly and methodically.",
                    votes: {
                        kiva: 5,
                        user: 5,
                        average: 3.65,
                        distribution: [0,1,6,9,1,0]
                    } 
                },
                {
                    prompt: "2. Overall, the enterprise has a viable business model [strongly disagree - strongly agree]",
                    description: "4 : This company is on the road to profitability - the business model has clear potential, it seems the only barrier is a current lack of working capital.",
                    votes: {
                        kiva: 4,
                        user: 4,
                        average: 3,
                        distribution: [1,2,3,4,5,6]
                    } 
                },
                {
                    prompt: "3. Overall, Kiva should move forward with this application and submit this loan for crowdfunding [strongly disagree - strongly agree]",
                    description: "3 : I’m not sold on this. This isn’t a clear ‘yes’ for Kiva",
                    votes: {
                        kiva: 3,
                        user: 5,
                        average: 1.23,
                        distribution: [1,1000,100,4,5,6]
                    } 
                }
            ]}
        />}>
    </Page>,
    document.getElementById('root')
);
