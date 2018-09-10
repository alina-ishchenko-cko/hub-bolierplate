// @flow
import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import CkoSelect from 'components/ui/form/CkoSelect';
import { currencyService } from 'services/currency/currencyService';
import { FlagsStyled } from './styled/CkoCurrencies.sc';

type Props = {
  loading?: boolean,
  className?: string,
  currencyIds: Array<number>,
};
export default class CkoCurrencies extends React.Component<Props> {
  static defaultProps = {
    currencyIds: [],
  };

  getCurrencies = () => {
    const currencies = currencyService.sortAndGroupCurrencies(
      this.props.currencyIds
    );

    return currencies
      .filter(data => data.name && data.name !== 'ANG')
      .map((data, index) => {
        return {
          key: `${data.name}-${index}`,
          value: data.name,
          label: (
            <FlagsStyled>
              <CkoIcon
                type="flag"
                name={data.name.toLowerCase().substring(0, 2)}
              />
              {data.name}
            </FlagsStyled>
          ),
        };
      });
  };

  render() {
    const props = {
      ...this.props,
      showSearch: true,
      loading: this.props.loading,
      data: this.getCurrencies(),
      className: `cko-currencies ${this.props.className || ''}`,
      placeholder: (
        <span>
          <CkoIcon name="" />
          <span className="placeholder-value">XXX</span>
        </span>
      ),
    };
    delete props.currencyIds;
    return <CkoSelect {...props} />;
  }
}
