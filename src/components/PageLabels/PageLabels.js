import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageLabels.css';

class PageLabels extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }

    render() {

        return (
            <div>
                <div class={this.props.theory}>
                    Theory
                </div>
                <div class={this.props.practice}>
                    Practice
                </div>
                <div class={this.props.faqs}>
                    FAQs
                </div>
            </div>
        );
    }
}

PageLabels.defaultProps = {
    theory: 'subpages-header-col',
    practice: 'subpages-header-col',
    faq: 'subpages-header-col'
}

export default PageLabels;
