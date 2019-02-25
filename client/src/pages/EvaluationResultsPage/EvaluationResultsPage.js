/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                            Page: Evaluation Results
 * 
 * State:
 *  The following data must be provided to this page to populate the state
 *  - loanApproved: Bool ... was this loan approved?
 *  - 
 * 
 * Page Layout:
 *   Every section of the page has it's own div, regardless of the number of subitems within that grid
 *  #App
 *    #page-title ... Just shows "Evaluation Results" in a span
 *    #approval-status ... Uses a modified button to show whether a loan was approved or not
 *    #button-row ... Allows the user to go back to the Previous Page or Exit
 * 
 */


import React, { Component } from 'react';

import './EvaluationResultsPage.css';

import CVPageBuilder from '../../interfaces/CVPageBuilder.js';
import ClientSideRequests from '../../api/ClientSideRequests.js';

import CVButton from '../../components/CVButton/CVButton.js';
import CVTable from '../../components/CVTable/CVTable.js'
import CVEvaluation from '../../components/CVEvaluation/CVEvaluation.js';


class EvaluationResultsPage extends Component {

  /**
   * This page compares the user's rating of an organization and Kiva's
   * This is the last page where we "debrief" the user after they test rating an org
   * @constructor
   * @class EvaluationPage
   * @param {Object} props JSX props object
   * @param {Bool} loanApproved Whether or not Kiva approved this loan
   * @param {CVEvaluation[]} props.evaluations An array of evalutations (questions)
   */
  constructor(props) {
    super(props);

    this.state = {
      loanApproved: this.props.loanApproved
    }

  }

  render() {

    var approvalStatusMessage = (this.state.loanApproved) ?
      "Kiva approved this loan" :
      "Kiva did not approve this loan" ;
    var approvalStatusColor = (this.state.loanApproved) ?
      "#61A63A" :
      "#F5A623" ;

    return (
      <div className="EvaluationPage">
        <div id="page-title">
          <span class="title">Evaluation Results</span>
        </div>
        <div id="approval-status">
          <CVButton 
            title={approvalStatusMessage.toUpperCase()} 
            backgroundColor={approvalStatusColor} 
            horizontalPadding={120} 
            borderRadius={6}
          />
        </div>
        <div id="score-report" style={{backgroundColor: 'brown'}}>
          <CVTable />
        </div>
        <div id="evaluation-questions">

          {
            function() {
              var jsx = [];
              for(var e = 0; e < this.props.evaluations.length; e++) {
                var evaluation = this.props.evaluations[e];
                jsx.push(
                  <CVEvaluation
                    index={e}
                    prompt={evaluation.prompt}
                    description={evaluation.description}
                    scale={6}
                    votes={evaluation.votes}
                    colors={{
                      header: "#000000",
                      kiva: "#4FAF4E",
                      user: "#118AEC",
                      average: "#247037"
                    }}
                  />
                )
              }
              return jsx;
            }.bind(this)()
          }
        </div>
        <div id="kiva-feedback">
          <span className={"bold"}>{approvalStatusMessage} because</span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed justo quam. Sed tristique pretium suscipit. Integer risus erat, vulputate vel magna sed, pretium sollicitudin sem. Nullam vitae massa eget odio facilisis commodo. <br/><br/>
            Praesent pretium porta dui quis mollis. Morbi interdum tincidunt dolor. Nulla eu ipsum in sapien accumsan egestas ut quis ipsum. Nunc in efficitur odio, ut ultricies sem. 
          </span>
        </div>
        <div id="community-feedback">
          <span className={"bold"}>Most commented topics from the crowd:</span>
          <span>
            #1: Lack of social impact:<br/>
              A: See paragraph above<br/>
            <br/>
            #2: Sales revenue drop between 2016-2017:<br/>
              A: Recent and massive drops in sales revenue between 2016 and 2017 were a result of the acquisition of one of Honest Bison’s larger client. The Honest Bison client was bought by a large multinational and the new owner request THB to supply bison meat at a lower price than sustainable for THB.<br/>
            <br/>
            #3: Whether profitability is sustainable:<br/>
              A: This was a major concern for Kiva. In situations like these, it is possible for borrower to demonstrate demand through Purchase Order Agreements with 3rd parties. THB was able to provide these.<br/>
          </span>
        </div>
        <div id="button-row">
          <CVButton title="Exit"/>
          <CVButton title="Previous Page" secondary />
        </div>
      </div>
    );
  }
}

class EvaluationResultsPageBuilder extends CVPageBuilder {
  
  // @override
  async onPageLoad(url) {
    var request = new window.APIRequest();
    var json = await request.endpoint(ClientSideRequests.loan(url['query']['id']));
  
    if(request.error) {
      return false;
    }

    // Preprocessing: Convert to a Loan object
    var loan = new window.Loan();
    loan.bind(json);

    alert(JSON.stringify(loan));
  }

  pageContent() {
    return <EvaluationResultsPage 
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

  pageLead() {
    return null;
  }
}

export { EvaluationResultsPage , EvaluationResultsPageBuilder };
