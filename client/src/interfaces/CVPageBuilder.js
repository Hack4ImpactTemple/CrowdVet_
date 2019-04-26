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

/**
 * All pages in /src/pages/ should have a second class at the bottom of their file which "implements"
 * (extends because this is JavaScript) CVPageBuilder. Doing so forces everyone to implement the methods below
 * @class CVPageBuilder
 */
class CVPageBuilder extends Component {

    /**
     * REQUIRED IMPLEMENTATION IN SUBCLASS
     * Callback when page loads. This is your chance to fetch data before constructing your page view 
     * @param {Url} url url object (see https://www.npmjs.com/package/domurl)
     */
    onPageLoad(url) {
        throw new Error("Subclasses of CVPageBuilder must implement the async onPageLoad method")    
    }

    /**  
     * OPTIONAL IMPLEMENTATION IN SUBCLASS
     * Callback when page closes. Do cleanup actions, etc. 
     * You should not rely on this method to save data because not all browsers call it all the time
     */
    onPageClose() {}

    /**  
     * REQURIED IMPLEMENTATION IN SUBCLASS
     * Return a construced instance of your Page content component (Ex: ReviewPage)
     * @returns {JSX} A constructed JSX component 
     */
    pageContent() {
        throw new Error("Subclasses of CVPageBuilder must implement the pageContent method")    
    }

    /**  
     * REQURIED IMPLEMENTATION IN SUBCLASS
     * Return a page lead (see /src/leads/) matching this page's purpose (Ex: ProfileLead)
     * @returns {JSX} A constructed Page lead component 
     */
    pageLead() {
        throw new Error("Subclasses of CVPageBuilder must implement the pageLead method")
    }

}

export default CVPageBuilder;