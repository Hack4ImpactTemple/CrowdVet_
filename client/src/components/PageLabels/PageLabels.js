import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageLabels.css';

class PageLabels extends Component {

    constructor(props) {
        super(props);

        this.state = {
            theory: props.theory,
            practice: props.practice,
            faqs: props.faq
        };
        this.props = props;
    }

    render() {

        return (
            <div>
                <div className={this.state.theory}
                    onClick={this.theoryClick.bind(this)}>
                    Theory
                </div>
                <div className={this.state.practice}
                    onClick={this.practiceClick.bind(this)}>
                    Practice
                </div>
                <div className={this.state.faqs}
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
        if (window.location.href !== 'theory') {
            window.location.href = 'theory';
        }

    }

    practiceClick() {
        this.setState({
            theory: 'subpages-header-col',
            practice: 'subpages-header-col activated',
            faqs: 'subpages-header-col'

        });

        if (window.location.href !== 'practice') {
            window.location.href = 'practice';
        }
    }

    faqsClick() {
        this.setState({
            theory: 'subpages-header-col',
            practice: 'subpages-header-col',
            faqs: 'subpages-header-col activated'

        });
        if (window.location.href !== 'faq') {
            window.location.href = 'faq';
        }
    }
}

PageLabels.defaultProps = {
    theory: 'subpages-header-col',
    practice: 'subpages-header-col',
    faq: 'subpages-header-col'
}

export default PageLabels;
