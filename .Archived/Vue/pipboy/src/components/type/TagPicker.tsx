import * as React from 'react'
import * as classnames from 'classnames'
import { Icon, Tag, Tooltip, message } from 'antd'

const CheckableTag = Tag.CheckableTag

import './TagPicker.less'

export interface TagPickerProps {
  style?: React.CSSProperties,
  disable: boolean,
  activeTag: any,
  allTag: any[],
  onChange(tag: any, checked: boolean): any,
}

class TagPicker extends React.Component<TagPickerProps> {
  state = {
    collapse: true
  }

  renderTag (tag: any) {
    if (tag.comment && tag.comment.length > 0) {
      return (
      <Tooltip title={tag.comment}>
        <span>{tag.name}</span>
      </Tooltip>)
    } else {
      return <span>{tag.name}</span>
    }
  }

  changeHanlde = (tag, checked) => {
    if (this.props.disable) {
      message.warn('需要先保存文档')
      return
    }
    this.props.onChange(tag, checked)
  }

  render() {
    return (
      <div className="tag-picker" style={this.props.style}>
        <div 
          className={classnames('collapse-box', this.state.collapse ? 'isCollapsed' : '')} 
          style={{minHeight: this.state.collapse ? 0 : '400px'}}
        >
          <Icon 
            className="collapseIcon" 
            type={this.state.collapse ? 'up-circle' : 'down-circle'} 
            onClick={() => this.setState({collapse: !this.state.collapse})}
          />
          <div className="tag-area">
          {this.props.allTag.map(tag => (
            <CheckableTag
              key={tag.tag_id}
              checked={this.props.activeTag === tag.tag_id}
              onChange={checked => this.changeHanlde(tag, checked)}
            >
              {this.renderTag(tag)}
            </CheckableTag>
          ))}
          </div>
        </div>
      </div>
    )
  }
}

export default TagPicker