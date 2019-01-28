/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                                Page: ReviewPage
 * 
 *      Shows all the details of the organization that the user can use
 *      to help them vet. For example, it shows amount requested, location, 
 *      documentation from the startup, etc.
 * 
 * State: None
 *  
 * Props: 
 *   string sector: Type of loan (ex: Education)
 *   string amount: Amount of money requested
 *   string location: Location of the non-profit entity
 *   object[] items: A an array of objects (properties = string title and object content) that we'll show in a grid
 *   object[] items: A an array of objects (properties = string title and object items (title, link) ) that we'll show in the table
 */

import React, { Component } from 'react';
import './ReviewPage.css';
import CVPageBuilder from '../../interfaces/CVPageBuilder.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFilePdf, faFileExcel, faFileWord, faFileImage, faFilePowerpoint, faFileVideo } from "@fortawesome/fontawesome-free-solid";

import CVStatCard from '../../components/CVStatCard/CVStatCard.js';

class ReviewPage extends Component {
    
    constructor(props) {
        super(props);
    }

    fileIcon(type) {
        switch(type) {
            case "pdf": return faFilePdf;
            case "xls": return faFileExcel;
            case "xlsx": return faFileExcel;
            case "xlsb": return faFileExcel;
            case "xlsm": return faFileExcel;
            case "doc": return faFileWord;
            case "docx": return faFileWord;
            case "docb": return faFileWord;
            case "docm": return faFileWord;
            case "ppt": return faFilePowerpoint;
            case "pptx": return faFilePowerpoint;
            case "pptm": return faFilePowerpoint;
            case "ppsx": return faFilePowerpoint;
            case "ppsm": return faFilePowerpoint;
            case "odp": return faFilePowerpoint;
            case "jpg": return faFileImage;
            case "jpeg": return faFileImage;
            case "png": return faFileImage;
            case "gif": return faFileImage;
            case "tif": return faFileImage;
            case "tiff": return faFileImage;
            case "bmp": return faFileImage;
            case "mp4": return faFileVideo;
            case "mov": return faFileVideo;
            case "avi": return faFileVideo;
            case "flv": return faFileVideo;
            case "wmv": return faFileVideo;
            default: return faFile;
        }
    }

    render() {

        // Parse the main page content items
        var items = [];
        for(var i = 0; i < this.props.items.length; i++) {
            items.push(
                <div class="page-info-item" key={'content-' + i}>
                    <span class="page-info-item-title">{this.props.items[i]['title']}</span>
                    <span class="page-info-item-content">{this.props.items[i]['content']}</span>
                </div>
            )
        }

        // Parse the table content
        var table = [];
        for(var i = 0; i < this.props.tableitems.length; i++) {
            var tableHeaderClass = "table-header " + ((i == 0) ? "item-t" : "");
            table.push(<tr><td class={tableHeaderClass} colSpan={4}>{this.props.tableitems[i]['title']}</td></tr>);
            for(var j = 0; j < this.props.tableitems[i]['items'].length; j+=2) {
                var row = []; 
                row.push(<a href={this.props.tableitems[i]['items'][j]['link']}><td class="item-icon item-l"><FontAwesomeIcon icon={this.fileIcon(this.props.tableitems[i]['items'][j]['type'])} /></td></a>);
                row.push(<td class='item-content item-r'>{this.props.tableitems[i]['items'][j]['title']}</td>);
                if(j+1 < this.props.tableitems[i]['items'].length) {
                    row.push(<a href={this.props.tableitems[i]['items'][j+1]['link']}><td class="item-icon"><FontAwesomeIcon icon={this.fileIcon(this.props.tableitems[i]['items'][j+1]['type'])} /></td></a>);
                    row.push(<td class='item-content item-r'>{this.props.tableitems[i]['items'][j+1]['title']}</td>);
                } else {
                    row.push(<td class="item-icon"></td>);
                    row.push(<td class='item-content item-r'></td>);
                }
                table.push(<tr>{row}</tr>);
            }
        }

        return (
            <div className="ReviewPage">
                <div id="page-title">
                    <span class="title">Loan Summary Report</span>
                </div>
                <div id="page-info-cards">
                    <CVStatCard header="Company Sector" primary={this.props['sector']}/>
                    <CVStatCard header="Amount Requested" primary={this.props['amount']} subtitle="USD"/>
                    <CVStatCard header="Geographic Location" primary={this.props['location']} subtitle="East Africa"/>
                </div>
                <div id="page-info-content">
                    { items }
                </div>
                <div id="page-info-table">
                    <table cellSpacing={0} style={{tableLayout: 'fixed', width: '100%'}}>
                        <thead>
                            <tr>
                                <th style={{border: '0', height: '0', width: "5%"}} />
                                <th style={{border: '0', height: '0', width: "45%"}} />
                                <th style={{border: '0', height: '0', width: "5%"}} />
                                <th style={{border: '0', height: '0', width: "45%"}} />
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

class ReviewPageBuilder extends CVPageBuilder {
    
    state = {
        
    }
    
    async onPageLoad() {
        // Fetch data here
    } 
    pageContent() {
        return (
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
        )
    } 
}  

export { ReviewPage , ReviewPageBuilder };