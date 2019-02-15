import React from 'react';
import PropTypes from 'prop-types';
import './CVCollapsible.scss';

class CVCollapsible extends React.Component {

    /*
        If you'd like to use this component without the container, you can use it like so:
        <CVCollapsible title={'The title goes here!'} votes={undefined}>
            <p>You can write whatever html/jsx you want here</p>
        </CVCollapsible>
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

    render() {
        //variables coming in
        const { title, children } = this.props;
        const { isExpanded, height, width } = this.state;
        //variables to calclulate
        const current_height = isExpanded ? height : 0;
        //adjustments for CSS padding and stable measurements when window is resized
        const title_width = width + 9;

        // {this.votes_section(votes)}
        // ${votes_defined ? 'curve' : ''}`
        return (
            <div className={`CVCollapsible`}>
                <div className="CVCollapsible-title" onClick={(e) => this.toggle(e)}>
                    <div className="CVCollapsible-title" id="title">
                        {title}
                    </div>
                    <div className="CVCollapsible-title" id="arrow">
                        {isExpanded ? '╱╲' : '╲╱'}
                    </div>
                </div>
                <div className="CVCollapsible-collapse" style={{ height: current_height }}>
                    <div className="CVCollapsible-body" ref={this.innerRef}>
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


CVCollapsible.propTypes = {
    title: PropTypes.string,
};

export default CVCollapsible;