// @flow
import * as React from 'react';
import CkoModal from 'components/ui/modal/';
import CkoSelect from 'components/ui/form/CkoSelect';
import Form from 'antd/lib/form';

type Props = {
  data: Array<Object>,
  initialValue: string,
  onOk: Function,
  onCancel: Function,
  form: Object,
};

class EditAssociatedPlanForm extends React.PureComponent<Props> {
  renderCardSelection() {
    const { form } = this.props;
    // todo check initial value
    return (
      <CkoSelect
        form={form}
        id="cardId"
        size="large"
        required={true}
        label="Select another card"
        data={this.props.data}
        initialValue={this.props.initialValue}
      />
    );
  }

  /**
   * Handles the submit event
   * @param {object} e
   */
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldValues) => {
      if (!err) {
        this.props.onOk(fieldValues);
      }
    });
  };

  /**
   * Renders the component
   * @returns {React}
   */
  render() {
    return (
      <CkoModal
        okText="Save card"
        title="Change card"
        titleIcon="modal-payment"
        visible={true}
        loading={false}
        onOk={this.handleSubmit}
        onCancel={this.props.onCancel}>
        <Form onSubmit={this.handleSubmit} autoComplete="off">
          {this.renderCardSelection()}
        </Form>
      </CkoModal>
    );
  }
}

const WrappedForm = Form.create()(EditAssociatedPlanForm);
export default WrappedForm;
