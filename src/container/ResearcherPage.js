// ResearcherPage
// This is the page for educator view, includes known text section, unkown section
// parameter section and result panel section
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Datasets from '../component/author/DatasetsPanel';
import ResearcherInputForm from '../component/inputs/ResearcherInputForm';
import ResultPanelResearcher from '../component/results/ResultPanelResearcher';
import { post } from '../common/Request';

class ResearcherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: null,
      results: [],
    };
    ResearcherPage.propTypes = {
      username: PropTypes.string.isRequired,
    };
    autoBind(this);
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults() {
    post('researcher/result', {
      username: this.props.username,
    }).then((res) => {
      if (!res.message) { // not an error response
        this.setState({
          results: res,
        });
      }
    });
  }

  // Called by dataset child component to update seleted dataset
  handleSelectDataset(data) {
    this.setState({ dataset: data });
  }

  // Required handle submit function to update the researcher result panel
  handleSubmit(event, resp) {
    if (resp.message === 'success') {
      this.fetchResults();
    }
    // TODO show alert that submission failed
  }

  render() {
    return (
      <div>
        <Datasets
          handleSelectDataset={this.handleSelectDataset}
          username={this.props.username}
        />
        <ResearcherInputForm
          handleSubmit={this.handleSubmit}
          username={this.props.username}
          dataset={this.state.dataset}
        />
        <ResultPanelResearcher
          show={this.state.results.length !== 0}
          results={this.state.results}
        />
      </div>
    );
  }
}

export default ResearcherPage;
