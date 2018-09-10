// @flow
import * as React from 'react';
import CkoTitle from 'components/ui/title/';
import CkoCard from 'components/ui/card/';
import { FlexRow, FlexItem } from 'components/ui/flex/';
import { WrapStyled } from './styled/CkoKPI.sc';

type Props = {
  data: Array<Object>,
  loading: boolean,
  id?: string,
};

export default class CkoKPI extends React.Component<Props> {
  renderColumns() {
    return this.props.data.map((data, index) => (
      <FlexItem key={`${index}_${data.title}`} padding="0 30px">
        <CkoCard {...data} loading={this.props.loading} />
      </FlexItem>
    ));
  }

  render() {
    const props = {};
    if (this.props.id) {
      props.id = this.props.id;
    }

    return (
      <WrapStyled {...props} className="cko-kpi">
        <CkoTitle id="kpi-title" size="h4" value="Key performance indicators" />
        <FlexRow padding="30px 0px 35px 0px">{this.renderColumns()}</FlexRow>
      </WrapStyled>
    );
  }
}
