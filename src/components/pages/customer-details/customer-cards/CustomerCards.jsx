// @ flow
import * as React from 'react';
import { TableContainerStyled } from '../styled/CustomerDetailesTables.sc';
import CkoTable from 'components/ui/table';
import CkoIcon from 'components/ui/icon';
import CkoTag from 'components/ui/tag';
import CkoButton from 'components/ui/button';
import CustomerCardDetails from '../customer-card-details';
import ExpandedRowButton from '../expanded-row-button';
import AddNewCard from 'components/pages/add-new-card';
import { isCardDateValid } from 'services/payment/cardService';
import CkoLoading from 'components/ui/loading/';
import isEqual from 'lodash/isEqual';

type Props = {
  cards: Object,
  accounts: Object,
  countries: Array<Object>,
  updateCardDetails: Function,
  deleteCard: Function,
  setDefaultCard: Function,
  isReadOnly: boolean,
  customerId: string,
};

type State = {
  loading: boolean,
  expandedRows: Array<string>,
};

export default class CustomerCards extends React.Component<Props, State> {
  state = {
    loading: false,
    expandedRows: [],
    isAddNewCardDialogVisible: false,
  };

  columns: Array<Object> = [
    {
      title: 'Card type',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (paymentMethod: string, card: Object) => {
        return (
          <div className="details-wrap">
            <div className="card-number">
              <CkoIcon
                type="scheme"
                name={`${paymentMethod.toLowerCase()}-small`}
              />
              {card.last4}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Expiration date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
    },
    {
      title: 'Status',
      dataIndex: 'isExpired',
      key: 'isExpired',
      render: (isExpired: boolean) => {
        return (
          <CkoTag
            red={isExpired}
            green={!isExpired}
            value={isExpired ? 'expired' : 'valid'}
          />
        );
      },
    },
    {
      title: 'Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (isDefault: boolean) => {
        return (
          <div className="card-default-status">
            <CkoIcon name={isDefault ? 'check' : 'cross'} />
            <span>{isDefault ? 'Yes' : 'No'}</span>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      render: plan => {
        return (
          <ExpandedRowButton
            isRowExpanded={this.state.expandedRows.indexOf(plan.key) !== -1}
          />
        );
      },
    },
  ];

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      prevProps.cards &&
      prevProps.cards.data.length &&
      !isEqual(this.props.cards, prevProps.cards)
    ) {
      this.setState({ loading: true });
    } else if (this.state.loading) {
      // Add a bit of delay to make the loader icon more obvious
      setTimeout(() => {
        this.setState({ loading: false });
      }, 300);
    }
  }

  updateExpandedRows = (expanded, record) => {
    this.setState({
      expandedRows: expanded
        ? [...this.state.expandedRows, record.key]
        : this.state.expandedRows.filter(key => key !== record.key),
    });
  };

  // TODO save expande row so that user doesn't have to open it again
  // ant design table has a bug and preset for expanded rows doesn't work
  resetExpandedRows = () => {
    this.setState(() => {
      return {
        expandedRows: [],
      };
    });
  };

  updateCardDetails = (cardId: string, newCardParams: Object) => {
    this.props.updateCardDetails(
      cardId,
      this.props.customerId,
      this.props.accounts.accountId,
      newCardParams
    );
    this.resetExpandedRows();
  };

  setDefaultCard = (cardId: string) => {
    this.props.setDefaultCard(
      cardId,
      this.props.customerId,
      this.props.accounts.accountId
    );
    this.resetExpandedRows();
  };

  deleteCard = (cardId: string) => {
    this.props.deleteCard(cardId, this.props.customerId);
    this.resetExpandedRows();
  };

  expandedRowRender = (card: any) => {
    const cardLength = this.props.cards.data.length;
    // TODO create connected component instead of passing countries
    return (
      <CustomerCardDetails
        card={card}
        countries={this.props.countries}
        updateCustomerCardDetails={this.updateCardDetails}
        deleteCard={cardLength > 1 ? this.deleteCard : void 0}
        setDefaultCard={cardLength > 1 ? this.setDefaultCard : void 0}
        isReadOnly={this.props.isReadOnly}
      />
    );
  };

  getDataSourceFromCards() {
    const cards = this.props.cards.data;
    if (cards.length === 0) {
      return cards;
    }

    return cards.map(card => {
      const expiryMonth = parseInt(card.expiryMonth, 10);
      const expiryYear = parseInt(card.expiryYear, 10);
      const isExpired = !isCardDateValid(expiryMonth, expiryYear);

      return {
        key: card.id,
        expirationDate: `${card.expiryMonth} / ${card.expiryYear}`,
        isExpired,
        isDefault: card.defaultCard,
        paymentMethod: card.paymentMethod,
        last4: card.last4,
        ...card,
      };
    });
  }

  toggleAddNewCardDialog = () => {
    this.setState(prevState => {
      return {
        isAddNewCardDialogVisible: !prevState.isAddNewCardDialogVisible,
      };
    });
  };

  renderAddNewCardBtn() {
    return !this.props.isReadOnly ? (
      <CkoButton value="Add new card" onClick={this.toggleAddNewCardDialog} />
    ) : null;
  }

  render() {
    return this.props.cards ? (
      <TableContainerStyled>
        {this.state.loading && <CkoLoading full opacity="1" />}
        <CkoTable
          className="customer-cards-table"
          title="Associated Cards"
          dataSource={this.getDataSourceFromCards()}
          columns={this.columns}
          expandedRowRender={this.expandedRowRender}
          onExpand={this.updateExpandedRows}
          headerRight={this.renderAddNewCardBtn()}
        />
        {this.state.isAddNewCardDialogVisible ? (
          <AddNewCard
            customerId={this.props.customerId}
            onSubmit={this.toggleAddNewCardDialog}
            onCancel={this.toggleAddNewCardDialog}
          />
        ) : null}
      </TableContainerStyled>
    ) : null;
  }
}
