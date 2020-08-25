// KnownAuthor component
// Handles the known author part, including selecting one author, uploading known file
// and selecting known files for the author
import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import KnownText from '../inputs/KnownTextSection';
// import DropdownCustom from '../../common/DropdownCustom';
import StudentSelection from './StudentSelection';

export default class KnownAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
    };

    KnownAuthor.defaultProps = {
      allFiles: [],
    };

    KnownAuthor.propTypes = {
      selectFiles: PropTypes.func.isRequired,
      username: PropTypes.string.isRequired,
      allFiles: PropTypes.arrayOf(PropTypes.object),
      selectStudent: PropTypes.func.isRequired,
    };

    autoBind(this);
  }

  // Handle selecting the author in author dropdown list
  handleSelect(value) {
    this.setState({ author: value });
    this.props.selectStudent(value);
  }

  // Call parent's function to get all files under the studentS
  refreshFileList() {
    this.props.selectStudent(this.state.author);
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Known Texts by Student</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col md={8}>
                <StudentSelection
                  username={this.props.username}
                  selectStudent={this.handleSelect}
                />
              </Col>
            </Row>
            <br />
            <KnownText
              handleSelect={this.props.selectFiles}
              files={this.props.allFiles}
              username={this.props.username}
              studentEmail={this.state.author}
              refreshList={this.refreshFileList}
            />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
