import React from 'react';
import axios from 'axios';
import { Breadcrumb, Table, Tag, Input } from 'antd';

const Search = Input.Search;

class ViewLeaveRequest extends React.Component {

  constructor() {
    super()
    this.state = {
      data: []
    }
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
          <Table columns={columns} dataSource={this.state.data} />

        </div>
      </React.Fragment>

    );
  }
}

export default ViewLeaveRequest;
