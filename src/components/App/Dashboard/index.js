import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Row, Col, Statistic, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom'
import ApplyLeave from '../../ApplyLeave/ApplyLeave';
import CarryForwardRequest from '../../../CarryForwardRequest';
import LeaveCancelRequest from '../../../LeaveCancelRequest';
import LeaveHistory from '../../../LeaveHistory';
import ViewCalendar from '../../ViewCalendar/ViewCalendar';
import ViewLeaveRequest from '../../../ViewLeaveRequest';
// import Login from '../../Authentication/Login';
import SignUp from '../../Authentication/Signup';
import ForgotPassword from '../../Authentication/ForgetPassword';
import HeaderComponent from '../HeaderComponent';
import SiderComponent from '../SiderComponent';
import './index.css';
const { Content, Footer, } = Layout;

class Dashboard extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <Route path="/"><Login /></Route> */}
        <Route path="/"><SiderComponent /></Route>
        <Layout><Route path="/"><HeaderComponent /></Route>
          <Content style={{ margin: '24px 16px 0' }}>
            <Switch>
              <Route path='/dashboard/signup' component={SignUp} />
              <Route path='/dashboard/forgotpass' component={ForgotPassword} />
              <Route path='/dashboard/applyleave'><ApplyLeave /></Route>
              <Route path='/dashboard/carryforwardrequest' component={CarryForwardRequest} />
              <Route path='/dashboard/leavecancelrequest' component={LeaveCancelRequest} />
              <Route path='/dashboard/leavehistory' component={LeaveHistory} />
              <Route path='/dashboard/viewcalendar' component={ViewCalendar} />
              <Route path='/dashboard/viewleaverequest' component={ViewLeaveRequest} />
            </Switch>
          </Content>
          {/* <div style={{ marginLeft: '20px', padding: 24, background: '#fff', minHeight: 50, width: 450, background: 'pink' }}>
            <span style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <Icon style={{ fontSize: '34px' }} type="usergroup-add" />
              <Statistic title="Total" value={'Staff'} />
              <Statistic value={60} />
            </span>
          </div>
          <Footer
            style={{
              textAlign: 'center'
            }}>
            Human Resource Management System ©2018 Created by SGIC
          </Footer> */}
        </Layout>
     </Layout>

    );

  }
}
function mapStateToProps(state) {
  return {
    user: state.activeUser
  }
}
export default connect(mapStateToProps)(Dashboard);