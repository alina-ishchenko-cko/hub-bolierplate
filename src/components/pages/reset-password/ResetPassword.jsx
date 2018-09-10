// @flow
import * as React from 'react';
import CkoSignInLayout from 'components/ui/layout/CkoSignInLayout';
import ResetForm from './reset-form/';
import { PASSWORD } from 'config';
import CkoIcon from 'components/ui/icon/';
import { FlexColumn, FlexRow, FlexItem } from 'components/ui/flex/';
import { ListStyled, Title } from './ResetPassword.sc';

type Props = {
  newPasswordData: Object,
  location: {
    search: string,
  },
  history: {
    push: Function,
  },
  verifyTokenData: Object,
  match: Object,
  changePassword: Function,
  verifyToken: Function,
};

type State = {
  checkList: Array<Object>,
};

export default class ResetPassword extends React.Component<Props, State> {
  state = {
    checkList: [
      {
        label: 'At least one upper case letter',
        expression: PASSWORD.UPPER_CASE,
        isValid: false,
      },
      {
        label: 'At least one lower case letter',
        expression: PASSWORD.LOWER_CASE,
        isValid: false,
      },
      {
        label: 'At least one number',
        expression: PASSWORD.NUMBER,
        isValid: false,
      },
      {
        label: 'At least one special character (£, %, !, etc.)',
        expression: PASSWORD.SPECIAL_CHARACTERS,
        isValid: false,
      },
      {
        label: 'Between 8 and 15 characters',
        expression: PASSWORD.LENGTH,
        isValid: false,
      },
    ],
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.token) {
      this.props.verifyToken(match.params.token);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.newPasswordData.success || nextProps.verifyTokenData.error) {
      this.props.history.push('/login');
    }
  }

  getErrorMsgs() {
    const { newPasswordData } = this.props;
    if (newPasswordData.error) {
      return {
        type: 'error',
        message: newPasswordData.message,
      };
    }
    return {};
  }

  handleCheckList = (value: string) => {
    const results = [];
    const { checkList } = this.state;

    checkList.forEach((obj, indexVal) => {
      const pattern = new RegExp(obj.expression);
      if (pattern.test(value)) {
        obj.isValid = true;
        this.setState({ checkList: [...checkList] });
      } else {
        obj.isValid = false;
        results.push(1);
      }
    });

    return !!(results.length === 0);
  };

  handleSubmit = (formData: Object) => {
    const {
      newPasswordData: { email },
      match,
    } = this.props;

    if (match.params.token) {
      this.props.changePassword({
        token: match.params.token,
        ...formData,
      });
    } else {
      this.props.changePassword({
        email,
        ...formData,
      });
    }
  };

  renderCheckList() {
    return this.state.checkList.map((data, key) => (
      <li key={`pr_${key}`} className={data.isValid ? 'passed' : ''}>
        <CkoIcon name={data.isValid ? 'check' : 'close'} />
        {data.label}
      </li>
    ));
  }

  render() {
    return (
      <CkoSignInLayout loading={this.props.newPasswordData.loading}>
        <FlexColumn width="100%">
          <FlexItem margin="0 0 40px 0">
            <CkoIcon name="logo" className="logo" />
            <Title>Reset Password</Title>
          </FlexItem>
          <FlexRow width="100%">
            <FlexItem className="flex-item" margin="0 0 20px 0">
              <ResetForm
                hasToken={this.props.match.params.token !== void 0}
                tempPassword={this.props.newPasswordData.password}
                onSubmit={this.handleSubmit}
                onChangeCheckList={this.handleCheckList}
                error={this.getErrorMsgs()}
              />
            </FlexItem>
            <FlexItem className="flex-item" margin="0 0 20px 0">
              <ListStyled>
                <p>Your new password should match the folowing requirements.</p>
                <ul>{this.renderCheckList()}</ul>
              </ListStyled>
            </FlexItem>
          </FlexRow>
        </FlexColumn>
      </CkoSignInLayout>
    );
  }
}
