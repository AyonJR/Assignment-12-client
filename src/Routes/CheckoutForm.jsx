import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { AuthContext } from "../Pages/Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const CheckoutForm = ({testInfo}) => {
    const [error, setError] = useState([])
   const {user} = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret , setClientSecret] = useState('')
    const [processing , setProcessing] = useState(false)
  
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
  
        setProcessing(true)


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


        // confirm payment
       const {error: confirmError , paymentIntent} =
        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card : card ,
                billing_details : {
                    email : user?.email ,
                    name : user?.displayName
                },
            },
        })

       if(confirmError){
        setError(confirmError.message)
        setProcessing(false)
        return
       }

       if(paymentIntent.status === 'succeeded'){
        // create payment info
        // send to the database
        const paymentInfo = {
            ...testInfo , transactionId : paymentIntent.id,
            data : new Date(),
        }

        console.log(paymentInfo)

        // posting test method
        const userTest = await axiosSecure.post('/userTest' , paymentInfo);
        console.log(userTest.data)
        if(userTest.data.insertedId){
           // show success toast here
           toast.success("Test added successfully!");
   
        }

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
            <button className="bg-blue-400 btn mt-3 text-white font-semibold" type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay ${testInfo?.price}
            </button>
            <p className="text-red-600">{error}</p>
            <div>
                <ToastContainer></ToastContainer>
            </div>
        </form>
    );
};

export default CheckoutForm;