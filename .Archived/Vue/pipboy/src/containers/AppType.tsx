import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../reducer/root-reducer'

import { urlQuery } from '@src/utils/format'
import { Layout, Spin, message, notification } from 'antd'

import RCFeed from '@src/components/type/RecentlyFeed'
import TagPicker from '@src/components/type/TagPicker'
import Editor from '@src/components/type/EditorWrapper'
import ToolBar from '@src/components/type/ToolBar'

import * as API from '@src/service/api.v1'
import { PostLit } from '@src/models'
const { Sider, Content } = Layout

export interface TypeProps {
  authUserId: string
}

export interface TypeListView {
  list: PostLit[],
  size: number,
  page: number,
  count: number
}

export interface Document {
  content: string | null,
  title: string | null,
  uri_name: string | null,
  tag: any[]
}

export interface TypeState {
  listView: TypeListView
  query: {
    key: string | null
    tag: string | null
    user: string | null
    page: number
    size: number
  }
  mode: 'edit' | 'create' | 'unset'
  feedFetch: boolean,
  feedRefresh: boolean,
  isLoading: boolean,
  activeDocId: string | null,
  document: Document
  [propName: string]: any
}

class Type extends React.Component<TypeProps> {
  state: TypeState = {
    archive: [],
    listView: {
      list: [],
      size: 15,
      page: 1,
      count: 0
    } as TypeListView,
    query: {
      key: null,
      tag: null,
      user: null,
      page: 1,
      size: 15
    },
    mode: 'unset',
    activeDocId: null,
    document: {content: null, title: null, tag: [], uri_name: null},
    feedFetch: false,
    feedRefresh: false,
    isLoading: false
  }

  fetchAllTag = async () => {
    this.setState({isLoading: true})
    const { data } = await API.fetchTagList()
    this.setState({isLoading: false})
    const error = data.message || data.error
    if (error) {
      message.error('can\'t load tag list...' + error)
    } else {
      this.setState({
        archive: data
      })
    }
  }

  fetchMoreHandle = async () => {
    const { page, size, count } = this.state.listView
    // const newOffset = offset + size
    if (page * size > count) {
      message.info('Not more..')
    } else {
      const query = urlQuery({...this.state.query, page})
      const { data } = await API.queryPost(query)
      this.setState({
        listView: {...data, list: [...this.state.listView.list, ...data.list]},
        query: {...this.state.query, page: data.page}
      })
    }
  }

  refreshHandle = async () => {
    const query = urlQuery({...this.state.query, offset: 0})
    const { data } = await API.queryPost(query)
    const error = data.message || data.error
    if (error) {
      message.error('fail...' + error)
    } else {
      this.setState({
        listView: data,
        query: {...this.state.query, offset: 0}
      })
    }
  }

  toggleActiveDoc = async (id, titleInfo) => {
    this.setState({isLoading: true})
    const { data } = await API.fetchPost(id)
    this.setState({isLoading: false})
    if (data.doc_id) {
      this.setState({
        activeDocId: data.doc_id,
        document: data,
        mode: 'edit'
      })
    }
  }

  toggleEditerMode = async () => {
    this.setState({
      activeDocId: null,
      document: {content: ''},
      mode: this.state.mode === 'create' ? 'unset' : 'create'
    })
  }

  syncToDocument = async (formData, updateList: boolean = true) => {
    this.setState({
      document: {
        ...this.state.document,
        ...formData
      }
    })
    if (this.state.mode === 'edit' && updateList) {
      const updatedList = this.state.listView.list.map((doc: any) => {
        if (this.state.activeDocId === doc.doc_id) {
          return {...doc, ...formData}
        } else {
          return doc
        }
      })
      this.setState({
        listView: {
          ...this.state.listView,
          list: updatedList
        }
      })
    }
  }

  delDocument = async () => {
    this.setState({isLoading: true})
    const { data } = await API.deletePost(this.state.activeDocId as string)
    if (data.success) {
      this.setState({
        listView: {
          ...this.state.listView,
          count: this.state.listView.count - 1,
          list: this.state.listView.list.filter((doc: PostLit) => doc.doc_id !== data.id)
        },
        isLoading: false,
        mode: 'unset',
        activeDocId: null,
      })
    } else {
      this.setState({isLoading: false})
    }
  }

  syncToArchive = (tagList: any[]) => {
    this.setState({
      archive: tagList
    })
  }

  validiteDocument (document: any) {
    const notEmpty = ['title', 'summary', 'tag', 'content'] 
    for (let key of notEmpty) {
      if (!(document[key] && document[key].length)) {
        message.warn(`${key} can\'t be empty`)
        return false
      }
    }
    return true
  }

  submitDocument = async _ => {
    if (!this.validiteDocument(this.state.document)) { return }
    let res
    this.setState({
      isLoading: true
    })
    if (this.state.activeDocId) {
      res = await API.updatePost(this.state.activeDocId, this.state.document)
    } else {
      res = await API.createPost({...this.state.document, doctype: 'markdown'})
    }
    const {data} = res
    if (data.error) {
      notification.open({
        message: '创建失败',
        description: data.error,
      })
      this.setState({
        isLoading: false
      })
    } else {
      this.setState({
        mode: 'edit',
        isLoading: false,
        activeDocId: data.doc_id
      })
      this.refreshHandle()
    }
  }

  changeTag = (tag: any, selected: boolean) => {
    if (this.state.isLoading) {
      return
    }
    if (selected) {
      this.setState(
        {
          query: {
            ...this.state.query,
            tag: tag.tag_id,
            offset: 0
          }
        }, 
        this.refreshHandle)
    } else {
      this.setState(
        {
          query: {
            ...this.state.query,
            tag: null,
            offset: 0
          }
        }, 
        this.refreshHandle)
    }
  }

  componentWillReceiveProps (nextProps: TypeProps) {
    if (nextProps.authUserId && nextProps.authUserId !== this.state.query.user) {
      this.setState(
        {
          query: {
            ...this.state.query,
            user: nextProps.authUserId,
            offset: 0,
            size: 15
          }
        }, 
        this.refreshHandle
      )
    }
  }

  componentDidMount () {
    this.refreshHandle()
    this.fetchAllTag()
  }
  
  render() {
    return (
      <Layout>
        <Spin spinning={this.state.isLoading}>
        <Sider width={360} style={{position: 'relative', overflow: 'hidden'}}>
          <RCFeed 
            style={{height: '100%'}} 
            {...this.state.listView}
            mode={this.state.mode} 
            activeID={this.state.activeDocId}
            onCreate={this.toggleEditerMode}
            onRefresh={this.refreshHandle}
            onFetchMore={this.fetchMoreHandle}
            itemClickHandle={this.toggleActiveDoc}
          />
          <TagPicker 
            activeTag={this.state.query.tag} 
            allTag={this.state.archive} 
            style={{position: 'absolute', bottom: 0}}
            onChange={this.changeTag} 
            disable={this.state.mode === 'create'}
          />
        </Sider>
        </Spin>
        <Content 
          style={{
            maxHeight: `${window.innerHeight - 50}px`,
            paddingRight: '40px', 
            backgroundColor: '#263238',
            overflowY: 'scroll'
          }}
        >
          <Editor 
            fullPage={true}
            type="markdown" 
            mode={this.state.mode} 
            content={this.state.document.content}
            sync={this.syncToDocument}
          />
          <ToolBar 
            allTag={this.state.archive} 
            mode={this.state.mode} 
            document={this.state.document} 
            del={this.delDocument}
            sync={this.syncToDocument}
            syncToAllList={this.syncToArchive}
            submit={this.submitDocument}
          />
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  authUserId: state.agent.auth.u_id
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Type)