/* Simplified Educator Page
This is the new, simplified educator page.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import StudentSelection from '../component/author/StudentSelection';
import { post } from '../common/Request';

class SimplifiedEducatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentEmail: "",
      allFiles: [],
      selectFiles: [],
    };
    SimplifiedEducatorPage.propTypes = {
      username: PropTypes.string.isRequired,
    };
    autoBind(this);
  }

  // Called by child component to update the selected known files
  updateKnownFiles(files) {
    this.setState({ selectFiles: files });
  }

  // On select author from the list, calls the api to fetch
  // files under the author
  selectStudent(student) {
    this.setState({ studentEmail: student });
    this.fetchFileList(student);
  }

  fetchFileList(student) {
    post('student/select', {
      username: this.props.username,
      studentEmail: student,
    }).then((res) => {
      this.setState({ allFiles: res.files });
    });
  }

  refreshFileList() {
    this.fetchFileList(this.state.studentEmail);
  }

  render() {
    return (
      <div>
        <br />
        <StudentSelection
          username={this.props.username}
          selectStudent={this.selectStudent}
        />
      </div>
    );
  }
}

export default SimplifiedEducatorPage;
