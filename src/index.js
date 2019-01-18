import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Page from './Page';

import OrganizationLead from './leads/OrganizationLead/OrganizationLead.js';
import EvaluationResultsPage from './pages/EvaluationResultsPage/EvaluationResultsPage.js';
import ReviewPage from './pages/ReviewPage/ReviewPage.js';


ReactDOM.render(
    <Page 
        lead={
            <OrganizationLead 
                backgroundImage={'https://firebasestorage.googleapis.com/v0/b/djdjga123456.appspot.com/o/19UynfZxByFTAZTBWlWHcf0VQ8kA2JXpBnGvdWnCmjmXUuv2BHb2uiHqlZn4eSv?alt=media&token=19ba582b-40f7-4953-8dc3-c2267657ce72'}
                title={'Dance Peace'}
                subtitle={'Vetting ended: 25 Julianuary 2008'}
            ></OrganizationLead>
        }
        content={
            <EvaluationResultsPage 
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
            />
        }
    ></Page>,
    document.getElementById('root')
);
