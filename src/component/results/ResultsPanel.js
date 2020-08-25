// ResultPane component
// For displaying the authorship verification results
import React from 'react';
import { Row, Col, ControlLabel, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultTable from './ResultTable';

const ResultsPanel = (props) => {
  ResultsPanel.defaultProps = {
    results: null,
  };

  ResultsPanel.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
  };

  return (
    <div className="results">
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Results</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Row>
            <Col md={2}>
              <ControlLabel>Verification Results for:</ControlLabel>
            </Col>
            <Col md={6}>
              {props.title}
            </Col>
          </Row>
          <ResultTable
            results={props.results}
          />
        </Panel.Body>
      </Panel>
    </div>
  );
};

export default ResultsPanel;
