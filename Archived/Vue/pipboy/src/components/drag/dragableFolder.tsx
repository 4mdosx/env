import * as React from 'react'
import { Observable } from 'rxjs/Observable'

interface State {
  cache: any
}
export interface HelloReactProps {
  
}
class HelloReact extends React.Component<HelloReactProps> {
  state: State = {
    cache: null
  }
  item: any
  mouseDown$: any
  render() {
    return (
      <div className="ACompsName">
        <div className="box">box 1</div>
        <div className="box">box 2</div>
        <div className="item" ref={(item) => { this.item = item }}>item</div>
        <p>{this.state.cache}</p>
      </div>
    )
  }
  componentDidMount () {
    this.mouseDown$ = Observable.fromEvent(this.item, 'click')
    this.mouseDown$.subscribe((e: any) => {
      this.setState({
        cache: Object.keys(e)
      })
    })
  }
}

// const mapStateToProps = (state: any) => ({
//   users: state.users
// })

// const mapDispatchToProps = {
//   // loadUser
// }

export default HelloReact