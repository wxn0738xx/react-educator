// FileTable component
// Shows the list of files under one author
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

class FileTable extends React.Component {
  // Formatting the date
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

  // Formatting the size
  static sizeFormatter(cell) {
    return `${(cell / 1024).toFixed(2)}KB`;
  }

  constructor(props) {
    super(props);

    FileTable.defaultProps = {
      files: null,
    };

    FileTable.propTypes = {
      files: PropTypes.arrayOf(PropTypes.object),
      handleSelect: PropTypes.func.isRequired,
    };

    this.state = {
      selected: [],
    };

    autoBind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Automatically select all files whenever new files are passed in
    // (i.e. when a new author is selected)
    if (prevProps.files !== this.props.files) {
      this.onSelectAll(true);
    }

    // Passes the change in selected files up to parent (EducatorPage)
    if (prevState.selected !== this.state.selected) {
      this.props.handleSelect(this.state.selected);
    }
  }

  // Handles the state update required when select/unselect a single file
  onSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selected: [...this.state.selected, row.fileName] });
    } else {
      this.setState({ selected: this.state.selected.filter(it => it !== row.fileName) });
    }
  }

  // Handles the state update required when select/unselect all files
  onSelectAll(isSelected) {
    if (isSelected) {
      this.setState({ selected: this.props.files.map(row => row.fileName) });
    } else {
      this.setState({ selected: [] });
    }
  }

  render() {
    // Define select actions for table row(s)
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.onSelect,
      onSelectAll: this.onSelectAll,
      selected: this.state.selected,
    };

    return (
      <div>
        <BootstrapTable
          data={this.props.files}
          selectRow={selectRow}
          striped
          hover
          condensed
          height="200"
          scrollTop="Top"
        >
          <TableHeaderColumn
            dataField="fileName"
            isKey
            dataSort
          >File Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="time"
            dataSort
            dataFormat={FileTable.dateFormatter}
          >Last Modified
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default FileTable;
