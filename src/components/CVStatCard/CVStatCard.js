import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CVStatCard.css';

/**
 * Presents a gray info card/chip with bright green info text inside
 *   1. string? header: an optional top title
 *   2. string primary: the primary text/statistic we're showing (in big green)
 *   3. string? footer: an optional bottom subtitle
 */
class CVStatCard extends Component {
  
    /**
     * Dynamically constructs a CVStatCard using the provided props
     * @param {object} props 
     */
    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }
  
    render() { 
        return (
            <div class="cv-stat-card">
                <span class="cv-stat-card-header">{this.props.header || ""}</span>
                <span class="cv-stat-card-primary">{this.props.primary || ""}</span>
                <span class="cv-stat-card-subtitle">{this.props.subtitle || ""}</span>
            </div>
        );
    }
}

export default CVStatCard;