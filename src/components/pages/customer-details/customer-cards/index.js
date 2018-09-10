import { connect } from 'react-redux';
import CustomerCards from './CustomerCards';
import {
  deleteCard,
  setDefaultCard,
  updateCardDetails,
} from 'store/actions/customerDetailsActions';

const mapStateToProps = ({
  currentUser,
  currentUser: { data },
  customerDetails,
  global: { selected },
}) => {
  return {
    cards: customerDetails.details.cards,
    countries: currentUser.lookups.countries || [],
    isReadOnly: data.isReadOnly,
    accounts: {
      accountId: selected.account.id,
      businessId: selected.business.id,
      channelId: selected.channel.id,
    },
  };
};

const mapActionsToProps = {
  deleteCard,
  setDefaultCard,
  updateCardDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(CustomerCards);
