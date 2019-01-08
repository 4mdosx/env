import * as React from 'react'

interface State {

}

export interface GestureProps {
  
}

class Gesture extends React.Component<GestureProps> {
  state: State = {}
  render() {
    const { children } = this.props

    const child = React.Children.only(children)
  
    return React.cloneElement(child, {
      style: {
        ...(child.props.style || {}),
      },
    })
  }
}

// const mapStateToProps = (state: any) => ({
//   users: state.users
// })

// const mapDispatchToProps = {
//   // loadUser
// }

export default Gesture