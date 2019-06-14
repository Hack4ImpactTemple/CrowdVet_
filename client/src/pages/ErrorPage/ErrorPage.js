/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                                Page: FourOhFour
 * 
 *                        Shows a very basic Error 404 page
 * 
 * State: None
 *  
 * Props: None
 *
 */

import React, { Component } from 'react';
import ErrorLead from '../../leads/ErrorLead/ErrorLead.js';
import CVPageBuilder from '../../interfaces/CVPageBuilder.js'

class ErrorPage extends Component {

    render() {

        return null
        /*<div className="Error Page">
            <center>
                <div style={{height: 12}}></div>
                <span style={{fontSize: 24}}>Please try again</span>
                <CVButton title={"Return Home"} onClick={function() { window.href = "/"}() } />
            </center>
        </div>
    );*/
    }

}

class ErrorPageBuilder extends CVPageBuilder {
    async onPageLoad() { return }
    pageLead() { return <ErrorLead title={"Error 404"} subtitle={"The requested resource was not found"} /> }
    pageContent() { return <ErrorPage /> }
}

export { ErrorPage, ErrorPageBuilder };