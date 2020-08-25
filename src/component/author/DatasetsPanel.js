// Datasets component
// Handles the known author part, including selecting one author, uploading known file
// and selecting known files for the author
import React from 'react';
import { Panel, ControlLabel, ButtonGroup, Row, Col } from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { post } from '../../common/Request';
import UploadZipModal from '../../common/UploadZipModal';
import InlineDropdownCustom from '../../common/DropdownCustom';

export default class Datasets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
    };

    Datasets.defaultProps = {
    };

    Datasets.propTypes = {
      username: PropTypes.string.isRequired,
      handleSelectDataset: PropTypes.func.isRequired,
    };

    autoBind(this);
  }

  // When the page was initialised, get the student list under the username
  componentDidMount() {
    this.fetchDatasets();
  }

  // Call the api to get the list of student
  fetchDatasets() {
    post('researcher/list', {
      username: this.props.username,
    }).then((res) => {
      this.setState({
        datasets: res.dataset,
      });
    });
  }


  // Handle selecting the author in author dropdown list
  handleSelect(value, e) {
    this.setState({
      [e.target.name]: value,
    });
    this.setState({ dataset: value }, () => { this.props.handleSelectDataset(value); });
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Dataset</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col md={2}>
                <ControlLabel>Dataset</ControlLabel>
              </Col>
              <Col md={2}>
                <ButtonGroup justified>
                  <InlineDropdownCustom
                    name="dataset"
                    value={this.state.dataset}
                    defaultLabel="Select Dataset"
                    id="author"
                    options={this.state.datasets}
                    handleSelect={this.handleSelect}
                  />
                </ButtonGroup>
              </Col>
              <Col md={2}>
                <UploadZipModal
                  username={this.props.username}
                  refreshList={this.fetchDatasets}
                />
              </Col>
            </Row>
            <br />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
