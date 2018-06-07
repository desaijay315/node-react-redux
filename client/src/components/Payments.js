import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';


class Payments extends Component{
    render(){
        return(
            <StripeCheckout 
                name="Send Email"
                description="$5 for 5 email credits"
                amount={500}
                token={this.props.handleToken()}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    };
}


export default connect(null,actions)(Payments);