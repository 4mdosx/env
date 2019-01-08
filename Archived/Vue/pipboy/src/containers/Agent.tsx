import * as React from 'react'
import { connect } from 'react-redux'

import { RootState, RootAction } from '@src/reducer'

import { actionCreators, State } from '@src/reducer/agent'
// actionCreators
import { Layout, Row, Col, Card, Button, Spin, notification } from 'antd'
// notification, message Spin

import HeaderBar from './HeaderBar'
import Agent_auth from '@src/components/form/Agent_auth'
import Agent_profile from '@src/components/form/Agent_profile'
import Agent_safe from '@src/components/form/Agent_safe'

import * as API from '@src/service/api.v1'
const { Header, Content } = Layout

const FormGrid = {xs: 24, md: 12, lg: 8 }
const RowWidthLimit = {maxWidth: '1080px', margin: '0 auto'}

export interface AgentSettingProps {
  verifedUser: State['auth'],
  privacyForm: State['privacy'],
  changeForm: () => RootAction
  updateAuth: (auth: any) => RootAction
  reset: () => RootAction
}

class AgentSetting extends React.Component<AgentSettingProps> {
  state = {
    authLoading: false,
    noMoreHelp: false
  }
  
  submitAuthFrom = async (formData: any) => {
    if (this.state.authLoading) {
      notification.open({
        message: '操作过快，请等待响应....',
        description: '...',
      })
    } else {
      this.setState({ authLoading: true })
      const { data, headers } = await API.requestAuth(formData)
      this.setState({ authLoading: false})
      if (data.error) {
        notification.open({
          message: headers.status,
          description: data.message,
        })
      } else {
        this.props.updateAuth(data)
        API.keepFreshing()
      }
    }
  }

  clearAuth = async () => {
    this.props.reset()
    API.requestAuth()
  }

  toggleNoMore = () => {
    this.setState({
      noMoreHelp: !this.state.noMoreHelp
    })
  }

  render() {
    const sameHeight = {height: '240px'}
    return (
      <Layout className="fullPage">
        <Header className="header" >
          <HeaderBar />
        </Header>
        <Content>
          <div className="headerBottomMarginFix" />
          <Row style={RowWidthLimit}>
            <Col {...FormGrid}>
              <Card hoverable={true}>
                <Spin spinning={this.state.authLoading}>
                  <div style={sameHeight}>
                    {this.props.verifedUser.u_id ?
                      (<Agent_profile {...this.props.verifedUser} onLogout={this.clearAuth}/>) : 
                      (<Agent_auth onSubmit={this.submitAuthFrom} />)
                    }
                  </div>
                </Spin>
              </Card>
            </Col>
            <Col {...FormGrid}>
              <Card hoverable={true}>
                <div style={sameHeight}>
                  <Agent_safe {...this.props.privacyForm} onSubmit={this.props.changeForm} />
                </div>
              </Card>
            </Col>
            <Col {...FormGrid}>
              <Card hoverable={true}>
                <div style={{...sameHeight, textAlign: 'center', padding: '100px 0'}}>
                  <Button type="primary" shape="circle" icon="ellipsis" onClick={this.toggleNoMore} />
                  {this.state.noMoreHelp ? (<p>No something more...</p>) : null}
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>)
    }
}

const mapStateToProps = (state: RootState) => ({
  verifedUser: state.agent.auth,
  privacyForm: state.agent.privacy
})

const mapDispatchToProps = {
  changeForm: actionCreators.merge_setting,
  updateAuth: actionCreators.update_agent,
  reset: actionCreators.reset_agent
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentSetting as any)
