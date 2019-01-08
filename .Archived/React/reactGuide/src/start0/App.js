import React, { Component } from 'react'
import logo from '../logo.svg'
import '../App.css'
import CommentBox from './components/commentBox'

var data = [
  {author: 'Pete Hunt', text: 'This is one comment'},
  {author: 'Jordan Walke', text: 'This is *another* comment'}
]

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CommentBox data={data} />
      </div>
    )
  }
}

export default App
