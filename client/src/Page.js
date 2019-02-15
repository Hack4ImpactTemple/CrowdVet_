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
import { Url } from 'domurl';

class Page extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="header-top">
                        <div className="header-top-col">
                            Crowd Vetting at
                            <img src="./img/kiva.png" className="kiva-logo-header" />
                        </div>
                        <div className="header-top-col">
                            Learn About Crowdvetting
                        </div>
                        <div className="header-top-col">
                            Start Vetting
                        </div>
                        <div className="header-top-col">
                            <span className="header-helper"></span>
                            <img src="./img/headshot.jpg"
                                className="profile-header" />
                            Fred Rogers
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="header-bottom">
                        <div className="header-bottom-col">
                            Profile
                        </div>
                        <div className="header-bottom-col">
                            Vet Enterprises
                        </div>
                        <div className="header-bottom-col activated">
                            Training
                        </div>
                    </div>
                </div>

                <div className="lead-section">
                    {
                        this.props.lead
                    }
                </div>
                <div className="subpages-header">
                    {
                        this.props.pageLabels
                    }
                </div>

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
                            <a className="footer-col-link">Apply Now</a>
                        </div>
                        <div className="footer-col-sub mid-break">
                            <span className="footer-col-header">Explore</span>
                            <a className="footer-col-link">
                                Protocol
                            </a>
                            <a className="footer-col-link">
                                Gifts
                            </a>
                            <a className="footer-col-link">
                                Happening now
                            </a>
                            <a className="footer-col-link">
                                Site map
                            </a>
                            <a className="footer-col-link">
                                Developer API
                            </a>
                            <a className="footer-col-link">
                                Privacy Policy
                            </a>
                            <a className="footer-col-link">
                                Terms of use
                            </a>
                        </div>
                    </div>
                    <div className="footer-col quarter">
                        <div className="footer-col-sub">
                            <span className="footer-col-header">Get to know us</span>
                            <a className="footer-col-link">
                                About us
                            </a>
                            <a className="footer-col-link">
                                How Kiva works
                            </a>
                            <a className="footer-col-link">
                                FAQs
                            </a>
                            <a className="footer-col-link">
                                Where Kiva Works
                            </a>
                            <a className="footer-col-link">
                                Blog
                            </a>
                            <a className="footer-col-link">
                                Partner with us
                            </a>
                            <a className="footer-col-link">
                                Contact us
                            </a>
                            <a className="footer-col-link">
                                Help
                            </a>
                        </div>
                        <div className="footer-col-sub mid-break">
                            <span className="footer-col-header">Community</span>
                            <a className="footer-col-link">
                                Lending Teams
                            </a>
                            <a className="footer-col-link">
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
                            <a className="footer-col-link">
                                Donate to Kiva
                            </a>
                        </div>
                        <div className="footer-col-sub mid-break">
                            <span className="footer-col-header">Work with us</span>

                            <a className="footer-col-link inline">
                                Careers
                            </a>
                            <span className="footer-col-link-break"></span>
                            <a className="footer-col-link inline">
                                Volunteer Internships
                            </a>
                            <span className="footer-col-link-break"></span>
                            <a className="footer-col-link inline">
                                Kiva Fellows
                            </a>
                            <span className="footer-col-link-break"></span>
                            <a className="footer-col-link inline">
                                Reviews and Translation
                            </a>
                            <a className="footer-col-link">
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
                                &copy; 2018 Kiva. All rights reserved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Page;