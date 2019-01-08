import * as React from 'react'
import { Icon, Popover } from 'antd'

import Document from './Form/Document'
import Tag from './Form/TagForm'
import './ToolBar.less'
interface State {
  isSaving: false
}

export interface ToolBarReactProps {
  mode: 'unset' | 'create' | 'edit'
  allTag: any[]
  document?: any
  del(): any
  sync(data: any): any
  syncToAllList(data: any): any
  submit(data: any): any
}

class ToolBar extends React.Component<ToolBarReactProps> {
  state: State = {
    isSaving: false
  }

  sync = async (formData) => {
    this.setState({isSaving: true})
    this.props.sync(formData)
  }

  render() {
    if (this.props.mode === 'unset') {
      return <div className="ToolBar" />
    }
    const {title, uri_name, summary, tag = []} = this.props.document || {} as any
    return (
      <div className="ToolBar">
        <Popover 
          placement="leftTop" 
          title="文档信息"
          trigger="click"
          content={
          <Document 
            mode={this.props.mode}
            title={title} 
            summary={summary} 
            uri_name={uri_name} 
            sync={this.props.sync} 
          />}
        >
          <Icon type="menu-fold" />
        </Popover>
        <Popover 
          placement="leftTop" 
          title="标签管理" 
          content={(
            <Tag 
              allTag={this.props.allTag} 
              activeTag={tag} 
              sync={this.props.sync} 
              syncToAllList={this.props.syncToAllList}
            />)} 
          trigger="click"
        >
          <Icon type="appstore-o" />
        </Popover>
        <Popover placement="leftTop" title="上传文件" content={<div>施工中。。。</div>} trigger="click">
          <Icon type="file" />
        </Popover>
        {this.props.mode === 'edit' ? <Icon type="delete" onClick={this.props.del} /> : null}
        {
          this.state.isSaving ? 
            (<Icon type="loading" className="margin-gap" />) : 
            (<Icon type="cloud-upload-o" className="margin-gap" onClick={this.props.submit} />)
        }
      </div>
    )
  }
}

export default ToolBar