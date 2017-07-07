import React, { Component } from 'react'
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
        <Comment author={comment.author}>
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
function CommentForm () {
  return (
    <div className='commentForm'>
       Hello, world! I am a CommentForm.
     </div>
  )
}
class CommentBox extends Component {
  constructor (props) {
    super(props)
    this.state = {data: [], text: 'ha?'}
  }
  render () {
    return (
      <div className='commentBox'>
        <h1>{this.state.text}</h1>
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    )
  }
}

export default CommentBox
