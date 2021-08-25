import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

//axios
import axios from 'axios'


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51JMltgGMWLjMV5C03HalYtUEeWr2BnRk2ivs0KopQWGNkVsd7MJirEtVKBiyCzTzzB101PR5DoZZNBFCutU0dOSh00KHtUC5Ub'

    const onToken = token => {
        // console.log(token);
        alert('Payment sending')

        axios({
            url: 'payment',
            method: 'post',
            data: {
                //text: 'BODY DATA SENT',
                amount: priceForStripe,
                token
            }
        }).then( res => {
            alert('payment Successful')
        }).catch( error => {
            console.log('payment error: ', error.response);
            console.log('logging token: ', token);
            alert('payment Unsuccessful')
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Test React Payment'
            billingAddress
            shippingAddress
            image="https://freesvg.org/img/Japanese-Flag-Lines.png"
            description={`Your Total is: ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton