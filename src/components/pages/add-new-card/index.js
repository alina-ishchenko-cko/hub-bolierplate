import { connect } from 'react-redux';
import { addCreditCard } from 'store/actions/customerDetailsActions';
import AddNewCard from './AddNewCard';

const mapActionsToProps = { addCreditCard };

const mapStateToProps = state => {
  const { global, currentUser } = state;
  return {
    accountId: global.selected.account.id,
    businessId: global.selected.business.id,
    channelId: global.selected.channel.id,
    businesses: global.data.businesses,
    countries: currentUser.lookups.countries,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AddNewCard);
