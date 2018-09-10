// @flow
import * as React from 'react';
import Form from 'antd/lib/form';
import CkoAlert from 'components/ui/alert/';
import CkoIcon from 'components/ui/icon/';
import CkoInput from 'components/ui/form/CkoInput';
import CkoButton from 'components/ui/button';
import { FormWrapStyled } from './ForgotPasswordForm.sc';

type Props = {
  form: any,
  onSubmit: Function,
  error: {
    type: string,
    message: string | React.Node,
    description: string | React.Node,
  },
};

export class ForgotPasswordForm extends React.Component<Props> {
  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.email);
      }
    });
  };

  render() {
    const { error, form } = this.props;
    const email = form.getFieldValue('email');

    return (
      <FormWrapStyled>
        <Form onSubmit={this.handleSubmit}>
          <CkoInput
            required
            id="email"
            type="email"
            form={form}
            placeholder="Email address"
            message="Please enter your email"
            size="large"
            prefix={<CkoIcon name="email" />}
          />
          {error && error.type && <CkoAlert {...error} />}
          <CkoButton
            block
            disabled={!email}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-btn"
            value="Send me help"
          />
        </Form>
        {/*<Link to="/login">Back to Sign-In</Link>*/}
      </FormWrapStyled>
    );
  }
}

export default Form.create()(ForgotPasswordForm);
