// KnownAuthor component
// Handles the known author part, including selecting one author, uploading known file
// and selecting known files for the author
import React from 'react';
import { ControlLabel, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { post } from '../../common/Request';
import AddAuthorModal from './AddAuthorModal';
import DropdownCustom from '../../common/DropdownCustom';

export default class StudentSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      students: [],
      author: '',
    };

    StudentSelection.propTypes = {
      username: PropTypes.string.isRequired,
      selectStudent: PropTypes.func.isRequired,
    };

    autoBind(this);
  }

  // When the page was initialised, get the student list under the username
  componentDidMount() {
    this.fetchStudents();
  }

  // Call the api to get the list of student
  fetchStudents() {
    post('student/list', {
      username: this.props.username,
    }).then((res) => {
      if (res.students) {
        this.setState({
          students: res.students,
        });
      }
    });
  }

  // Handle show and close of popup for creating new author
  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  // Handle selecting the author in author dropdown list
  handleSelect(value) {
    this.setState({ author: value[0] });
    this.props.selectStudent(value[0]);
  }

  // New author succesfully added, force refresh list and default select the newly added author
  handleAddAuthor(newAuthor) {
    this.fetchStudents();
    this.setState({ author: newAuthor });
    this.props.selectStudent(newAuthor);
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={2}>
            <ControlLabel>Student:</ControlLabel>
          </Col>
          <Col md={2}>
            <ButtonGroup justified>
              <DropdownCustom
                name="author"
                value={this.state.author}
                defaultLabel="Select Student"
                id="author"
                options={this.state.students}
                handleSelect={this.handleSelect}
                isSearchable
              />
            </ButtonGroup>
          </Col>
          <Col md={2}>
            <Button className="addAuthorButton" onClick={this.handleShow}>
              Add New Student
            </Button>
          </Col>
        </Row>
        <br />
        <AddAuthorModal
          username={this.props.username}
          show={this.state.show}
          onHide={this.handleClose}
          handleAddAuthor={this.handleAddAuthor}
        />
      </div>
    );
  }
}
