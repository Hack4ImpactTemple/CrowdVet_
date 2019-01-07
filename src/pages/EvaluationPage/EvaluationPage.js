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

import './EvaluationPage.css';

import CVButton from './CVButton.js';
import CVTable from './CVTable.js';
import CVEvaluation from './CVEvaluation.js';


class EvaluationPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loanApproved: false
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

export default EvaluationPage;
