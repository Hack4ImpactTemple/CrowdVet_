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

  componentWillMount() {
    if(window.user == null) {
        this.go("/login")
    }
  }

  render() {

    var approvalStatusMessage = (this.state.loanApproved) ?
      "Kiva approved this loan" :
      "Kiva did not approve this loan" ;
    var approvalStatusColor = (this.state.loanApproved) ?
      "#61A63A" :
      "#F5A623" ;

    if(window.user == null) {
      return null;
    }

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
                    descriptionKey={evaluation.descriptionKey}
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
        <div id="button-row">
          <CVButton title="Go Home" onClick={() => this.go("/")} />
        </div>
      </div>
    );
  }

  go(url) {
    window.location.href = url;
  }

}

class EvaluationResultsPageBuilder extends CVPageBuilder {

  id = null;

  // @override
  async onPageLoad(url) {
    var request = new window.APIRequest();
    var json = await request.endpoint(ClientSideRequests.loan(url['query']['id']));
  
    if(request.error) {
      return false;
    }

    this.id = url['query']['id'];

    // Preprocessing: Convert to a Loan object
    this.loan = new window.Loan();
    this.loan.bind(json);

    // Calculate the distribution of scores
    this.distribution = [
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0]
    ];

    for(var vote of this.loan['voting']['votes']) {
      this.distribution[0][vote['impact'] - 1]++;
      this.distribution[1][vote['business_model'] - 1]++;
      this.distribution[2][vote['prioritization'] - 1]++;
    }

  }

  pageContent() {

    // Have we not voted on this loan yet?
    if(window.user != undefined && window.user.inited && window.user['votes'][this.id] == undefined) {
      this.go('review?id=' + this.id);
      return null;
    }

    return <EvaluationResultsPage 
    loanApproved={this.loan['voting']['kiva_decision'] == "Approved"}
    evaluations={[
        {
            prompt: "1. Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree]",
            descriptionKey: 'impact',
            votes: {
                kiva: this.loan['voting']['kiva_impact'],
                user: (window.user != undefined) ? window.user['votes'][this.id]['impact'] : -1,
                average: this.loan['voting']['impact'],
                distribution: this.distribution[0]
            } 
        },
        {
            prompt: "2. Overall, the enterprise has a viable business model [strongly disagree - strongly agree]",
            descriptionKey: 'business_model',
            votes: {
                kiva: this.loan['voting']['kiva_business'],
                user: (window.user != undefined) ? window.user['votes'][this.id]['business_model'] : -1,
                average: this.loan['voting']['business'],
                distribution: this.distribution[1]
            } 
        },
        {
            prompt: "3. Overall, Kiva should move forward with this application and submit this loan for crowdfunding [strongly disagree - strongly agree]",
            descriptionKey: 'prioritization',
            votes: {
                kiva: this.loan['voting']['kiva_prioritization'],
                user: (window.user != undefined) ? window.user['votes'][this.id]['prioritization'] : -1,
                average: this.loan['voting']['prioritization'],
                distribution: this.distribution[2]
            } 
        }
    ]}
    />
  }

  go(url) {
    window.location.href = url;
  }

  // @ Because we need the user's previous votes, force the page to wait till that loads
  rerenderOnUserLoaded() {
    return true;
  }

  pageLead() {
    return null;
  }
}

export { EvaluationResultsPage , EvaluationResultsPageBuilder };
