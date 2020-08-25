// ConfirmTable component
// For showing files in a table for upload, with the ability to delect selected file
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

class ConfirmTable extends React.Component {
  // Formatter for Date and size in table
  static dateFormatter(cell) {
    const date = new Date(cell).toDateString();
    return date;
  }

  static sizeFormatter(cell) {
    return `${(cell / 1024).toFixed(2)}KB`;
  }

  constructor(props) {
    super(props);

    ConfirmTable.defaultProps = {
      files: null,
      handleDeleteButtonClick: null,
    };

    ConfirmTable.propTypes = {
      files: PropTypes.arrayOf(PropTypes.object),
      handleDeleteButtonClick: PropTypes.func,
    };

    this.state = {
      data: props.files,
    };

    autoBind(this);
  }

  // Update the component state on parent component's update
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.files,
    });
  }

  // The delete button
  createCustomDeleteButton = () => (
    <DeleteButton
      btnText="Delete"
      btnContextual="btn-warning"
    />
  )

  render() {
    const options = {
      deleteBtn: this.createCustomDeleteButton,
      onDeleteRow: this.props.handleDeleteButtonClick,
    };
    const selectRow = {
      mode: 'checkbox',
    };

    return (
      <div>
        <Row><Col md={12}><br /></Col></Row>
        <BootstrapTable
          selectRow={selectRow}
          options={options}
          data={this.state.data}
          striped
          hover
          condensed
          deleteRow
        >
          <TableHeaderColumn
            dataField="name"
            isKey
          >File Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width="100"
            dataField="type"
          >File Type
          </TableHeaderColumn>
          <TableHeaderColumn
            width="150"
            dataField="lastModifiedDate"
            dataFormat={ConfirmTable.dateFormatter}
          >Last Modified
          </TableHeaderColumn>
          <TableHeaderColumn
            width="70"
            dataField="size"
            dataFormat={ConfirmTable.sizeFormatter}
          >Size
          </TableHeaderColumn>
        </BootstrapTable>
        <Row><Col md={12}><br /></Col></Row>
      </div>
    );
  }
}

export default ConfirmTable;
