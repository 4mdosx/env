import * as React from 'react'
// import * as classnames from 'classnames'
// import { ListItemProps as ListItemBasePropsType } from './PropsType'
// import TouchFeedback from 'rmc-feedback'

interface State {

}

export interface ListItemProps {
  
}

class ListItem extends React.Component<ListItemProps> {
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

export default ListItem