import * as React from 'react'
import { Form, Button, Card } from 'antd'
const FormItem = Form.Item

interface State {

}

export interface AgentFormProfileProps {
  onLogout: () => any
  [propname: string]: any
}

class AgentFormProfile extends React.Component<AgentFormProfileProps> {
  state: State = {}
  render() {
    return (
      <Form >
         <legend style={{position: 'relative'}}>
          <span>Auth</span>
          <FormItem style={{position: 'absolute', top: '-8px', right: '0'}}>
            <Button
              type="danger" 
              style={{height: '20px'}}
              htmlType="submit"
              onClick={this.props.onLogout}
            >
              Log out
            </Button>
          </FormItem>
        </legend>
        <Card title="Hello, ">
          <Card.Meta
            title={this.props.email}
            description="enjoy hacking :)"
          />
        </Card>
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

export default AgentFormProfile