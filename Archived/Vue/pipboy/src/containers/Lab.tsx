import * as React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Folder from '@src/components/drag/dragableFolder'

interface State {
  urlPrefix: string
}
export interface HelloReactProps {
  match: any
}
class HelloReact extends React.Component<HelloReactProps> {
  state: State
  constructor (props: HelloReactProps) {
    super(props)
    this.state = {
      urlPrefix: this.props.match.path
    }
  }
  render() {
    return (
      <div className="lab">
        <nav>
          <Link to={`${this.state.urlPrefix}/p1`} />
          <Link to={`${this.state.urlPrefix}/p2`} />
        </nav>
        <Switch>
          <Route path={`${this.state.urlPrefix}/p1`} component={Folder} />
        </Switch>
      </div>
    )
  }
}

// const mapStateToProps = (state: any) => ({
//   users: state.users
// })

// const mapDispatchToProps = {
//   // loadUser
// }

export default HelloReact