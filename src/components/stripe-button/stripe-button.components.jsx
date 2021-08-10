import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51JMltgGMWLjMV5C03HalYtUEeWr2BnRk2ivs0KopQWGNkVsd7MJirEtVKBiyCzTzzB101PR5DoZZNBFCutU0dOSh00KHtUC5Ub'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
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