// ResultTable component
// Show the list of results in table
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import '../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './ResultPanel.css';

class ResultTable extends React.Component {
  static dateFormatter(cell) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(cell).toLocaleDateString('en-US', options);
    return date;
  }

  static knownTextFormatter(cell, row, rowIndex) {
    return (
      <ul style={{ listStyleType: 'none', paddingLeft: '5px' }} key={`${rowIndex}-known`}>
        {cell.map(text => <li key={`${rowIndex}-known-${text}`}>{text}</li>)}
      </ul>
    );
  }

  constructor(props) {
    super(props);

    ResultTable.defaultProps = {
      results: null,
    };

    ResultTable.propTypes = {
      results: PropTypes.arrayOf(PropTypes.object),
    };

    this.state = {
      data: props.results,
    };

    autoBind(this);

    this.processingKeys = {
      prePunctuation: 'Strip Punctuation',
      preNumbers: 'Strip Numbers',
      preLowercase: 'Lowercase',
      preAlphabet: 'Basic Alphabet',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.results });
  }

  parametersFormatter(cell, row, rowIndex) {
    // Return new object of processing keys that are set to true.
    const processingKeys = Object.keys(cell)
      .reduce((o, key) => {
        key.substring(0, 3) === 'pre' && cell[key] === true && (o[key] === cell[key]);
        return o;
      }, {});
    return (
      <ul style={{ listStyleType: 'none', paddingLeft: '5px' }} key={`${rowIndex}-params`}>
        <li key={`${rowIndex}-params-language`}>Language: {cell.language}</li>
        <li key={`${rowIndex}-params-n`}>N: {cell.n}</li>
        <li key={`${rowIndex}-params-distance`}>Distance Function: {cell.distanceFunction}</li>
        <li key={`${rowIndex}-params-unknown`}>Unkown Profile Size: {cell.profileUnknown}</li>
        <li key={`${rowIndex}-params-known`}>Known Profile Size: {cell.profileKnown}</li>
        <li key={`${rowIndex}-params-threshold`}>Threshold: {cell.threshold}</li>
        <li key={`${rowIndex}-params-pre`}>Preprocessing:

          <ul key={`${rowIndex}-processing`} style={{ paddingLeft: '15px' }}>
            {Object.keys(processingKeys).map(key =>
              <li key={`${rowIndex}-processing-${key}`} style={{ listStyleType: 'none' }}>{this.processingKeys[key]}</li>)}
          </ul>
        </li>
      </ul>
    );
  }

  render() {
    if (this.props.results === null || this.state.data.length < 1) {
      return null;
    }

    const columns = [{
      dataField: 'unknownFileName',
      text: 'Unknown Text',
    }, {
      dataField: 'knownFiles',
      text: 'Known Text',
      formatter: ResultTable.knownTextFormatter,
    }, {
      dataField: 'parameters',
      text: 'Parameters',
      formatter: this.parametersFormatter,
      headerStyle: (column, colIndex) => ({ width: '25%' }),
    }, {
      dataField: 'time',
      text: 'Time Run',
      sort: true,
      formatter: ResultTable.dateFormatter,
    }, {
      dataField: 'decision',
      text: 'Decision',
      formatter: cell => <div>{cell ? 'Yes' : 'No'}</div>,
      sort: true,
    }, {
      dataField: 'score',
      text: 'Score',
      sort: true,
    }];

    const defaultSorted = [{
      dataField: 'time',
      order: 'desc',
    }];

    return (
      <BootstrapTable
        keyField="id"
        data={this.state.data}
        striped
        hover
        condensed
        columns={columns}
        defaultSorted={defaultSorted}
      />
    );
  }
}

export default ResultTable;
