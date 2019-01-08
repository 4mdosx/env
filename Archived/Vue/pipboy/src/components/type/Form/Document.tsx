import * as React from 'react'
import { Form, Input, Icon } from 'antd'

const FormItem = Form.Item

interface State {

}

export interface DocumentFormProps {
  title?: string
  summary?: string
  uri_name?: string
  mode:  'create' | 'edit'
  sync(data: any): any
}

class DocumentForm extends React.Component<DocumentFormProps> {
  state: State = {}

  changeHandle = (event: any) => {
    this.props.sync({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Form className="doc-form">
        <FormItem>
          <Input 
            prefix={<Icon type="bars" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            placeholder="Title" 
            name="title"
            value={this.props.title}
            onChange={this.changeHandle}
          />
        </FormItem>
        <FormItem>
          <Input 
            disabled={this.props.mode !== 'create'}
            prefix={<Icon type="bars" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            placeholder="URI_NAME" 
            name="uri_name"
            value={this.props.uri_name}
            onChange={this.changeHandle}
          />
        </FormItem>
        <FormItem>
          <Input.TextArea 
            placeholder="Summary" 
            name="summary"
            value={this.props.summary}
            onChange={this.changeHandle}
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        </FormItem>
      </Form>
    )
  }
}

export default DocumentForm