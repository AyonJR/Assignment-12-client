import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

const CheckoutForm = ({testInfo}) => {
    const [error, setError] = useState([])

    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret , setClientSecret] = useState('')

    const axiosSecure = useAxiosSecure();


    useEffect(()=> {
        if(testInfo?.price && testInfo?.price > 1){
            getClientSecret({ price : testInfo?.price})
        }

    }, [testInfo])


  const getClientSecret = async price => {
    const {data} = await axiosSecure.post(`/create-payment-intent`, price)
    console.log('client secret from server---' ,data)
    setClientSecret(data.clientSecret)
}






    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {

            return;
        }


        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
    };






    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="bg-blue-400 btn mt-3 text-white font-semibold" type="submit" disabled={!stripe}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
        </form>
    );
};

export default CheckoutForm;