import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { RootState } from '@src/reducer'
// connected comps
import HeaderBar from './HeaderBar'
import AppType from './AppType'
// public comps
import { Layout } from 'antd'
import Menu from '@src/components/menu/AppList'
const { Side: SideMenu } = Menu
const { Header, Content } = Layout

const config = {
  menuList: [{
    name: 'Type|tīp|',
    icon: 'file',
    link: '/apps/type'
  },
  {
    name: 'Image Hosting',
    icon: 'meh',
    link: '/apps/ihosting'
  },
  {
    name: 'DragLink',
    icon: 'switcher',
    children: [{
      name: 'demo1',
      icon: 'file'
    }]
  }]
}

interface State {
  
}

export interface AppCollectionProps {
  users: any,
  match: any
}

class AppCollection extends React.Component<AppCollectionProps, State> {
  state: State = {
    count: 0,
  }
  render() {
    return (
      <Layout className="fullPage">
        <Header className="header" style={{  }}>
          <HeaderBar />
        </Header>
        <Content>
          <Layout style={{ minHeight: 'calc(100vh - 60px)' }}>
            <SideMenu content={config.menuList} />
            <Switch>
              {/* <Route path={`${this.props.match.path}/type`} component={AppType} /> */}
              <Route component={AppType} />
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
})

const mapDispatchToProps = {
  // loadUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppCollection))
