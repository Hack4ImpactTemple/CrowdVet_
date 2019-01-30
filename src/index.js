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

/*ReactDOM.render(
    <Page 
        lead={
            <OrganizationLead 
                backgroundImage={'https://firebasestorage.googleapis.com/v0/b/djdjga123456.appspot.com/o/19UynfZxByFTAZTBWlWHcf0VQ8kA2JXpBnGvdWnCmjmXUuv2BHb2uiHqlZn4eSv?alt=media&token=19ba582b-40f7-4953-8dc3-c2267657ce72'}
                title={'Dance Peace'}
                subtitle={'Vetting ended: 25 Julianuary 2008'}
            ></OrganizationLead>
        }
        content={
            <ReviewPage 
                sector={'Education'}
                amount={"$69,420"}
                location={"Somalia"}
                items={[
                    {
                        title: "Problem",
                        content: ( "One of the most critical difficuties that concerns Sanergy is that the lack of clean facilties is making people ill and unable to work their jobs which hurts the local economy and production at the local cement factory. ")
                    },
                    {
                        title: "Loan Purpose:",
                        content: ( <div><span>{"• T into new product development. "}</span><span>{"• 	Training"}</span></div> )
                    },
                    {
                        title: "Loan Purpose:",
                        content: ( <div><span>{"• T into new product development. "}</span><span>{"• 	Training"}</span></div> )
                    },
                    {
                        title: "Problem",
                        content: ( "One of the most critical difficuties that concerns Sanergy is that the lack of clean facilties is making people ill and unable to work their jobs which hurts the local economy and production at the local cement factory. ")
                    }
                ]}
                tableitems={[
                    {
                        title: 'View Application Materials',
                        items: [
                            {
                                title: 'Initial Loan Inquiry',
                                link: 'http://google.com',
                                type: 'pdf'
                            },
                            {
                                title: 'Loan Application',
                                link: 'http://google.ca',
                                type: 'docx'
                            },
                            {
                                title: 'Board of Directors',
                                link: 'http://google.co.nz',
                                type: 'ppt'
                            }
                        ]
                    },
                    {
                        title: 'View Financial Materials',
                        items: [
                            {
                                title: 'Zero Tool',
                                link: 'http://google.com',
                                type: 'rtf'
                            },
                            {
                                title: 'P&L \'17',
                                link: 'http://google.ca',
                                type: 'avi'
                            }
                        ]
                    }
                ]}
            />
        }
        
        
    ></Page>,
    document.getElementById('root')
);
*/