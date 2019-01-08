import * as React from 'react'
import { Form, Tag, Tooltip, Input, Icon, notification } from 'antd'

import * as API from '@src/service/api.v1'

const CheckableTag = Tag.CheckableTag

interface State {
  inputVisible: boolean,
  inputValue: string
}

export interface TagFormProps {
 allTag: any[]
 activeTag: any[] 
 sync(data: any, updateList?: boolean): any
 syncToAllList(newAllTagList: any): any
}

class TagForm extends React.Component<TagFormProps> {
  state: State = {
    inputVisible: false,
    inputValue: ''
  }

  changeHanlde = (tag: any, checked: boolean) => {
    if (checked) {
      this.props.sync({tag: [...this.props.activeTag, tag]})
    } else {
      this.props.sync({tag: this.props.activeTag.filter(atag => tag.tag_id !== atag.tag_id)})
    }
  }

  showInput = () => {
    this.setState({inputVisible: true})
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = async () => {
    const state = this.state
    const inputValue = state.inputValue
    if (inputValue && this.props.allTag.findIndex(tag => tag.name === inputValue) === -1) {
      const { data } = await API.createTag({name: inputValue, comment: ''})
      if (data.error) {
        notification.open({
          message: '错误❌',
          description: data.error,
        })
      } else {
        this.props.syncToAllList([...this.props.allTag, data])
        this.props.sync({tag: [...this.props.activeTag, data]})
      }
    }
    this.setState({
      inputVisible: false,
      inputValue: '',
    })
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

  render() {
    const { inputVisible, inputValue } = this.state

    return (
      <Form className="tag-form">
        {this.props.allTag.map(tag => (
            <CheckableTag
              key={tag.tag_id}
              checked={this.props.activeTag.findIndex(atag => tag.tag_id === atag.tag_id) >= 0}
              onChange={checked => this.changeHanlde(tag, checked)}
            >
              {this.renderTag(tag)}
            </CheckableTag>
          ))}
           {inputVisible && (
             <div className="extro-tag">
              <Input
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
             </div>
          )}
          {!inputVisible && (
            <div onClick={this.showInput} className="extro-tag">
              <Tag
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            </div>
          )}
      </Form>
    )
  }
}

// const mapStateToProps = (state: any) => ({
//   users: state.users
// })

// const mapDispatchToProps = {
//   // loadUser
// }

export default TagForm