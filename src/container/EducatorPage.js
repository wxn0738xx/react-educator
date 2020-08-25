// EducatorPage
// This is the page for educator view, includes known text section, unkown section
// parameter section and result panel section
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import ResultsPanel from '../component/results/ResultsPanel';
import EducatorInputForm from '../component/inputs/EducatorInputForm';
import Unknown from '../component/inputs/UnknownTextPanel';
import KnownAuthor from '../component/author/KnownAuthorPanel';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { post } from '../common/Request';

class EducatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFiles: [],
      unknownFile: null,
      selectFiles: [],
      results: [],
      studentEmail: '',
      showResults: false,
    };
    EducatorPage.propTypes = {
      username: PropTypes.string.isRequired,
    };
    autoBind(this);
  }

  // Called by child component to get the unknown file
  getUnknownFile(files) {
    this.setState({ unknownFile: files[0] });
    this.title = files[0].name;
  }

  // Called by child component to update the selected known files
  updateKnownFiles(files) {
    this.setState({ selectFiles: files });
  }

  // On select author from the list, calls the api to fetch
  // files under the author
  selectStudent(student) {
    this.setState({ studentEmail: student });
    this.setState({ allFiles: [] });
    post('student/select', {
      username: this.props.username,
      studentEmail: student,
    }).then((res) => {
      this.setState({ allFiles: res.files });
      this.setState({ results: res.results });
      this.setState({ showResults: true });
    });
  }

  // Called by child component to update the result panel
  handleSubmit(event, resp) {
    this.setState({ results: resp });
    this.setState({ showResults: true });
  }

  render() {
    return (
      <div>
        <KnownAuthor
          selectFiles={this.updateKnownFiles}
          username={this.props.username}
          allFiles={this.state.allFiles}
          selectStudent={this.selectStudent}
        />
        <Unknown getUnknownFile={this.getUnknownFile} />
        <EducatorInputForm
          handleSubmit={this.handleSubmit}
          unknownFile={this.state.unknownFile}
          knownFiles={this.state.selectFiles}
          username={this.props.username}
          studentEmail={this.state.studentEmail}
        />
        <ResultsPanel
          show={this.state.showResults}
          title={this.state.studentEmail}
          results={this.state.results}
        />
      </div>
    );
  }
}

export default EducatorPage;
