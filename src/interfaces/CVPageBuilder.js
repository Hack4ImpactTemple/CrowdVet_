/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                                Interface: CVPage
 * 
 * 
 *     All pages we create (ReviewPage, EvaluationResultsPage, etc) must implement
 *     all the methods in this interface.
 * 
 *      This is not to be confused with the <Page> component, which actually renders
 *      ReviewPage/EvaluationResultsPage components.
 * 
 *      This interface exists to enforce standard on all pages we build.
 * 
 * State: None
 * Props: None
 *  
 */


import React, { Component } from 'react';
class CVPageBuilder extends Component {

    // Required implementation in subclass
    pageContent() {
        throw new Error("Subclass CVPage and implement the pageContent method. The pageContent method will take the place of your render method")
    }

    // Required implementation in subclass
    onPageLoad() {
        throw new Error("Subclass CVPage and implement the onPageLoad method. This is where you should download data when your page loads.")
    }

}

export default CVPageBuilder;