import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CVNumberLineHeader.css';

class CVNumberLineHeader extends Component {
  
    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }
  
    render() { 
        return <canvas id={this.props.id} class="cv-number-line-header" height={this.props.height} width={this.props.width}/>
    }

    componentDidMount() {
        var canvas = document.getElementById(this.props.id);

        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = this.props.color;
        ctx.fillStyle = this.props.color;
   
        var height = canvas.height;
        var width = canvas.width;

        // Split between label and circles at x=124
        var split = 124;
        var circleY = height / 2;
        var circleR = 16;

        // Divide the circles at even distances
        var padding = (width - split) / (2 * (this.props.end - this.props.start + 1));

        // Draw the label (e.g. "Prioritization = ")
        ctx.font = "18px Roboto";
        ctx.textAlign = "left";
        ctx.fillText(this.props.title, 0, circleY);

        // Draw the circles
        for(var i = 1, n = this.props.start; i < 2 * (this.props.end - this.props.start + 1); i += 2, n++) {
            
            var circleX = split + (i * padding);

            // Draw the circle
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleR, 0, 2 * Math.PI);
            ctx.stroke();

            // Draw the label in the circle
            ctx.font = "14px Roboto";
            ctx.textAlign = "center";
            ctx.fillText(n, circleX, circleY + (circleY / 4));
            
        }

    }
}

CVNumberLineHeader.propTypes = {
   // ... prop types here
}

CVNumberLineHeader.defaultProps = {
    // ... default props here
}

export default CVNumberLineHeader;
