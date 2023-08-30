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
import HeaderComponent from '../HeaderComponent';
import SiderComponent from '../SiderComponent';
import SignUp from '../../Authentication/Signup';
import ForgotPassword from '../../Authentication/ForgetPassword';
import './RoutesPath.css';
import Dashboard from '../Dashboard/Dashboard';
// import Login from '../../Authentication/Login'
import { EmployeeData } from '../EmployeeData/EmployeeData';

const { Content, Footer, } = Layout;

class RoutesPath extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Route path="/">
          <SiderComponent userInfo={this.props.userInfo} isAdmin={this.props.isAdmin} />
        </Route>
        <Layout>
          <Route path="/">
            <HeaderComponent />
          </Route>
          <Content style={{ margin: '24px 16px 0' }}>
            <Switch>
              <Route path='/dashboard'><Dashboard isNotificationMessage={this.props.isNotificationMessage} isAdmin={this.props.isAdmin} userInfo={this.props.userInfo} /></Route>
              <Route path='/signup' component={SignUp} />
              <Route path='/forgotpass' component={ForgotPassword} />
              <Route path='/applyleave'><ApplyLeave userInfo={this.props.userInfo} isAdmin={this.props.isAdmin} /></Route>
              <Route path='/carryforwardrequest' component={CarryForwardRequest} />
              <Route path='/leavecancelrequest' component={LeaveCancelRequest} />
              <Route path='/leavehistory' component={LeaveHistory} />
              <Route path='/viewcalendar' component={ViewCalendar} />
              <Route path='/viewleaverequest' render={(props) => <ViewLeaveRequest isAdmin={this.props.isAdmin} />} />
              <Route path='/employees' render={(props) => <EmployeeData/>}/>
            </Switch>
          </Content>
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
export default connect(mapStateToProps)(RoutesPath);