import React from 'react';
import { Breadcrumb, Table, Tag, Input } from 'antd';

const Search = Input.Search;

class ViewLeaveRequest extends React.Component {

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Start Date',
        dataIndex: 'sdate',
        key: 'date',
      },
      {
        title: 'End Date',
        dataIndex: 'edate',
        key: 'date',
      },
      {
        title: 'Number of Days',
        key: 'number',
        dataIndex: 'number',

      },
      {
        title: 'Leave Type',
        key: 'type',
        dataIndex: 'type',
      },
      {
        title: 'Reason',
        key: 'reason',
        dataIndex: 'reason',
      },
      {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag;
              if (tag === 'Pending') {
                color = 'orange';
              }
              else if (tag === 'Approved') {
                color = 'darkgreen';
              }
              else if (tag === 'Rejected') {
                color = 'darkred';
              }

              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        id: 'PSS066',
        sdate: '2019/05/21',
        edate: '2019/05/22',
        number: '2',
        reason: 'Medical',
        name: 'Karan',
        type: 'Medical',
        tags: ['Pending'],
      },
      {
        key: '2',
        id: 'PSS066',
        sdate: '2019/05/21',
        edate: '2019/05/23',
        number: '3',
        reason: 'Wedding',
        name: 'Sujeeban',
        type: 'Personal',
        tags: ['Approved'],
      },
      {
        key: '3',
        id: 'PSS066',
        sdate: '2019/05/21',
        edate: '2019/05/27',
        number: '7',
        reason: 'Trip',
        name: 'Keerthi',
        type: 'Personal',
        tags: ['Approved'],
      },
      {
        key: '4',
        id: 'PSS066',
        sdate: '2019/05/21',
        edate: '2019/05/27',
        number: '7',
        reason: 'Trip',
        name: 'Priyanka',
        type: 'Medical',
        tags: ['Rejected'],
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
          <Table columns={columns} dataSource={data} />

        </div>
      </React.Fragment>

    );
  }
}

export default ViewLeaveRequest;
