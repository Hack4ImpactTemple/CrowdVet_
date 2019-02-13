import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageLabels.css';

class PageLabels extends Component {

    constructor(props) {
        super(props);

        this.state = props;
        this.props = props;
    }

    render() {

        return (
            <div>
                <div class={this.state.theory}
                    onClick={this.theoryClick.bind(this)}>
                    Theory
                </div>
                <div class={this.state.practice}
                    onClick={this.practiceClick.bind(this)}>
                    Practice
                </div>
                <div class={this.state.faqs}
                    onClick={this.faqsClick.bind(this)}>
                    FAQs
                </div>
            </div>
        );
    }

    theoryClick() {
        this.setState({
            theory: 'subpages-header-col activated',
            practice: 'subpages-header-col',
            faqs: 'subpages-header-col'

        });
    }

    practiceClick() {
        this.setState({
            theory: 'subpages-header-col',
            practice: 'subpages-header-col activated',
            faqs: 'subpages-header-col'

        });
    }

    faqsClick() {
        this.setState({
            theory: 'subpages-header-col',
            practice: 'subpages-header-col',
            faqs: 'subpages-header-col activated'

        });
    }
}

PageLabels.defaultProps = {
    theory: 'subpages-header-col',
    practice: 'subpages-header-col',
    faq: 'subpages-header-col'
}

export default PageLabels;
