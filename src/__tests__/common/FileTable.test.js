// Test suite for FileTable component
import React from 'react';
import { mount } from 'enzyme';
// import { TableHeaderColumn } from 'react-bootstrap-table';
import FileTable from '../../common/FileTable';

// describe what we are testing
describe('FileTable component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      files: [
        {
          fileName: 'sample1.txt',
          time: '2000-5-5',
        },
        {
          fileName: 'sample2.txt',
          time: '2010-7-10',
        },
      ],
      handleSelect: () => 'sample text select',
    };
    wrapper = mount(<FileTable {...props} />);
  });
  describe('Component is rendered', () => {
    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('renders correct FileTable header', () => {
      expect(wrapper.find('TableHeaderColumn')).toHaveLength(2);
      expect(wrapper.find('TableHeaderColumn').at(0).props().dataField).toEqual('fileName');
      expect(wrapper.find('TableHeaderColumn').at(1).props().dataField).toEqual('time');
    });
  });

  describe('file-selecting function properly', () => {
    it('selects and unselects all files', () => {
      wrapper.setState({ selected: ['sample1.txt'] });
      wrapper.instance().onSelectAll(true);
      expect(wrapper.state('selected')).toEqual(['sample1.txt', 'sample2.txt']);
      wrapper.instance().onSelectAll(false);
      expect(wrapper.state('selected')).toEqual([]);
    });

    it('selects and unselects the specific file', () => {
      wrapper.setState({ selected: ['sample1.txt'] });
      wrapper.instance().onSelect({
        fileName: 'sample2.txt',
        time: '2010-7-10',
      }, true);
      expect(wrapper.state('selected')).toEqual(['sample1.txt', 'sample2.txt']);
      wrapper.instance().onSelect({
        fileName: 'sample1.txt',
        time: '2000-5-5',
      }, false);
      expect(wrapper.state('selected')).toEqual(['sample2.txt']);
    });

    it('auto select all files whenever new files are passed in', () => {
      wrapper.setProps({
        files: [
          {
            fileName: 'sample3.txt',
            time: '2003-5-5',
          },
          {
            fileName: 'sample4.txt',
            time: '2004-7-10',
          },
        ],
      });
      expect(wrapper.state('selected')).toEqual(['sample3.txt', 'sample4.txt']);
    });
  });
});
