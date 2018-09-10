import { connect } from 'react-redux';
import CustomerDetailsHeader from './CustomerDetailsHeader';
import { updateCustomerDetails } from 'store/actions/customerDetailsActions';

const mapActionsToProps = {
  updateCustomerDetails,
};

const mapStateToProps = ({ currentUser, customerDetails }) => ({
  countries: currentUser.lookups.countries,
  isReadOnly: currentUser.data.isReadOnly,
  details: customerDetails.details,
});

export default connect(mapStateToProps, mapActionsToProps)(
  CustomerDetailsHeader
);
