// ResultTable component for Researcher
// Show the list of parameters used and a download button for results in table
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import '../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { get } from '../../common/Request';

class ResultTableResearcher extends React.Component {
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

  constructor(props) {
    super(props);

    ResultTableResearcher.defaultProps = {
      results: null,
    };

    ResultTableResearcher.propTypes = {
      results: PropTypes.arrayOf(PropTypes.object),
    };

    this.state = {
      data: props.results,
      // data: [{resultId:"1234dffgggg","state":0,"size":30,"dataset":"pan13","_id":"5b7aa92ba028cda14a87ada4",
      //     "parameters":{"_id":"5b7aa92ba028cda14a87ada5","language":"English","nLow":3,"nHigh":7,
      //         "distanceFunction":"Cosine Similarity",
      //         "funcCosineSimilarity":true,"funcEuclideanDistance":true,"funcPearsonDistance":false,
      //         "funcKeseljDistance":false,"funcCanberraDistance":true,
      //         "profileKnownLow":111,"profileKnownHigh":150,
      //         "profileKnownStep":11,"profileUnknownLow":111,"profileUnknownHigh":151,
      //         "profileUnknownStep":11,
      //         "prePunctuation":true,"preNumbers":true,"preLowercase":false,"preAlphabet":false},
      //         "time":"2018-08-20T11:42:35.913Z"}]
    };

    this.state.data.forEach((obj) => {
      obj.output = { resultId: obj.resultId, state: obj.state };
    });

    this.processingKeys = {
      prePunctuation: 'Strip Punctuation',
      preNumbers: 'Strip Numbers',
      preLowercase: 'Lowercase',
      preAlphabet: 'Basic Alphabet',
    };

    autoBind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.results !== this.props.results) {
      this.props.results.forEach((obj) => {
        obj.output = { resultId: obj.resultId, state: obj.state };
      });
      this.setState({ data: this.props.results });
    }
  }

  parametersFormatter(cell, row, rowIndex) {
    // Return new object of processing keys that are set to true.
    const processingKeys = Object.keys(cell)
      .reduce((o, key) => {
        key.substring(0, 3) === 'pre' && cell[key] === true && (o[key] = cell[key]);
        return o;
      }, {});
    return (
      <ul style={{ listStyleType: 'none', paddingLeft: '5px' }} key={`${rowIndex}-params`}>
        <li key={`${rowIndex}-params-language`}>Language: {cell.language}</li>
        <li key={`${rowIndex}-params-nRange`}>N Range: [{cell.nLow}, {cell.nHigh}]</li>
        <li key={`${rowIndex}-params-distance`}>Distance Function: {cell.distanceFunction}</li>
        <li key={`${rowIndex}-params-unknown`}>
                    Unknown Profile Size Range: [{cell.profileSizeUnknownLow},
                    {cell.profileSizeUnknownHigh},
                     {cell.profileSizeUnknownStep}]
        </li>
        <li key={`${rowIndex}-params-known`}>
                    Known Profile Size Range: [{cell.profileSizeKnownLow},
                    {cell.profileSizeKnownHigh},
                     {cell.profileSizeKnownStep}]
        </li>
        <li key={`${rowIndex}-params-pre`}>Preprocessing:
                    <ul key={`${rowIndex}-processing`} style={{ paddingLeft: '15px' }}>
                      {Object.keys(processingKeys).map(key => <li key={key} style={{ listStyleType: 'none' }}>{this.processingKeys[key]}</li>)}
                    </ul>
        </li>
      </ul>
    );
  }

  outputFormatter(cell) {
    if (cell.state === 1) {
      return (
        <Button value={cell.resultId} onClick={this.handleDownload} bsStyle="primary" >
                    Ready to Download
        </Button>);
    } else if (cell.state === 0) {
      return (
        <Button bsStyle="info" bsSize="large" disabled>
                    Executing
        </Button>);
    }
    return (
      <Button bsStyle="danger" bsSize="large" disabled>
                    ERROR
      </Button>);
  }

  // handle the download button
  handleDownload(e) {
    const fileId = e.target.value;
    window.open(`/api/researcher/download/${fileId}`);
  }

  render() {
    if (this.props.results === null || this.state.data.length < 1) {
      return null;
    }

    const columns = [{
      dataField: 'dataset',
      text: 'Data Set',
    }, {
      dataField: 'size',
      text: 'Number of Authors',
    }, {
      dataField: 'parameters',
      text: 'Parameters',
      formatter: this.parametersFormatter,
      headerStyle: (column, colIndex) => ({ width: '25%' }),
    }, {
      dataField: 'time',
      text: 'Time Run',
      sort: true,
      formatter: ResultTableResearcher.dateFormatter,
    }, {
      dataField: 'output',
      text: 'Output',
      formatter: this.outputFormatter,
    }];

    const defaultSorted = [{
      dataField: 'time',
      order: 'desc',
    }];

    return (
      <BootstrapTable
        keyField="_id"
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

export default ResultTableResearcher;
