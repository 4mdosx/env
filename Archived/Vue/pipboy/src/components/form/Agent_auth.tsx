import * as React from 'react'
import { SyntheticEvent } from 'react'
import { Form, Input, Select, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
const FormItem = Form.Item
const Option = Select.Option

interface State {
  email: any,
  password: any,
}

export interface AgentFormAuthProps {
  form: WrappedFormUtils
  onSubmit?: any
}

class AgentFormAuth extends React.Component<AgentFormAuthProps> {
  state: State = {
    email: null,
    password: null
  }

  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: any, formData: any) => {
      this.setState({...formData})
      if (!err) {
        this.props.onSubmit(formData)
      }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <legend style={{position: 'relative'}}>
          <span>Auth</span>
          <FormItem style={{position: 'absolute', top: '-6px', right: '0'}}>
            <Button
              type="danger" 
              style={{height: '20px'}}
              htmlType="submit"
            >
              Post
            </Button>
          </FormItem>
        </legend>
        <FormItem
          {...formItemLayout}
          label="Method"
        >
          {getFieldDecorator('method', {})(
            <Select placeholder="Select an auth method">
              <Option value="p_session">Password-based Session</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Email"
        >
          {getFieldDecorator('email', {
            initialValue: this.state.email,
            rules: [{ required: true, message: 'Please input email!' }],
          })(
            <Input placeholder="email/username" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            initialValue: this.state.password,
            rules: [{ required: true, message: 'Please input password!' }]
          })(
            <Input placeholder="Simple password" type="password" />
          )}
        </FormItem>
      </Form>
    )
  }
}
export default Form.create({
  mapPropsToFields: (props) => ({
    method: Form.createFormField({
      value: 'p_session',
    })
  })
})(AgentFormAuth)