import React from 'react';
import PropTypes from 'prop-types';
import './CVTextInput.scss';

class CVTextInput extends React.Component {

    render() {
        const {placeholder, title, onClick, rows, cols} = this.props;
        return(
            <div className="CVTextInput-container">
                <div className="CVTextInput-title">
                    {title}
                </div>
                <div className="CVTextInput-text">
                    <textarea rows={rows} cols={cols} placeholder={placeholder}></textarea>
                </div>
                <div className="CVTextInput-button">
                    <button onClick={onClick}>Submit</button>
                </div>
            </div>
        );
    }
}

CVTextInput.PropTypes = {
    placeholder: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    rows: PropTypes.number,
    cols: PropTypes.number,
};

export default CVTextInput;