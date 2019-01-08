import * as React from 'react'
import { SyntheticEvent } from 'react'
import { Form, Input, InputNumber, AutoComplete, Select, } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
const FormItem = Form.Item
const Option = Select.Option

interface State {
  autoSaveTimer?: any,
  autoCompleteResult: string[]
}

export interface AgentFormServerProps {
  form: WrappedFormUtils
  autoSubmit?: any,
  // init field value
  domain: string,
  port: number | string,
  protocol: string
}

class AgentFormServer extends React.Component<AgentFormServerProps> {
  state: State = {
    autoSaveTimer: 0,
    autoCompleteResult: [],
  }

  handleSubmit = (e?: SyntheticEvent<any>) => {
    if (e) { e.preventDefault() }
    this.props.form.validateFieldsAndScroll((err: any, valuesMap: any) => {
      if (!err) {
        this.props.autoSubmit(valuesMap)
      } else {
        this.props.autoSubmit(null)
      }
    })
  }
  
  delayAutoSubmit = () => {
    clearTimeout(this.state.autoSaveTimer)
    this.state.autoSaveTimer = setTimeout(this.handleSubmit, 1800)
  }

  handleWebsiteChange = (value: string) => {
    let autoCompleteResult: string[]
    if (!value || /^[0-9.]*$/.test(value)) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
    }
    this.setState({ autoCompleteResult })
    this.delayAutoSubmit()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { autoCompleteResult } = this.state

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
      <Form>
        <legend>Server</legend>
        <FormItem
            {...formItemLayout}
            label="Domain"
        >
          {getFieldDecorator('domain', {})(
            <AutoComplete
              dataSource={autoCompleteResult}
              onChange={this.handleWebsiteChange}
              placeholder="root server IP/Domain"
            >
              <Input />
            </AutoComplete>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Port"
        >
          {getFieldDecorator('port', {
            rules: [{transform: (s) => String(s === 0 ? 0 : s || 80)}]
          })(
            <InputNumber 
              style={{width: '100%'}}
              onChange={this.delayAutoSubmit} 
              placeholder="root server port" 
              max={65535}
              min={0}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Protocol"
        >
          {getFieldDecorator('protocol', {})(
            <Select onChange={this.delayAutoSubmit} placeholder="Select Communication Protocol">
              <Option value="HTTP">HTTP</Option>
              <Option value="HTTPS">HTTPS</Option>
              {/* <Option value="WebSocket">WebSocket</Option> */}
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({
  mapPropsToFields: (props: AgentFormServerProps) => ({
    domain: Form.createFormField({
      value: props.domain || '/',
    }),
    port: Form.createFormField({
      value: props.port || 80,
    }),
    protocol: Form.createFormField({
      value: props.protocol || 'HTTP',
    })
  })
})(AgentFormServer)