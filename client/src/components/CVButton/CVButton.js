import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CVButton.css';

class CVButton extends Component {
  
    /**
     * Draws a basic button (matching Kiva style) with loads of customization options
     * @constructor
     * @class CVButton
     * 
     * @param {object} props JSX component props
     * @param {string} props.title Button text
     * @param {bool} props.secondary Use the secondary button style?
     * @param {string} props.backgroundColor Button background color
     * @param {int} props.height Button height
     * @param {int} props.borderRadius Button border radius
     * @param {int} props.fontSize Button font size
     * @param {int} props.horizontalPadding Padding to put to the left and right side of this button
     * @param {int} props.margin CSS margin to apply to all sides
     * @param {function} props.onClick Function to be called when the button is pressed
    */
    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;

    }
  
    render() {

        var className = "btn " + ((this.props.secondary == true) ? "btn-secondary" : "btn-primary");

        return (
            <button className={className} onClick={this.props.onClick} style={{
                backgroundColor: this.props.backgroundColor,
                borderRadius: this.props.borderRadius,
                fontSize: this.props.fontSize,
                height: this.props.height,
                margin: this.props.margin
            }}>
                <span style={{
                    paddingLeft: this.props.horizontalPadding,
                    paddingRight: this.props.horizontalPadding
                }}>
                    {this.props.title}
                </span>
            </button>
        );
  }
}

export default CVButton;
