import { connect } from 'react-redux';
import CustomerSummary from './CustomerSummary';

const mapStateToProps = ({ currentUser: { data }, customerDetails }) => {
  return {
    ltv: customerDetails.details.lTV,
    orderHistory: customerDetails.details.orderHistory,
    currencyName: data.displayCurrencyName,
  };
};

export default connect(mapStateToProps)(CustomerSummary);
