import * as React from 'react';
import Form from 'antd/lib/form';
import CkoInput from 'components/ui/form/CkoInput';
import Button from 'antd/lib/button';
const FormItem = Form.Item;

class TwoFactorForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values.authCode);
      }
    });
  };

  render() {
    const { form } = this.props;
    return (
      <div className="two-factor-form">
        <Form onSubmit={this.handleSubmit} className="loginform">
          <CkoInput
            required
            id="authCode"
            form={form}
            type="Number"
            message="Enter verification code"
            className="text-center"
          />
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-btn">
              Verify
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(TwoFactorForm);
