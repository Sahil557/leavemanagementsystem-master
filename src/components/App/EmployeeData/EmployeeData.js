import React, { useState } from 'react';
import { Table, Icon, Switch, Radio, Form } from 'antd';

const FormItem = Form.Item;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: text => <a href="/">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 70,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
  },
  {
    title: 'Action',
    key: 'action',
    width: 360,
    render: (text, record) => (
      <span>
        <a href="/">Action 一 {record.name}</a>
        <span className="ant-divider" />
        <a href="/">Delete</a>
        <span className="ant-divider" />
        <a href="/" className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    ),
  },
];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const showHeader = true;
const scroll = { y: 240 };

export const EmployeeData = () => {
  const [state, setState] = useState({
    bordered: false,
    pagination: true,
    size: 'default',
    showHeader,
    rowSelection: {},
    scroll: undefined,
  });

  const handleToggle = (prop) => (enable) => {
    setState({ ...state, [prop]: enable });
  };

  const handleSizeChange = (e) => {
    setState({ ...state, size: e.target.value });
  };

  const handleRowSelectionChange = (enable) => {
    setState({ ...state, rowSelection: enable ? {} : undefined });
  };

  const handleScollChange = (enable) => {
    setState({ ...state, scroll: enable ? scroll : undefined });
  };

  return (
    <div>
      <div className="components-table-demo-control-bar">
        <Form layout="inline">
          <FormItem label="Bordered">
            <Switch checked={state.bordered} onChange={handleToggle('bordered')} />
          </FormItem>
          <FormItem label="Pagination">
            <Switch checked={state.pagination} onChange={handleToggle('pagination')} />
          </FormItem>
          <FormItem label="Checkbox">
            <Switch checked={!!state.rowSelection} onChange={handleRowSelectionChange} />
          </FormItem>
          <FormItem label="Fixed Header">
            <Switch checked={!!state.scroll} onChange={handleScollChange} />
          </FormItem>
          <FormItem label="Size">
            <Radio.Group size="default" value={state.size} onChange={handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </FormItem>
        </Form>
      </div>
      <Table {...state} columns={columns} dataSource={data} />
    </div>
  );
};
