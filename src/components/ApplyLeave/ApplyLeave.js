import React from 'react';
import moment from 'moment';
import axios from 'axios';
import {
    Form,
    Upload,
    Breadcrumb,
    Statistic,
    Table,
    Icon,
    Tag,
    Input,
    Col,
    Select,
    Row,
    Button,
    DatePicker,
    Modal
} from 'antd';
import './ApplyLeave.css';
const dateFormat = 'YYYY/MM/DD';
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const props = Upload;

const leave = [
    {
        key: '1',
        value: 'Sick Leave'
    },
    {
        key: '2',
        value: 'Casual Leave'
    },
    {
        key: '3',
        value: 'Vacation Leave'
    },
    {
        key: '4',
        value: 'Medical Leave'
    },
    {
        key: '5',
        value: 'Bereavement leave '
    },
]

class ApplyLeave extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveType: "Type of Leave",
            startDate: null,
            endDate: null,
            totalDays: null,
            reason: '',
            visible: false,
            data: [],
            // loading: true,
            // error: null
        }
        this.refreshgetAllLeaveType = this.refreshgetAllLeaveType.bind(this)
    }

    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
    };

    disabledDate = (current) => {
        return current && current < moment().startOf('day');
    };

    refreshgetAllLeaveType() {
        /* this.state.leaveType.splice(0, this.state.leaveType.length);
               getAllLeaveType().then((response) => {
                       for (let i = 0; i < response.length; i++) {
               
                           this.state.leaveType.push(<Option key={response[i].leaveTypeValue}>{response[i].leaveTypeValue}</Option>);
       
                       }
                       
                   });
       
                   console.log(this.state.leaveType);*/
    }

    componentDidMount() {
        this.refreshgetAllLeaveType();

    }

    componentDidUpdate(prevProps, prevState) {
        const { startDate, endDate } = this.state;
        if (startDate && endDate && (startDate !== prevState.startDate || endDate !== prevState.endDate)) {
            const totalDays = Math.round((endDate._d - startDate._d) / (1000 * 60 * 60 * 24));
            this.setState({ totalDays: totalDays });
        }
    }

    reasonHandler = (e) => {
        this.setState({ reason: e.target.value })
    }

    leaveTypeHandler = (value) => {
        this.setState({ leaveType: value })
    }

    clearField = () => {
        this.setState({
            leaveType: "Type of Leave",
            startDate: null,
            endDate: null,
            totalDays: null,
            reason: null,
        })
    }

    requireField = () => {
        const { startDate, endDate, totalDays, reason, leaveType } = this.state
        if (startDate === null || endDate === null || totalDays === null || reason === '' || leaveType === "Type of Leave") {
            this.setState({ visible: true });
        }
        else {
            const data = {
                emp_id: this.props.userInfo.emp_id,
                leave_type: this.state.leaveType,
                start_date: this.state.startDate !== null ? this.state.startDate._d : this.state.startDate,
                end_date: this.state.endDate !== null ? this.state.endDate._d : this.state.endDate,
                total_days: this.state.totalDays + 1,
                reason: this.state.reason,
                status: "pending",
                name: this.props.userInfo.name
            }

            const baseURL = "http://localhost:3001/empleave";
            axios.post(baseURL, data)
                .then((response) => {
                    console.log('empleave11--', response.data)
                    
                    // this.setState({ data: response.data, loading: false });
                    // this.setState({ data: response.data });
                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                    // this.setState({ error: error.message, loading: false });
                    this.setState({ error: error.message });
                });

            this.setState({
                leaveType: "Type of Leave",
                startDate: null,
                endDate: null,
                totalDays: null,
                reason: null,
            })
        }
    }


    componentDidMount() {
        axios.get(`http://localhost:3001/users-config-grid/${this.props.userInfo.emp_id}`)
            .then((response) => {
                this.setState({ data: response.data }, () => {
                    console.log('getempresponse', this.state.data);
                });

            })
            .catch(error => {
                console.log('error', error);
            });
    }

    handleRequestModel = () => {
        this.setState({ visible: false })

    }

    render() {

        const columns = [
            {
                title: 'From',
                dataIndex: 'start_date',
                key: 'start_date'
            },
            {
                title: 'To',
                dataIndex: 'end_date',
                key: 'end_date'
            },
            {
                title: 'Number of Days',
                dataIndex: 'total_days',
                key: 'total_days',
                align: 'center'
            },
            {
                title: 'Leave Type',
                dataIndex: 'leave_type',
                key: 'leave_type'

            },
            {
                title: 'Reason',
                dataIndex: 'reason',
                key: 'reason',
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: status => (
                    <span>
                        {status === 'pending' &&
                            <Tag color={"orange"} key={status}>
                                {status}
                            </Tag>
                        }
                    </span>

                ),
            },
        ];

        return (
            <React.Fragment>
                <Row>
                    <Col id="responsive-div1" span={16}>
                        <Breadcrumb
                            style={{
                                margin: '16px 0'
                            }}>
                            <Breadcrumb.Item>Leave Managment</Breadcrumb.Item>
                            <Breadcrumb.Item>Apply Leave</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 360,
                                marginRight: '20px'
                            }}>
                            <Row >
                                <Col span={24}>
                                    <InputGroup>
                                        <Row gutter={24}>
                                            <Col id="responsive-input1" span={6}>
                                                <Form.Item hasFeedback label="Start Date" layout='inline'>
                                                    <div>
                                                        <DatePicker
                                                            disabledDate={this.disabledDate}
                                                            onChange={this.handleStartDateChange}
                                                            format={dateFormat}
                                                            value={this.state.startDate} />

                                                    </div>
                                                </Form.Item>

                                            </Col>
                                            <Col id="responsive-input2" span={6}>
                                                <Form.Item hasFeedback label="End Date" layout='vertical'>
                                                    <div>
                                                        <DatePicker
                                                            disabledDate={this.disabledDate}
                                                            onChange={this.handleEndDateChange}
                                                            format={dateFormat}
                                                            value={this.state.endDate} />

                                                    </div>
                                                </Form.Item>

                                            </Col>
                                            <Col id="responsive-input3" span={6}>
                                                <Form.Item hasFeedback label="Number of Days" layout='vertical'>
                                                    <div>
                                                        <Input value={this.state.totalDays == null ? null : this.state.totalDays + 1} disabled />
                                                    </div>
                                                </Form.Item>

                                            </Col>
                                        </Row>
                                    </InputGroup>

                                    <InputGroup>
                                        <Row gutter={24}>
                                            <Col id="responsive-input4" span={12}>
                                                <Form.Item hasFeedback label="Select Leave Type" layout='vertical'>
                                                    <InputGroup compact>
                                                        <Select defaultValue="Type of Leave" value={this.state.leaveType} onChange={this.leaveTypeHandler}>
                                                            {
                                                                leave.map((type) => (
                                                                    <Option value={type.value}>{type.value} </Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </InputGroup>
                                                </Form.Item>
                                            </Col>

                                            <Col id="responsive-input5" span={12}>
                                                <Form.Item hasFeedback label="Attachments" layout='vertical'>
                                                    <div>
                                                        <Upload {...props}>
                                                            <Button>
                                                                <Icon type="upload" />
                                                                Click to Upload
                                                            </Button>
                                                        </Upload>

                                                    </div>
                                                </Form.Item>

                                            </Col>
                                        </Row>
                                    </InputGroup>

                                    <Form.Item hasFeedback label="Reason" layout='vertical'>

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

                                    </Form.Item>

                                    <Button type="primary" style={{ float: 'right' }} onClick={this.requireField}>Request</Button>
                                    <Button type="danger" style={{ float: 'right', marginRight: '10px' }} onClick={this.clearField}>Clear</Button>

                                </Col>
                            </Row>
                        </div>

                    </Col>

                    <Col id="responsive-div2" span={8}>

                        <Breadcrumb
                            style={{
                                margin: '16px 0'
                            }}>
                            <Breadcrumb.Item>Available Leave</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 50
                            }}>
                            <Row>
                                <Col span={8}>
                                    <Statistic title="Annuval" value={10} suffix="/ 10" />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Casual" value={5} suffix="/ 5" />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Medical" value={7} suffix="/ 7" />
                                </Col>
                            </Row>
                        </div>
                        <Breadcrumb
                            style={{
                                margin: '16px 0'
                            }}>
                            <Breadcrumb.Item>
                                Carry Forward Leave Request</Breadcrumb.Item>
                        </Breadcrumb>

                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 50,
                                marginTop: '20px'
                            }}>
                            <Row >
                                <Col span={24}>

                                    <Form.Item layout='vertical' label="Remaining days of Annual Leave">
                                        <div >
                                            <Input defaultValue="0" disabled />
                                        </div>
                                    </Form.Item>

                                    <Form.Item layout='vertical' label="Number of Leave to be Carry forwarded">
                                        <div >
                                            <Input defaultValue="0" />
                                        </div>
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        style={{
                                            float: 'right'
                                        }}>Submit</Button>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Leave History</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        background: '#fff',
                        minHeight: 360,
                        marginTop: '20px'
                    }}>
                    <Row >
                        <Col span={24}>
                            <Table columns={columns} dataSource={this.state.data} />
                        </Col>
                    </Row>
                </div>
                {this.state.visible && (
                    <Modal
                        visible={this.state.visible}
                        title="Basic Modal"
                        onOk={this.handleRequestModel}
                        onCancel={this.handleRequestModel}
                        footer={null}
                        centered
                    >
                        <p>ALL FIELDS ARE MANDATORY TO BE FILLED</p>
                    </Modal>)
                }


            </React.Fragment>
        );
    }


}

export default ApplyLeave;
