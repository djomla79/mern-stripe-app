import React, { Fragment, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useHttpRequest } from '../../hooks/index';
import { apiTypes } from '../../constants';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { sendRequest } = useHttpRequest();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const data = await sendRequest(
          `${apiTypes.URL_MAIN}${apiTypes.API_STRIPE_ROUTE}/create-payment-intent`,
          'POST',
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${token}`,
            },
          },
          { items: [{ id: 'xl-tshirt' }] }
        );
        setClientSecret(data.clientSecret);
      } catch (err) {}
    };
    createPaymentIntent();
  }, [sendRequest]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    appearance,
    clientSecret,
  };

  return (
    <Fragment>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </Fragment>
  );
};

export default Payment;
