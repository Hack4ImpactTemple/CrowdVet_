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
    onPageLoad() {
        throw new Error("Subclasses of CVPageBuilder must implement the async onPageLoad method")    
    }

    // Optional implementation in subclass
    onPageClose() {}

    // Required implementation in subclass
    pageContent() {
        throw new Error("Subclasses of CVPageBuilder must implement the pageContent method")    
    }

    // Required implementation in subclass
    pageLead() {
        throw new Error("Subclasses of CVPageBuilder must implement the pageLead method")
    }

}

export default CVPageBuilder;