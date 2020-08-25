// ResultPanel component for Researcher
// For displaying the batch testing results for researcher
import React from 'react';
import { Row, Col, ControlLabel, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ResultTableResearcher from "./ResultTableResearcher";

const ResultPanelResearcher = (props) => {
    ResultPanelResearcher.defaultProps = {
        results: null,
    };

    ResultPanelResearcher.propTypes = {
        results: PropTypes.arrayOf(PropTypes.object),
    };

    return (
        <div className="researcherResults">
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Results</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col md={2}>
                            <ControlLabel>Batch Testing Result:</ControlLabel>
                        </Col>
                    </Row>
                    <ResultTableResearcher
                        results={props.results}
                    />
                </Panel.Body>
            </Panel>
        </div>
    );
};

export default ResultPanelResearcher;
