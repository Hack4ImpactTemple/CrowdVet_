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

class Page extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loanApproved: false
    }

  }

  render() {
    return (
      <div>
        <div class="header">
          <div class="header-top">
            <div class="header-top-col">
              Crowd Vetting at
                <img src="./img/kiva.png" class="kiva-logo-header" />
            </div><div class="header-top-col">
              Learn About Crowdvetting
        </div><div class="header-top-col">
              Start Vetting
        </div><div class="header-top-col">
              <span class="header-helper"></span>
              <img src="./img/headshot.jpg" class="profile-header" />
              Fred Rogers
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
          </div>
          <div class="header-bottom">
            <div class="header-bottom-col">
              Profile
        </div><div class="header-bottom-col">
              Vet Enterprises
        </div><div class="header-bottom-col activated">
              Training
        </div>

          </div>
        </div>

        <div class="lead-section">
            {
              this.props.lead
            }
        </div>
        <div class="subpages-header">
          <div class="subpages-header-col">Theory</div>
          <div class="subpages-header-col">Practice</div>
          <div class="subpages-header-col">FAQs</div>
        </div>

        <div class="content-section">
          {
            this.props.content
          }
        </div>

        <div class="footer">
          <div class="footer-col quarter">
            <div class="footer-col-sub">
              <span class="footer-col-header">Borrow</span>
              <span class="footer-col-desc">
                Loans for entrepreneurs doing amazing things.
          </span>
              <a class="footer-col-link">Apply Now</a>

            </div>
            <div class="footer-col-sub mid-break">
              <span class="footer-col-header">Explore</span>
              <a class="footer-col-link">
                Protocol
          </a>
              <a class="footer-col-link">
                Gifts
          </a>
              <a class="footer-col-link">
                Happening now
          </a>
              <a class="footer-col-link">
                Site map
          </a>
              <a class="footer-col-link">
                Developer API
          </a>
              <a class="footer-col-link">
                Privacy Policy
          </a>
              <a class="footer-col-link">
                Terms of use
          </a>
            </div>
          </div><div class="footer-col quarter">
            <div class="footer-col-sub">
              <span class="footer-col-header">Get to know us</span>
              <a class="footer-col-link">
                About us
          </a>
              <a class="footer-col-link">
                How Kiva works
          </a>
              <a class="footer-col-link">
                FAQs
          </a>
              <a class="footer-col-link">
                Where Kiva Works
          </a>
              <a class="footer-col-link">
                Blog
          </a>
              <a class="footer-col-link">
                Partner with us
          </a>
              <a class="footer-col-link">
                Contact us
          </a>
              <a class="footer-col-link">
                Help
          </a>
            </div>
            <div class="footer-col-sub mid-break">
              <span class="footer-col-header">Community</span>
              <a class="footer-col-link">
                Lending Teams
          </a>
              <a class="footer-col-link">
                Students and educators
          </a>
            </div>
          </div><div class="footer-col half">
            <div class="footer-col-sub">
              <span class="footer-col-desc">
                Kiva is a 501(c)3 U.S. nonprofit fueled by passionate people. Founded in 2005, and based in San Francisco, with offices in Bangkok, Nairobi, Portland and staff around the globe.
          </span>
              <a class="footer-col-link">
                Donate to Kiva
          </a>
            </div>
            <div class="footer-col-sub mid-break">
              <span class="footer-col-header">Work with us</span>

              <a class="footer-col-link inline">
                Careers
          </a>
              <span class="footer-col-link-break">|</span>
              <a class="footer-col-link inline">
                Volunteer Internships
          </a>
              <span class="footer-col-link-break">|</span>
              <a class="footer-col-link inline">
                Kiva Fellows
          </a>
              <span class="footer-col-link-break">|</span>
              <a class="footer-col-link inline">
                Reviews and Translation
          </a>
              <a class="footer-col-link">
                Trustees
          </a>
              <span class="footer-col-desc small-break">
                Lending through Kiva involves risk of principal loss. Kiva does not guarantee repayment or offer a financial return on your loan.
          </span>
            </div>
            <div class="footer-col-sub">
              <span class="footer-col-desc small-break">
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