import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CVNumberLine.css';

class CVNumberLine extends Component {
  
    /**
     * Creates a number line with a value enclose in a circle
     * @constructor
     * @class CVNumberLine
     * @param {Object} props JSX Props
     * @param {String} props.id HTML element id (required to make sure Number lines don't conflict)
     * @param {String} props.title Title of this number line (what we're measuring) 
     * @param {int} props.height Height to render this view
     * @param {int} props.width Width to render this view
     * @param {int} props.start Staring value of the number line (1 on a scale of 1 to 10)
     * @param {int} props.scale Highest number on the number line (10 on a scale of 1 to 10)
     * @param {String} props.color Color to render the line (and associated text)
     */
    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }
  
    render() { 

        return <canvas id={this.props.id} class="cv-number-line" height={this.props.height} width={this.props.width}/>

        if(this.props.big == undefined) {
            return <div style={{minHeight: 20, width: 100, backgroundColor: "blue"}}></div>
        } else {
            return <div style={{minHeight: 100, width: 100, backgroundColor: "orange"}}></div>
        }
    }

    componentDidMount() {
        
        var canvas = document.getElementById(this.props.id);
        
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = this.props.color;
        ctx.fillStyle = this.props.color;
        ctx.globalAlpha = 1.0;

        var height = canvas.height;
        var width = canvas.width;

        var padding = 4;

        var lineY = 34;
        var lineX1 = 124;
        var lineX2 = width;

        var tickHeight = 9;
        var circleHeight = 32;
        var rectW = 60;
        var votesLabelHeight = 22;

        var linewidth = lineX2 - lineX1
        var unitwidth = linewidth / (2 * this.props.scale); // Please note: the ends are 1 unit, but all other ones are 2 units apart

        var circleX = lineX1 + ( ( (2 * this.props.value) - 1) * unitwidth);
        var circleY = lineY - (circleHeight / 2);
        var circleR = circleHeight / 2;

        var maxvotes = Math.max.apply(null,this.props.votes);
        var maxvotesheight = height - lineY - votesLabelHeight - padding;

        for(var i = 1; i < 2 * this.props.scale; i += 2) {
            
            var tickX = lineX1 + (i * unitwidth);
            var tickY1 = lineY - 1;
            var tickY2 = tickY1 - tickHeight;
            
            // Draw the ticks
            ctx.beginPath();
            ctx.setLineDash([])
            ctx.moveTo(tickX, tickY1);
            ctx.lineTo(tickX, tickY2);
            ctx.stroke();

            // Draw the average value (if )
            if(this.props.votes) {

                var val = this.props.votes[(i-1)/2];
                var rectH = (val * maxvotesheight) / maxvotes; 

                var rectX = tickX - (rectW / 2);
                var rectY = tickY1 + padding;

                // Don't draw zero-size boxes
                if(val == 0) {
                    continue;
                }

                // Draw the dashed reactagle
                ctx.beginPath();
                ctx.setLineDash([2, 2]);
                ctx.rect(rectX, rectY, rectW, rectH); 
                ctx.stroke();

                // Label the number of votes
                ctx.font = "18px Roboto";
                ctx.textAlign = "center";
                ctx.fillText(val + " votes",rectX + (rectW / 2),rectY + rectH + 20, rectW);
            }
        }


        // Draw the line
        ctx.beginPath();
        ctx.setLineDash([])
        ctx.moveTo(lineX1, lineY);
        ctx.lineTo(lineX2, lineY);
        ctx.stroke();

        // Draw the value (circle)
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleR, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw the value (in the circle)
        ctx.font = "14px Roboto";
        ctx.textAlign = "center";
        ctx.fillText(this.props.value,circleX,circleY + (circleY / 4) - 1);

        // Draw the label (e.g. "Kiva Vote")
        ctx.font = "18px Roboto";
        ctx.textAlign = "left";
        ctx.fillText(this.props.title, 0, lineY);

    }
}

export default CVNumberLine;
