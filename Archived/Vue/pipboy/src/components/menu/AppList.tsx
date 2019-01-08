import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

export interface SideProps {
  content: MenuListItem[],
  defaultSelectedKeys?: string[],
  theme?: 'dark' | 'light' | undefined
}

export interface MenuListItem {
  name: string,
  icon: string,
  link?: string,
  children?: MenuListItem[],
  className?: string
}

class Side extends React.Component<SideProps> {
  static defaultProps = {
    theme: 'dark',
    defaultSelectedKeys: ['0']
  }
  state = {
    collapsed: false,
  }
  constructor (props: SideProps) {
    super(props)
  }
  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed })
  }
  clickOnNoLink = (name: string, args?: any) => {
    // console.log('click' + name)
  }
  linkWrapper = (item: MenuListItem, prefix?: JSX.Element, backfix?: JSX.Element) => {
    const itemName = this.state.collapsed ? null : item.name
    if (item.link) {
      return <Link to={item.link || ''}><span>{prefix}{itemName}{backfix}</span></Link>
    } else {
      return <span onClick={(args) => this.clickOnNoLink(item.name, args)}>{prefix}{itemName}{backfix}</span>
    }
  }
  render() {
    let subCount = 0
    const MenuItems = this.props.content.map((itemProps, index) => {
      let itemContent
      if (itemProps.children) {
        itemContent = (
          <SubMenu
            className={itemProps.className}
            key={'sub' + ++subCount}
            title={<span><Icon type={itemProps.icon} /><span>{itemProps.name}</span></span>}
          >
           {
              itemProps.children.map((childrenProp, cindex) => (
                <Menu.Item key={`${index}-${cindex}`}>{this.linkWrapper(childrenProp)}</Menu.Item>
              ))
            }
          </SubMenu>
        )
      } else {
        itemContent = (
          <Menu.Item 
            className={itemProps.className}
            key={`${index}`}
          >
            {this.linkWrapper(itemProps, <Icon type={itemProps.icon} />)}
          </Menu.Item>
        )
      }
      return itemContent
    })

    return (
      <Sider 
        collapsible={true}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu 
          mode="inline"
          {...this.props}
        >
          {MenuItems}
        </Menu>
      </Sider>
    )
  }
}

export default {
  Side
}