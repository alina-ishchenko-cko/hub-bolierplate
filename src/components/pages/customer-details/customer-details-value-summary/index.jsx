// @flow
import React from 'react';
import { SummaryValueContainerStyled } from './CustomerDetailsValueSummary.sc';

type Props = {
  value: string,
  units: string,
  title: string,
  description: string,
  size: string,
};

export default class CustomerDetailsValueSummary extends React.PureComponent<
  Props
> {
  render() {
    return (
      <SummaryValueContainerStyled size={this.props.size}>
        <span className="summary-value">{this.props.value}</span>
        <span className="summary-value-units">{this.props.units}</span>
        <div className="summary-value-title-container">
          <div className="summary-value-title">{this.props.title}</div>
          <div className="summary-value-description">
            {this.props.description}
          </div>
        </div>
      </SummaryValueContainerStyled>
    );
  }
}
