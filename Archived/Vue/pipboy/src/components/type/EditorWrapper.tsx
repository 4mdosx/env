import * as React from 'react'
// import { Modal } from 'antd'
import * as ReactMarkdown from 'react-markdown'
import { Controlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'

interface State {
  content: string,
}

export interface EditorWrapperProps {
  content: any,
  fullPage?: boolean,
  type: 'preview' | 'markdown' | 'plain',
  mode: 'edit' | 'create' | 'unset',
  sync(data: any): any
}

const DETAULT_PLACEHOLDER = '# Select Post from left or click Write button'

class EditorWrapper extends React.Component<EditorWrapperProps> {
  state: State = {
    content: DETAULT_PLACEHOLDER
  }

  inputHandle = (editor: any, data: any, value: any) => {
    if (this.props.mode === 'unset') {return}
    this.props.sync({content: value})
  }

  // replaceContent = () => {
  //   this.setState(
  //     {renderLoading: true, content: this.props.content}, 
  //     () => { 
  //       this.setState({renderLoading: false, edited: false})
  //     }
  //   )
  // }

  mdEditor = () => (
    <CodeMirror
      className={this.props.fullPage ? 'fullPage' : ''}
      value={this.state.content}
      options={{
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true
      }}
      onBeforeChange={this.inputHandle}
    />
  )

  mdPreview = () => <ReactMarkdown source={this.state.content} />

  renderMain = () => {
    switch (this.props.type) {
      case 'markdown':
        return this.mdEditor()
      case 'preview':
        return this.mdPreview()
      default:
        return <p>{this.state.content}</p>
    }
  }

  componentWillReceiveProps (nextProps: EditorWrapperProps) {
    if (nextProps.mode === 'unset') {
      this.setState({
        content: DETAULT_PLACEHOLDER
      })
    } else {
      this.setState({
        content: nextProps.content
      })
    }
  }

  render() {
    return (
      <div className={this.props.fullPage ? 'fullPage Editor_box' : 'Editor_box'}>
        {
          this.renderMain()
        }
      </div>
    )
  }
}

export default EditorWrapper