import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CVTable.css';

/**
 * Presents a custom table using the provided props:
 *   1. string? title: an optional table title
 *   2. string[] cols: an array of column names
 *   3. data[][] data: a 2d array of data for each row (treat the first index of each row as the row's title)
 *   3. string? footer: an optional table footer
 */
class CVTable extends Component {
  
    /**
     * Dynamically constructs a table using the provided props
     * @param {object} props 
     */
    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }
  
    render() { 

        if(!this.props.cols || !this.props.data) {
            return null;
        }

        return <table class="cv-table">{
            this.renderTable(this.props.title, this.props.cols, this.props.data, this.props.footer)
        }</table>       
    }

    renderTable(title, colNames, rowData, footer) {
        
        var titleRow = null;
        var headerRow = null;
        var dataRows = [];
        var footerRow = null;

        // Render the table's header
        if(title) {
            titleRow = <th id="cv-title-row" colspan={colNames.length + 1}>{title}</th>
        }
        
        // Render the labels for every column
        headerRow = <tr id="cv-header-row"> { function() {
            var jsx = [];
            for(var i = 0; i <= colNames.length; i++) {
                if(i == 0) {
                    jsx.push(<th></th>)
                } else {
                    jsx.push(<th>{colNames[i-1]}</th>)
                }
            }
            return jsx;
        }()} </tr>
        

        // Render the data rows (The first item of every row is treated as that row's label)
        dataRows = function() {
            var jsx = [];
            for(var r = 0; r < rowData.length; r++) {
                var row = [];
                for(var c = 0; c < rowData[r].length; c++) {
                    if(c==0) {
                        row.push(<td class="cv-row-title">{rowData[r][c]}</td>)
                    } else {
                        row.push(<td class="cv-row-data">{rowData[r][c]}</td>)
                    }
                }
                jsx.push(<tr>{row}</tr>);
            }
            return jsx;
        }()

        // Render the table
        if(footer) {
            footerRow = <th id="cv-footer-row" colspan={colNames.length + 1}>{footer}</th>
        }

        // Take the titleRow, headerRow, and footerRow and add them to an array
        // Because dataRows is actually an array itself, 
        // add every element from dataRows to the jsx array
        var jsx = [];
        jsx.push(titleRow);
        jsx.push(headerRow);
        for(var d = 0; d < dataRows.length; d++) {
            jsx.push(dataRows[d]);
        }
        jsx.push(footerRow);

        return jsx;
    }
}

CVTable.propTypes = {
   /**
    * Title?: Optionally show a table title
    */
   title: PropTypes.string,
   /**
    * Cols: The names of the columns (as an array)
    */
   cols: PropTypes.array,
   /**
    * Rows: The data we'll draw into each row (as a 2d array). 
    * We treat the first element of each row as that row's title
    * For example, [['apple', 'red', '2.3oz'],['lemon','yellow','1.2oz']]
    */
   rows: PropTypes.array,
   /**
    * Footer?: Optionally show some footer text
    */
   footer: PropTypes.string
}

CVTable.defaultProps = {
    title: undefined,
    cols: [],
    rows: [],
    footer: undefined
}

export default CVTable;
