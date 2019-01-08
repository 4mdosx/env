import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { History } from 'history'
import { push, RouterAction } from 'react-router-redux'

import { Row, Col, Menu, Icon, Modal, Button, Badge } from 'antd'
import TransitionAvatar from '@src/components/gizmo/TransitionAvatar.tsx'

import { RootState } from '@src/reducer/root-reducer'
import '@src/style/headerBar.css'
const reactLogo = require('../assets/react-logo.svg')
const RxJSLogo = require('../assets/Rx_Logo_S.png')
const ReduxObableLogo = require('../assets/ReduxObMirror.png')
const ReduxLogo = require('@src/assets/redux.png')
const logoGroup = [{url: reactLogo, style: {height: '60px', width: '60px'}},
                   {url: RxJSLogo, style: {height: '40px', width: '40px'}},
                   {url: ReduxObableLogo, style: {height: '44px', width: '44px'}},
                   {url: ReduxLogo, style: {height: '40px', width: '40px'}}]
const crashMan = require('@src/assets/crash.png')
const fakeAvatar = require('@src/assets/techPriest.png')
const SubMenu = Menu.SubMenu

interface State {
  activeLogoIndex: number,
  toggleTimer: number | null,
  current: string,
  visible: boolean
}

interface HeaderBarProps {
  authUser: any,
  push(location: History.LocationDescriptor, state?: any): RouterAction
}

class HeaderBar extends React.Component<HeaderBarProps> {
  state: State = {
    activeLogoIndex: 0,
    toggleTimer: null,
    current: 'mail',
    visible: false
  }
  // props = {}
  componentDidMount () {
    this.state.toggleTimer = window.setInterval(
      () => {
      this.setState((function(prevState: State) {
        return {
          activeLogoIndex: prevState.activeLogoIndex === logoGroup.length - 1 ? 0 : prevState.activeLogoIndex + 1
        }
      }))},
      5000 * 1)
  }
  componentWillUnmount () {
    if (this.state.toggleTimer) {
      clearInterval(this.state.toggleTimer)
    }
  }
  handleClick = (e: any) => {
    if (e.key.slice(-4) === 'null') {
      this.setState({visible: true})
    }
    this.setState({
      current: e.key,
    })
  }
  render() {
    const hasLogin = this.props.authUser.u_id
    return (
      <div className="react-header-bar">
        <div className="logo-wrap">
          <img
            className="logo"
            src={logoGroup[this.state.activeLogoIndex].url}
            style={logoGroup[this.state.activeLogoIndex].style}
            alt=""
          />
        </div>
        <Row>
          <Col style={{ width: '14px', float: 'right'}} >
            <div onClick={() => {this.props.push('/agent')}}>
              <Badge status={hasLogin ? 'success' : 'error'} style={{cursor: 'pointer'}} />
            </div>
          </Col>
          <Col style={{ width: '120px', float: 'right'}}>
            <TransitionAvatar 
              style={{marginLeft: '10px', top: '10px', zIndex: 1000}}
              src={fakeAvatar} 
              imgHeight={500} 
              imgWidth={500} 
            />
          </Col>
          <Col style={{ width: '600px', float: 'right'}}>
          <Menu
            theme="dark"
            style={{paddingTop: '6px'}}
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <SubMenu 
              style={{float: 'right'}}
              title={<span><Icon type="code" />Quick move - Entrance</span>}
            >
              <Menu.Item key="entry:d:null">
                Dashboard
              </Menu.Item>
              <Menu.Item key="entry:app">
                <Link to={'/apps'}>ToolBox</Link>
              </Menu.Item>
              <Menu.Item key="entry:ua">
                <Link to={'/agent'}>UserAgent - Setting</Link>
              </Menu.Item>
              {/* <MenuItemGroup title="Markdown">
                <Menu.Item key="entry:markdown-n">
                  <Link to={'/md/notes/create'}>Notes - routine work</Link>
                </Menu.Item>
                <Menu.Item key="entry:markdown-s">
                  <Link to={'/md/series/wildcard/create'}> Series - topic about</Link>
                </Menu.Item>
              </MenuItemGroup>
              <Menu.Item key="entry:2:null">Consume log</Menu.Item>
              <Menu.Item key="entry:3:null">
                Armory <Icon type="api" /> 
              </Menu.Item> */}
            </SubMenu>
          </Menu>
          </Col>
        </Row>
        <Modal  
          bodyStyle={{background: `url(${crashMan}) center no-repeat`, height: '380px',
                      backgroundPosition: '-50px 20px'}}
          visible={this.state.visible}
          title="This module is under maintenance"
          onCancel={() => this.setState({visible: false})}
          footer={<Button type="primary" onClick={() => {this.setState({visible: false})}}>OK</Button>}
        >
          <p style={{marginTop: '25px', textAlign: 'center'}}>该页面暂不可用...</p>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  authUser: state.agent.auth as any
})

const mapDispatchToProps = {
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
