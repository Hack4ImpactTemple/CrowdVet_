import React from 'react';
import ReactDOM from 'react-dom';

import Url from 'domurl';
import Page from './Page';
import './index.css';

import {
    ReviewPageBuilder
} from './pages/ReviewPage/ReviewPage.js';

import {
    PracticePageBuilder
} from './pages/PracticePage/PracticePage.js';

import {
    ErrorPageBuilder
} from './pages/ErrorPage/ErrorPage.js';

import {
    FAQPageBuilder
} from './pages/FAQPage/FAQPage.js';

import PageLabels from './components/PageLabels/PageLabels.js';


async function main() {

    // URL Mapping for PageLabels
    var url = new Url();
    var path = url.path.replace("/", "");
    var components = path.split("/");
    let theoryStr = 'subpages-header-col ';
    let practiceStr = 'subpages-header-col ';
    let faqStr = 'subpages-header-col ';

    if (components[0] === 'review' || components[0] === 'practice' ||
        components[0] === "") {
        practiceStr += 'activated';
    } else if (components[0] === 'theory') {
        theoryStr += 'activated';
    } else if (components[0] === 'faq') {
        faqStr += 'activated';
    }

    // Bootstrapping for CVPageBuilder
    var builder = getBuilder(url);
    await builder.onPageLoad();

    ReactDOM.render(
        <Page
            lead={
                builder.pageLead("next")
            }
            content={
                builder.pageContent()
            }
            pageLabels={
                <PageLabels theory={theoryStr}
                    practice={practiceStr}
                    faqs={faqStr}
                />
            }
        />,
        document.getElementById("root")
    )

    window.onbeforeunload = function () {
        builder.onPageClose();
    };
}

// Returns a CVPageBuilder object, based on the current URL of the page
function getBuilder() {
    var url = new Url();
    var path = url.path.replace("/", "");
    var components = path.split("/");

    console.log(components[0]);


    switch (components[0]) {
        case "review":
            return new ReviewPageBuilder();
        case "practice":
        case "":
            return new PracticePageBuilder();
        case "faq":
            return new FAQPageBuilder();
        default:
            return new ErrorPageBuilder();
    }
}

main();