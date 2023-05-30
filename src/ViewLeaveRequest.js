import React from 'react';
import axios from 'axios';
import { Breadcrumb, Table, Tag, Input, Modal, Button } from 'antd';
// import type { MenuProps } from 'antd';  

import { Select } from 'antd';
import { Divider } from 'antd/lib';

const { Option } = Select;

const Search = Input.Search;
const { TextArea } = Input;

class ViewLeaveRequest extends React.Component {

  constructor() {
    super()
    this.state = {
      data: [],
      visible: false,
      selectedRow: null,
    }
  }

  handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    debugger;
    axios.get(`http://localhost:3001/users-config-grid/admin`)
      .then((response) => {
        this.setState({ data: response.data })
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleRowClick = (record) => {
    console.log('Clicked row:', record);
    this.setState({
      visible: true, // Show the modal
      selectedRow: record, // Store the selected row data
    });
  };

  handleModalClose = () => {
    this.setState({
      visible: false, // Hide the modal
      selectedRow: null, // Clear the selected row data
    });
  };



  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'emp_id',
        key: 'emp_id',

      },
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Start Date',
        dataIndex: 'start_date',
        key: 'start_date',
      },
      {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'end_date',
      },
      {
        title: 'Number of Days',
        key: 'total_days',
        dataIndex: 'total_days',
        align: 'center'
      },
      {
        title: 'Leave Type',
        key: 'leave_type',
        dataIndex: 'leave_type',
      },
      {
        title: 'Reason',
        key: 'reason',
        dataIndex: 'reason',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => (
          <span>
            {status === 'pending' ?
              <Tag color={"orange"} key={status}>
                {status}
              </Tag> :
              status === 'approved' ?
                <Tag color={"darkgreen"} key={status}>
                  {status}
                </Tag> :
                <Tag color={"darkred"} key={status}>
                  {status}
                </Tag>}
          </span>
        ),
      },

    ];

    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
          <Breadcrumb.Item>View Request</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Search placeholder="Search..." onSearch={value => console.log(value)} style={{ width: 200 }} />
          <br></br>
          <br></br>
          <Table columns={columns} dataSource={this.state.data} rowKey="emp_id" onRow={(record) => ({
            onClick: () => this.handleRowClick(record),

          })} />

        </div>
        <Modal
          visible={this.state.visible}
          title={this.state.selectedRow ? <b>{this.state.selectedRow.name} ({this.state.selectedRow.emp_id})</b> : ''}
          onCancel={this.handleModalClose}
          footer={null}
          centered
        >
          {this.state.selectedRow ?
            <>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><b>To :</b></span>
                <span>{this.state.selectedRow.start_date}</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><b>From :</b></span>
                <span>{this.state.selectedRow.end_date}</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><b>Total Days :</b></span>
                <span>{this.state.selectedRow.total_days}</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between'}}>
                <span><b>Leave Type :</b></span>
                <span>{this.state.selectedRow.leave_type}</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><b>Reason :</b></span>
                <span>{this.state.selectedRow.reason}</span>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><b>Status :</b></span>
                <Select defaultValue={this.state.selectedRow.status} onChange={this.handleChange}>
                  {/* <Option value="default" disabled>Select an option</Option> */}
                  <Option value="option1">{this.state.selectedRow.status}</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select>
              </p>
              <div
                style={{
                    margin: '24px 0'
                }}>
                <TextArea
                    value={this.state.reason}
                    onChange={this.reasonHandler}
                    placeholder="Reason"
                    autosize={{
                        minRows: 2,
                        maxRows: 8
                    }} />
              </div>
                <Divider/>
              <div style={{overflow: 'auto'}}>
              <Button type="primary" style={{ float: 'right' }} >Submit</Button>
              </div>
            </> :
            ''}
        </Modal>
      </React.Fragment>

    );
  }
}

export default ViewLeaveRequest;
