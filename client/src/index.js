import React from 'react';
import ReactDOM from 'react-dom';

import  Url  from 'domurl';
import Page from './Page';
import './index.css';

import { ReviewPageBuilder } from './pages/ReviewPage/ReviewPage.js';
import { ErrorPageBuilder } from './pages/ErrorPage/ErrorPage.js';

async function main() {
    var builder = getBuilder();
    await builder.onPageLoad();
    
    ReactDOM.render(
        <Page lead={ builder.pageLead() } content={ builder.pageContent() }/>,
        document.getElementById("root")
    )
    
    window.onbeforeunload = function() {
        builder.onPageClose();
    };
}

// Returns a CVPageBuilder object, based on the current URL of the page
function getBuilder() {
    var url = new Url();
    var path = url.path.replace("/","");
    var components = path.split("/");

    switch (components[0]) {
        case "review": return new ReviewPageBuilder();
        default: return new ErrorPageBuilder();
    }
}

main();