import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { AuthContext } from "../Pages/Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import useActiveBanner from "../Pages/Dashboard/AdminProfile/useActiveBanner";

const CheckoutForm = ({ testInfo }) => {
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const { banner, isLoading, isError } = useActiveBanner();
    const [promoCode, setPromoCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(testInfo.price);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (testInfo?.price && testInfo?.price > 1) {
            getClientSecret({ price: discountedPrice });
        }
    }, [discountedPrice]);

    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price);
        console.log('client secret from server---', data);
        setClientSecret(data.clientSecret);
    }

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    };

    const applyPromoCode = () => {
        if (banner && promoCode === banner.couponCodeName) {
            const discount = (banner.couponRate / 100) * testInfo.price;
            setDiscountedPrice(testInfo.price - discount);
            toast.success("Promo code applied successfully!");
        } else {
            toast.error("Invalid promo code.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

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
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Create payment info
            const paymentInfo = {
                ...testInfo,
                transactionId: paymentIntent.id,
                date: new Date(),
                reportStatus: "pending",
                ...user
            };

            console.log(paymentInfo);

            // Posting test method
            const userTest = await axiosSecure.post('/userTest', paymentInfo);
            console.log(userTest.data);
            if (userTest.data.insertedId) {
                // Show success toast here
                toast.success("Test added successfully!");
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading banner</div>;
    }

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
            <div className="mt-3">
                <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    className="input"
                />
                <button
                    type="button"
                    onClick={applyPromoCode}
                    className="btn bg-green-400 ml-2 text-white font-semibold"
                >
                    Apply
                </button>
            </div>
            <button className="bg-blue-400 btn mt-3 text-white font-semibold" type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay ${discountedPrice}
            </button>
            <p className="text-red-600">{error}</p>
            <div>
                <ToastContainer />
            </div>
        </form>
    );
};

export default CheckoutForm;
