import * as React from 'react'
import { Form, Switch } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as _ from 'lodash'
const FormItem = Form.Item

interface State {
}

export interface AgentFormSafehProps {
  form: WrappedFormUtils,
  storage: boolean,
  cookie: boolean,
  report: boolean,
  onSubmit?: any
}

const styleTextAlign = {
  textAlign: 'right'
}

class AgentFormSafe extends React.Component<AgentFormSafehProps> {

  state: State = {}
  
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err: any, valuesMap: any) => {
      if (!err) {
        this.props.onSubmit({privacy: valuesMap})
      }
    })
  }

  // tslint:disable-next-line:member-ordering
  handleChange = _.debounce(() => { this.handleSubmit() }, 2000)

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    }

    return (
      <Form>
        <div id="AgentFormSafe">
          <legend>
            <span>Privacy</span>
          </legend>
          <FormItem 
            {...formItemLayout}
            label="Local Storage"
            style={styleTextAlign}
          >
            {getFieldDecorator('storage', { valuePropName: 'checked' })(
              <Switch onChange={this.handleChange} />
            )}
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="Use Cookie"
            style={styleTextAlign}
          >
            {getFieldDecorator('cookie', { valuePropName: 'checked' })(
              <Switch onChange={this.handleChange} />
            )}
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="Send error report to devloper"
            style={styleTextAlign}
          >
            {getFieldDecorator('report', { valuePropName: 'checked' })(
              <Switch onChange={this.handleChange} />
            )}
          </FormItem>
        </div>        
      </Form>
    )
  }
}
export default Form.create({
  mapPropsToFields: (props: AgentFormSafehProps) => ({
    storage: Form.createFormField({
      value: props.storage,
    }),
    cookie: Form.createFormField({
      value: props.cookie,
    }),
    report: Form.createFormField({
      value: props.report,
    })
  })
})(AgentFormSafe)