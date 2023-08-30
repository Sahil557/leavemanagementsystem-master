import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Menu, Icon, Avatar} from 'antd';
import {Link} from 'react-router-dom'

  const { Sider,} = Layout;
  const SubMenu = Menu.SubMenu;
  
  class SiderComponent extends React.Component {

    constructor(props){
        super(props)
      }

    logout = () =>{

    }
    render() {
      return (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.props.sidebar.isCollapsed}
                    width={240}
                    onBreakpoint={broken => {
                        console.log(broken);}}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);}} 
                    style={{
                      background: '#fff'
                    }}>
                    <div className="logo"><a href="/">LMS</a></div>
                    <br></br>
                    <div className="container-avatar"><Avatar size="large" icon="user"/>
                        {!this.props.isAdmin ? 
                        <p style={{display: this.props.sidebar.isCollapsed ? 'none' : 'block'}}>{this.props.userInfo.name}</p>:
                        <p style={{display: this.props.sidebar.isCollapsed ? 'none' : 'block'}}>Admin</p>
                        }
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}>
                        <Menu.Item key="1">
                            <Icon type="pie-chart"/>
                            <span>Dashboard</span>
                            <Link to='/dashboard'>Dashboard</Link>
                        </Menu.Item>
                            {!this.props.isAdmin &&
                            <SubMenu
                            key="sub1"
                            title={<span><Icon type="project"/><span>Leave Management</span></span >}>
                            <Menu.Item key="2">
                                <Link to='/applyleave'>Apply Leave</Link>
                            </Menu.Item>
                            
                            <Menu.Item key="3" disabled>
                                <Link to='/viewcalendar'>View Calendar</Link>
                            </Menu.Item>
                            <Menu.Item key="4" disabled>
                                <Link to='/leavehistory'>Leave history</Link>
                            </Menu.Item>
                            <Menu.Item key="5" disabled>
                                <Link to='/leavecancelrequest'>Leave cancel request</Link>
                            </Menu.Item>
                            <Menu.Item key="6" disabled>
                                <Link to='/carryforwardrequest'>Carry forward request</Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to='/viewleaverequest'>View leave request</Link>
                            </Menu.Item>
                            </SubMenu>
                            } 
                            {this.props.isAdmin &&
                            <SubMenu
                            key="sub1"
                            title={<span><Icon type="project"/><span>Leave Management</span></span >}>
                            <Menu.Item key="8">
                                <Link to='/viewleaverequest'>View leave request</Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to='/employees'>Employees</Link>
                            </Menu.Item>
                            </SubMenu>
                            }

                        <Menu.Item key="10" disabled>
                            <Icon type="setting"/>
                            <span>Setting</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

              
         
      );

    }
  }
  

   function mapStateToProps(state) {
       return {
           sidebar: state.isCollapsed
       }
   }

  export default connect(mapStateToProps)(SiderComponent);

 