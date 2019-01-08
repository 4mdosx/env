import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { debounce } from 'lodash'

import { Layout, Button, Input, message, Spin } from 'antd'
import ListView from 'rmc-list-view/lib'
import { PullToRefresh } from 'react-js-pull-to-refresh'

import Item from './TypeListItem'
import { PostLit } from '@src/models'

const { Content, Header } = Layout
const styleOfFeedHeader = {
  backgroundColor: '#fff', 
  height: '48px',
  lineHeight: '48px',
  borderBottom: '1px #ddd solid',
  padding: '0 10px'
}

export interface RecentlyFeedProps {
  style?: React.CSSProperties,
  activeID: string | null,
  mode: 'edit' | 'create' | 'unset'
  list: PostLit[],
  isLoading?: boolean
  isRefreshing?: boolean
  size: number,
  page: number,
  count: number,
  onCreate(): any,
  onRefresh(): any,
  onFetchMore(): any
  itemClickHandle(id: string, data: any): any
}

class RecentlyFeed extends React.Component<RecentlyFeedProps> {
  static defaultProps = {
    size: 15,
    isLoading: false,
    isRefreshing: false
  }

  state = {
    height: document.documentElement.clientHeight,
    queryKey: '',
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
    })
  }

  searchInput: any
  lv: React.ReactInstance

  handleSearch = debounce(
    () => {
    const { queryKey } = this.state
    if (queryKey && queryKey.length > 0) {
      message.error('搜索功能维护中...')
    } else {
      message.error('invalid input')
    }
    },
    1000
  )

  changeQuery = (e: React.SyntheticEvent<any>) => {
    const { value } = e.target as HTMLInputElement
    this.setState(
      {
        queryKey: value.length > 0 ? value : null
      }, 
      this.handleSearch
    )
  }

  renderItem = (rowData: any) => {
    return  (
      <Item 
        key={rowData.doc_id} 
        data={rowData} 
        active={rowData.doc_id === this.props.activeID}
        onClick={() => this.props.itemClickHandle(rowData.doc_id, rowData)} 
      />)
  }

  renderNewDocHolder = () => {
    if (this.props.mode === 'create') {
      return (
        <div className="type_post-item new active">
          <i className="statusBar" />
        </div>
      )
    } else {
      return null
    }
  }

  componentDidMount () {
    document.body.style.overflow = 'hidden'
    const dom = ReactDOM.findDOMNode(this.lv) as HTMLElement
    const hei = this.state.height - dom.offsetTop - 100 - (this.props.mode === 'create' ? 75 : 0)
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.list),
        height: hei
    })
  }

  componentWillReceiveProps (nextProps: any) {
      if (nextProps.list !== this.props.list) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
        })
      }
  }

  render() {
    return (
      <Layout style={this.props.style}>
        <Header style={styleOfFeedHeader}>
          <div style={{marginRight: '40px'}}>
            <Input 
              placeholder="Search Content" 
              onChange={this.changeQuery}
              onPressEnter={this.handleSearch}
            />
          </div>
          <div style={{position: 'absolute', top: '0', right: '10px'}}>
            <Button 
              shape="circle" 
              icon="edit"
              style={{border: 'none'}}
              onClick={this.props.onCreate}
            />
          </div>
        </Header>
        <Content>
          <PullToRefresh
            pullDownContent={
              <div style={{backgroundColor: 'rgba(0, 0, 0, .03)', height: '50px', textAlign: 'center'}}>
                Pull down to refresh
              </div>}
            releaseContent={
              <div style={{backgroundColor: 'rgba(0, 0, 0, .05)', height: '50px', textAlign: 'center'}}>
                Release to refresh
              </div>}
            refreshContent={
              <div 
                style={{backgroundColor: 'rgba(0, 0, 0, .05)', 
                  paddingTop: '10px', height: '50px', textAlign: 'center'}}
              >
                <Spin />
              </div>}
            pullDownThreshold={50}
            onRefresh={this.props.onRefresh}
          >
            <ListView 
              ref={el => this.lv = el}
              style={{height: this.state.height, marginTop: '5px', 
                boxShadow: '0 -2px 7px 0 rgba(0, 0, 0, .3)'}}
              contentContainerStyle={{width: '100%'}}
              pageSize={15}
              scrollRenderAheadDistance={400}
              dataSource={this.state.dataSource}
              renderRow={this.renderItem}
              renderHeader={this.renderNewDocHolder}
              renderFooter={
                () => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.props.isLoading ? '加载中...' : '...'}
                      </div>)}
              onEndReached={this.props.onFetchMore}
              onEndReachedThreshold={10}
            /> 
          </PullToRefresh>
        </Content>
      </Layout>
    )
  }
}

export default RecentlyFeed