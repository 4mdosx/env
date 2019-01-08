import * as React from 'react'

interface State {

}

export interface HelloReactProps {
  
}

class HelloReact extends React.Component<HelloReactProps> {
  state: State = {}
  render() {
    return (
      <div className="ACompsName">
        HelloReact
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