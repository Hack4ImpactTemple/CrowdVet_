import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CVButton.css';

class CVButton extends Component {
  
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

CVButton.propTypes = {
    /**
     * Title: Text to be displayed on button
     */
    title: PropTypes.string,
    /**
     * Secondary: If true (or merely defined like <button secondary>), uses the secondary button style (white background, green border, green text) 
     */
    secondary: PropTypes.bool,
    /**
     * On Click: Function called when the button is pressed
     */
    onClick: PropTypes.func,
    /**
     * Background Color: Allows the background color to be overridden. Otherwise, we use the color defined in CVButton.css
     */
    backgroundColor: PropTypes.string,
    /**
     * Border Radius: Allows the border radius to be overridden (X pixels). Otherwise, we use the radius defined in CVButton.css
     */
    borderRadius: PropTypes.number,
    /**
     * Font Size: Allows the font size to be overridden (X pixels). Otherwise, we use the size defined in CVButton.css
     */
    fontSize: PropTypes.number,
    /**
     * Horizontal Padding: Allows the horizontal padding of the text to be overridden. Otherwise, there is no explicit padding define (except a min-width of 320px)
     */
    horizontalPadding: PropTypes.number
}

CVButton.defaultProps = {
    title: "Button",
    secondary: false,
    onClick: function(){},
    backgroundColor: undefined,
    borderRadius: undefined,
    fontSize: undefined
}

export default CVButton;
