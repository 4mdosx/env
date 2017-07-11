import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'

class Comment extends Component {
  rawMarkup () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true})
    return { __html: rawMarkup }
  }
  render () {
    return (
      <div className='comment'>
        <h2 className='commentAuthor'>
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
}
class CommentList extends Component {
  render () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.toString()}>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div className='commentList'>
        {commentNodes}
      </div>
    )
  }
}
class CommentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {data: [], text: 'ha?'}
  }
  handleSubmit = (e) => {
    e.preventDefault()
    var author = ReactDOM.findDOMNode(this.refs.author).value.trim()
    var text = ReactDOM.findDOMNode(this.refs.text).value.trim()
    if (!text || !author) {
      return
    }
    this.props.onCommentSubmit({author: author, text: text})
    ReactDOM.findDOMNode(this.refs.author).value = ''
    ReactDOM.findDOMNode(this.refs.text).value = ''
    return
  }
  render () {
    return (
      <form className='commentForm' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Your name' ref='author' />
        <input type='text' placeholder='Say something...' ref='text' />
        <input type='submit' value='Post' />
      </form>
    )
  }
}

class CommentBox extends Component {
  constructor (props) {
    super(props)
    this.state = {data: [], text: 'ha?'}
  }
  componentDidMount () {
     // TODO: 长轮询／websocket 刷新列表
    setTimeout(() => {
      this.setState({data: [
        {
          author: 'Lin',
          text: 'text1'
        },
        {
          author: 'Li',
          text: 'text2'
        }
      ]})
    }, 2000)
  }
  handleCommentSubmit = (comment) => {
    const newdata = this.state.data.concat([comment])
    this.setState({
      data: newdata
    })
  }
  render () {
    return (
      <div className='commentBox'>
        <h1>{this.state.text}</h1>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}

export default CommentBox
