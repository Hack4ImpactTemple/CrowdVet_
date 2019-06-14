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
import OrganizationLead from '../../leads/OrganizationLead/OrganizationLead.js'
import CVStatCard from '../../components/CVStatCard/CVStatCard.js';
import ClientSideRequests from '../../api/ClientSideRequests.js';
import CVButton from '../../components/CVButton/CVButton'

/**
 * 
 * Shows all the details of the organization that the user can use to help them vet. For example, it shows amount requested, location, documentation from the startup, etc.
 * 
 * @constructor
 * @class ReviewPage
 * @param {Object} props React.js props
 */
class ReviewPage extends Component {

    render() {
        // Parse the main page content items
        var items = [];
        for (var a = 0; a < this.props.items.length; a++) {
            items.push(
                <div class="page-info-item" key={'content-' + a}>
                    <span class="page-info-item-title">{this.props.items[a]['title']}</span>
                    <span class="page-info-item-content">{this.props.items[a]['content']}</span>
                </div>
            )
        }

        // Parse the table content
        var table = [];
        for (var i = 0; i < this.props.tableitems.length; i++) {
            var tableHeaderClass = "table-header " + ((i === 0) ? "item-t" : "");
            table.push(<tr><td class={tableHeaderClass} colSpan={4}>{this.props.tableitems[i]['title']}</td></tr>);
            for (var j = 0; j < this.props.tableitems[i]['items'].length; j += 2) {
                var row = [];
                row.push(<td class="item-icon item-l"><a target="_blank" rel="noopener noreferrer" href={this.props.tableitems[i]['items'][j]['link']}><FontAwesomeIcon icon={this.fileIcon(this.props.tableitems[i]['items'][j]['type'])} /></a></td>);
                row.push(<td class='item-content item-r'>{this.props.tableitems[i]['items'][j]['title']}</td>);
                if (j + 1 < this.props.tableitems[i]['items'].length) {
                    row.push(<td class="item-icon"><a target="_blank" rel="noopener noreferrer" href={this.props.tableitems[i]['items'][j + 1]['link']}><FontAwesomeIcon icon={this.fileIcon(this.props.tableitems[i]['items'][j + 1]['type'])} /></a></td>);
                    row.push(<td class='item-content item-r'>{this.props.tableitems[i]['items'][j + 1]['title']}</td>);
                } else {
                    row.push(<td class="item-icon no-hover"></td>);
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
                    <CVStatCard header="Company Sector" primary={this.props['sector']} />
                    <CVStatCard header="Amount Requested" primary={this._moneyFormat(this.props['amount'])} subtitle={this.props['currency']} />
                    <CVStatCard header="Geographic Location" primary={this.props['country']} subtitle={this.props['region']} />
                </div>
                <div id="page-info-content">
                    {items}
                </div>
                <div id="page-info-table">
                    <table cellSpacing={0} style={{ tableLayout: 'fixed', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '0', height: '0', width: "5%" }} />
                                <th style={{ border: '0', height: '0', width: "45%" }} />
                                <th style={{ border: '0', height: '0', width: "5%" }} />
                                <th style={{ border: '0', height: '0', width: "45%" }} />
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                </div>
                <div className="bottom-buttons">
                    <div className="button">
                        <CVButton secondary={true} title={'Previous'} />
                    </div>
                    <div className="button">
                        <CVButton title={'Next'} onClick={() => this.go("evaluate?id=" + this.props.id)} />
                    </div>
                </div>
            </div>
        );
    }

    go(url) {
        window.location.href = url;
    }

    /**
   * 
   * (Internal method) Returns a FontAwesome icon for a file extension (.docx --> WordDoc logo)
   * 
   * @constructor
   * @param {Object} props React.js props
   * @return {FontAwesomeIcon} A FontAwesome icon that can be displayed like so <FontAwesomeIcon icon={result}/>
   */
    fileIcon(type) {
        switch (type) {
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

    /**
     * Formats a number into $1,000,000 form
     * @param {int} num An unformatted money amount
     * @returns {string} A formatted money amount
     */
    _moneyFormat(num) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
        return formatter.format(parseInt(num));
    }

}

class ReviewPageBuilder extends CVPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props
    data = {};

    // @override
    async onPageLoad(url) {

        var request = new window.APIRequest();
        var json = await request.endpoint(ClientSideRequests.loan(url['query']['id']));

        if (request.error) {
            return false;
        }

        // Preprocessing: Convert to a Loan object
        var loan = new window.Loan();
        loan.bind(json);

        let loanImage = '';
        switch (loan['meta']['sector']['name']) {
            case 'Agriculture':
                loanImage = './img/sectors/agriculture.jpg';
                break;
            case 'Arts':
                loanImage = './img/sectors/arts.jpg';
                break;

            case 'Clothing':
                loanImage = './img/sectors/clothing.jpg';
                break;

            case 'Construction':
                loanImage = './img/sectors/construction.jpg';
                break;

            case 'Education':
                loanImage = './img/sectors/education.jpg';
                break;

            case 'Entertainment':
                loanImage = './img/sectors/entertainment.jpg';
                break;

            case 'Food':
                loanImage = './img/sectors/food.jpg';
                break;

            case 'Health':
                loanImage = './img/sectors/health.jpg';
                break;

            case 'Housing':
                loanImage = './img/sectors/construction.jpg';
                break;

            case 'Manufacturing':
                loanImage = './img/sectors/manufacturing.jpg';
                break;

            case 'Retail':
                loanImage = './img/sectors/manufacturing.jpg';
                break;

            case 'Services':
                loanImage = './img/sectors/entertainment.jpg';
                break;

            case 'Transportation':
                loanImage = './img/sectors/agriculture.jpg';
                break;

            case 'Wholesale':
                loanImage = './img/sectors/entertainment.jpg';
                break;

            default:
                loanImage = './img/sectors/food.jpg';
                break;
        }

        // Get the files required (in alphabetical order)
        var files_request = new window.APIRequest();
        var files = await files_request.endpoint('/files/' + url['query']['id']);
        files.sort();

        // Create an array with all the data required for the view component
        var filedata = [];
        for (var file of files) {
            filedata.push({
                title: file,
                link: files_request.serverendpoint + 'files/' + url['query']['id'] + '/' + file,
                type: file.substring(file.lastIndexOf('.') + 1)
            })
        }

        let purpose_summary = this._htmlFormat(loan['application']['loan_purpose_summary']);
        let loan_usage = this._htmlFormat(loan['application']['loan_usage']);
        let benefit_to_revenue = this._htmlFormat(loan['application']['loan_benefit_to_revenue']);

        let operationDate = this._parseNull(loan['application']['began_operations']);
        let employeeCount = this._parseNull(loan['application']['paid_employees']);
        let ownershipStatus = this._parseNull(loan['application']['ownership_status']);
        let assetSize = this._parseNull(loan['application']['current_assets'], true, loan['application']['currency']);
        let salesRevenue = this._parseNull(loan['application']['current_assets'], true, loan['application']['currency']);

        this.data = {
            id: url.query['id'],
            title: loan['meta']['name'],
            image: loanImage,
            sector: loan['meta']['sector']['name'],
            amount: loan['meta']['loanAmount'],
            currency: loan['application']['currency'],
            country: loan['meta']['geocode']['country']['name'],
            region: loan['meta']['geocode']['country']['region'],
            items: [
                {
                    title: "Problem",
                    content: <div>{loan['application']['problem']}</div>
                },
                {
                    title: "Loan Purpose",
                    content: (<div><span>{purpose_summary}</span><span>{loan_usage}</span><span>{benefit_to_revenue}</span></div>)
                },
                {
                    title: "Business Model",
                    content: <div>{loan['application']['business_model']}</div>
                },
                {
                    title: "Selected Metrics",
                    content: (<div>
                        <span>{"• Began Operating: " + operationDate}</span>
                        <span>{"• Number of Paid Employees: " + employeeCount}</span>
                        <span>{"• Ownership Status: " + ownershipStatus}</span>
                        <span>{"• Asset Size: " + assetSize}</span>
                        <span>{"• Previous Year Sales Revenue: " + salesRevenue}</span>
                    </div>)
                }
            ],
            tableitems: [
                {
                    title: 'View Application Materials',
                    items: filedata
                }
            ]
        }
    }

    _parseNull(val, money = false, currency = null) {
        if (val) {
            if (money && currency) {
                return currency + ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            return val;
        } else {
            return "Information not available";
        }
    }

    _htmlFormat(str) {
        var element = [];
        var components = str.split("\n");
        //alert(components.length);
        for (var i = 0; i < components.length; i++) {
            if (components[i].includes("[object Object]")) {
                continue;
            }

            if (components[i].replace(/^\s+/, '').replace(/\s+$/, '') === '') {
                continue;
            }

            if (components[i].includes("•")) {
                element.push(<span>{components[i]}</span>);
            } else {
                element.push(<span>{"• " + components[i]}</span>);
            }

        }

        return <span>{element}</span>;
    }

    // @override
    pageLead() {
        return (
            <OrganizationLead
                backgroundImage={this.data.image}
                title={this.data.title}
                subtitle={this.data.subtitle}
            />
        );
    }

    // @override
    pageContent() {
        return (
            <ReviewPage
                id={this.data.id}
                sector={this.data.sector}
                amount={this.data.amount}
                currency={this.data.currency}
                country={this.data.country}
                region={this.data.region}
                items={this.data.items}
                tableitems={this.data.tableitems}
            />
        )
    }

}

export { ReviewPage, ReviewPageBuilder };
