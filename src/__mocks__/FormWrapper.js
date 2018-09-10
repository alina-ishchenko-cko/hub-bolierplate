import * as React from 'react';
import Form from 'antd/lib/form';

export default function(WrappedComponent, setFieldsValues = []) {
  class FormWrapper extends React.Component {
    setOtherFields() {
      if (setFieldsValues.length > 0) {
        setFieldsValues.forEach(data => {
          this.props.form.getFieldDecorator(data.id, {
            initialValue: data.value,
          });
        });
      }
    }

    render() {
      this.setOtherFields();
      return <WrappedComponent {...this.props} />;
    }
  }
  return Form.create()(FormWrapper);
}
