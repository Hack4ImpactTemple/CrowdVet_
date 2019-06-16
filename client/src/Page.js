/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                            Page: Default Page Temp
 * 
 * 
 *     ALL CONTENT MUST BE EMBEDDED WITHIN A <Page> tag
 *     This is based off of Jake's template in index.html
 * 
 *      This allows us to put the page content that we each
 *      program (found in ./pages/) and a header comoponent
 *      (either the user's profile or the "Dance Peace" style
 *      header) into the page.
 * 
 *      This will avoid the case where we each have to add the HTML
 *      for the default template to our pages.
 * 
 * State:
 *  
 * 
 * Page Layout:
 * 
 */


import React, { Component } from 'react';
import { initApp, configureLoginStateCallbacks, configureLoginUI } from './Auth';

class Page extends Component {

    constructor(props) {
        super(props);

        this.firebase();
    }

    async firebase() {
        await initApp();
        await configureLoginStateCallbacks();
        await configureLoginUI();
    }

    login() {
        if (window.user === null || window.user === undefined) {
            window.location.href = '/login';
        } else {
            if (window.confirm("Logout?")) {
                window.location.href = '/logout';
            }
        }
    }

    render() {
        return (
            <div>

                <div className="header">
                    <div className="header-top">
                        <div className="header-top-col">
                            <a href="https://crowdvet.org">
                                Crowd Vetting at
                                <img src="./img/kiva.png"
                                    className="kiva-logo-header" alt="kiva logo" />
                            </a>
                        </div>
                        <div className="header-top-col">
                            <a href="https://www.crowdvet.org/learn">
                                Learn About Crowdvetting
                            </a>
                        </div>
                        <div className="header-top-col">
                            <a href="https://www.crowdvet.org/vet/enterprises">
                                Start Vetting
                            </a>
                        </div>
                        <div id="profile-header-div" className="header-top-col" onClick={this.login}>
                            <span className="header-helper"></span>
                            <div id="profile-header-wrapper">
                                <span id="profile-header-text"
                                    className="fake-link"
                                    style={
                                        {
                                            color: 'white',
                                            textDecoration: 'none',
                                            marginRight: 8
                                        }
                                    }>
                                    Loading
                                </span>
                                <img id="profile-header-image" src=""
                                    className="profile-header" alt="profile header"
                                    style={
                                        {
                                            display: 'none',
                                            backgroundColor: 'white'                                        }
                                    } />
                            </div>

                            <i id="profile-header-icon-sign-in"
                                className="fa fa-sign-in" aria-hidden="true"
                                style={
                                    {
                                        marginLeft: 6,
                                        display: 'none'
                                    }
                                }></i>
                        </div>

                    </div>
                    <div className="header-bottom">
                        <div className="header-bottom-col">
                            <a href="/profile">
                                Profile
                            </a>
                        </div>
                        <div className="header-bottom-col">
                            <a href="https://www.crowdvet.org/vet/enterprises">
                                Vet Enterprises
                            </a>
                        </div>
                        <div className="header-bottom-col activated">
                            <a href="/">
                                Training
                            </a>
                        </div>
                    </div>
                </div>

                { /* Conditionally show the page lead */}
                {this.props.lead != null ?
                    <div className="lead-section">
                        {
                            this.props.lead
                        }
                    </div>
                    : null
                }

                { /* Conditionally show the page labels -- see above */}
                {this.props.lead != null ?
                    <div className="subpages-header">
                        {
                            this.props.pageLabels
                        }
                    </div>
                    : null
                }

                <div className="content-section">
                    {
                        this.props.content
                    }
                </div>

                <div className="footer">
                    <div className="footer-col quarter">
                        <div className="footer-col-sub">
                            <span className="footer-col-header">Borrow</span>
                            <span className="footer-col-desc">
                                Loans for entrepreneurs doing amazing things.
                            </span>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/borrow"
                                target="_blank" rel="noopener noreferrer">
                                Apply Now
                            </a>
                        </div>
                        <div className="footer-col-sub mid-break">
                            <span className="footer-col-header">Explore</span>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/protocol"
                                target="_blank" rel="noopener noreferrer">
                                Protocol
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/gifts"
                                target="_blank" rel="noopener noreferrer">
                                Gifts
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/live"
                                target="_blank" rel="noopener noreferrer">
                                Happening now
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/sitemap"
                                target="_blank" rel="noopener noreferrer">
                                Site map
                            </a>
                            <a className="footer-col-link"
                                href="http://build.kiva.org/"
                                target="_blank" rel="noopener noreferrer">
                                Developer API
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/legal/privacy"
                                target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/legal/terms"
                                target="_blank" rel="noopener noreferrer">
                                Terms of use
                            </a>
                        </div>
                    </div>
                    <div className="footer-col quarter">
                        <div className="footer-col-sub">
                            <span className="footer-col-header">Get to know us</span>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/about"
                                target="_blank" rel="noopener noreferrer">
                                About us
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/about/how"
                                target="_blank" rel="noopener noreferrer">
                                How Kiva works
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/about/how#faq-hkw-section"
                                target="_blank" rel="noopener noreferrer">
                                FAQs
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/about/where-kiva-works"
                                target="_blank" rel="noopener noreferrer">
                                Where Kiva Works
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/blog"
                                target="_blank" rel="noopener noreferrer">
                                Blog
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/partner-with-us"
                                target="_blank" rel="noopener noreferrer">
                                Partner with us
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/help/contact-us"
                                target="_blank" rel="noopener noreferrer">
                                Contact us
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/help"
                                target="_blank" rel="noopener noreferrer">
                                Help
                            </a>
                        </div>
                        <div className="footer-col-sub mid-break">
                            <span className="footer-col-header">Community</span>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/teams"
                                target="_blank" rel="noopener noreferrer">
                                Lending Teams
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/kivau/intro"
                                target="_blank" rel="noopener noreferrer">
                                Students and educators
                            </a>
                        </div>
                    </div>
                    <div className="footer-col half">
                        <div className="footer-col-sub">
                            <span className="footer-col-desc">
                                Kiva is a 501(c)3 U.S. nonprofit fueled by
                                passionate people. Founded in 2005, and based in
                                San Francisco, with offices in Bangkok, Nairobi,
                                Portland and staff around the globe.
                            </span>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/donate/supportus"
                                target="_blank" rel="noopener noreferrer">
                                Donate to Kiva
                            </a>
                        </div>
                        <div className="footer-col-sub mid-break">
                            <span className="footer-col-header">Work with us</span>

                            <a className="footer-col-link inline"
                                href="https://www.kiva.org/work-with-us/careers"
                                target="_blank" rel="noopener noreferrer">
                                Careers
                            </a>
                            <span className="footer-col-link-break"></span>
                            <a className="footer-col-link inline"
                                href="https://www.kiva.org/work-with-us/internvolunteers"
                                target="_blank" rel="noopener noreferrer">
                                Volunteer Internships
                            </a>
                            <span className="footer-col-link-break"></span>
                            <a className="footer-col-link inline"
                                href="https://www.kiva.org/work-with-us/fellows"
                                target="_blank" rel="noopener noreferrer">
                                Kiva Fellows
                            </a>
                            <span className="footer-col-link-break"></span>
                            <a className="footer-col-link inline"
                                href="https://www.kiva.org/work-with-us/reviewers"
                                target="_blank" rel="noopener noreferrer">
                                Reviews and Translation
                            </a>
                            <a className="footer-col-link"
                                href="https://www.kiva.org/trustees"
                                target="_blank" rel="noopener noreferrer">
                                Trustees
                            </a>
                            <span className="footer-col-desc small-break">
                                Lending through Kiva involves risk of principal
                                loss. Kiva does not guarantee repayment or offer
                                a financial return on your loan.
                            </span>
                        </div>
                        <div className="footer-col-sub">
                            <span className="footer-col-desc small-break">
                                &copy; {new Date().getFullYear()} Kiva. All rights reserved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Page;