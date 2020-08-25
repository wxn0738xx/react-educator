// Test suite for ConfirmTable component
import React from 'react';
import { shallow } from 'enzyme';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ConfirmTable from '../../common/ConfirmTable';

describe('ConfirmTable Component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<ConfirmTable />);
  });

  describe('Component is rendered', () => {
    it('should render the component without errors', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Children components are rendered properly', () => {
    it('should render the confirm table', () => {
      const table = wrapper.find(BootstrapTable);
      expect(table).toBeDefined();
      expect(table).toHaveLength(1);
    });

    it('should render the table columns', () => {
      const columns = wrapper.find(TableHeaderColumn);
      expect(columns).toBeDefined();
      expect(columns).toHaveLength(4);
    });

    it('should render an id column with name as id', () => {
      const columns = wrapper.find(TableHeaderColumn);
      const nameColumn = columns.filterWhere(c => c.props().dataField === 'name');
      expect(nameColumn.prop('isKey')).toEqual(true);
    });
  });
});
