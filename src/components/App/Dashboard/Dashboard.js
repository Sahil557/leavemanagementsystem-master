import React from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Statistic, Icon } from 'antd';
import './Dashboard.css';
const { Content, Footer, } = Layout;

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div style={{ marginLeft: '20px', padding: 24, background: '#fff', minHeight: 30, width: 450, background: 'pink' }}>
          {/* <span style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}> */}
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', justifyContent: 'start' }}>
              <Icon style={{marginTop: '12px', marginRight: '13px', fontSize: '34px'}} type="usergroup-add" />
              <Statistic title="Total" value={'Staff'} />
            </span>
            <span style={{marginTop: '12px'}}>
              <Statistic value={60} />
            </span>
          </span>
          {/* <br/>
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', justifyContent: 'start' }}>
              <Icon style={{marginTop: '12px', marginRight: '13px', fontSize: '34px'}} type="usergroup-add" />
              <Statistic title="Total" value={'Staff'} />
            </span>
            <span style={{marginTop: '12px'}}>
              <Statistic value={60} />
            </span>
          </span> */}
        </div>
        <Footer
          style={{
            textAlign: 'center'
          }}>
          Hey user
        </Footer>
      </>

    );

  }
}

function mapStateToProps(state) {
  return {
    user: state.activeUser
  }
}
export default connect(mapStateToProps)(Dashboard);