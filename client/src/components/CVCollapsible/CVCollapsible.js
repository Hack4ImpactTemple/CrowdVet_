import React from 'react';
import PropTypes from 'prop-types';
import './CVCollapsible.scss';

class CVCollapsable extends React.Component {

    /*
        If you'd like to use this component without the container, you can use it like so:
        <CVCollapsable title={'The title goes here!'} votes={undefined}>
            <p>You can write whatever html/jsx you want here</p>
        </CVCollapsable>
    */

    constructor(props) {
        super(props);
        this.innerRef = React.createRef();
        this.state = {
            isExpanded: false
        };
    }

    /*
        Toggles the expanded state of this component
        @param e    the event data - sent from the onClick event
        @return void
    */
    toggle(e) {
        e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded
        });
        this.update_measurements(e);
    }
    /*
        Updates the measurements of the {innerRef}
        @param e    the event data - sent from the onClick event or the resize event on the window
        @return void
    */
    update_measurements(e) {
        this.setState({
            //for calculating height of children
            height: 'auto',
            width: this.innerRef.current.clientWidth
        });
    }

    /*
        Decides whether or not there should be a 'votes' button rendered
        @param votes    the 'votes' prop passed in.
        @return If 'votes' is defined, returns a votes button, otherwise null
    */
    votes_section(votes) {
        if (votes === undefined) return null;
        else return (
            <button className="CVCollapsable-title" id="votes_section" title="Votes">
                {votes}
            </button>
        );
    }

    render() {
        //variables coming in
        const { title, votes, children } = this.props;
        const { isExpanded, height, width } = this.state;
        //variables to calclulate
        const current_height = isExpanded ? height : 0;
        const votes_defined = (votes !== undefined);
        //adjustments for CSS padding and stable measurements when window is resized
        const title_width = width - ((votes_defined) ? 41 : -9);
        return (
            <div className={`CVCollapsable`}>
                {this.votes_section(votes)}
                <button className="CVCollapsable-title" id={`${votes_defined ? '' : 'no_votes'}`} onClick={(e) => this.toggle(e)}
                    style={{ width: title_width + 'px' }}>
                    {title}
                </button>
                <button className={`CVCollapsable-title ${votes_defined ? 'curve' : ''}`} id="arrow" onClick={(e) => this.toggle(e)}>
                    {isExpanded ? '╱╲' : '╲╱'}
                </button>
                <div className="CVCollapsable-collapse" style={{ height: current_height }}>
                    <div className="CVCollapsable-body" ref={this.innerRef}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    //attempt to stop a window resize from destroying the aesthetic.  This still breaks if the page doesn't start with a scrollbar, and gains one at some point.
    componentDidMount() {
        window.addEventListener("resize", this.update_measurements.bind(this));
        this.update_measurements();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.update_measurements.bind(this));
    }
}


CVCollapsable.propTypes = {
    title: PropTypes.string,
    votes: PropTypes.number,
};

export default CVCollapsable;