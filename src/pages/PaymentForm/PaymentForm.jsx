import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import "./PaymentForm.css"
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';
import { Dialog, Transition } from '@headlessui/react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errors, seterrors] = useState("")
      const [successfull, setSuccesfull] = useState("")
    const [clientSecret, setClientSecret] = useState('')
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const [paymentClass, setPaymentClass] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    const {id} = useParams();

    useEffect(() => {
        axiosSecure(`/classes/payment/${id}`)
            .then(data => {
                console.log(data.data)
                setPaymentClass(data?.data)
            })
            .catch(error => console.log(error))
    },[id, axiosSecure])


    useEffect(() => {
        if (paymentClass?.storedClass?.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: paymentClass?.storedClass?.price})
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure,paymentClass])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            const err = error.type + " - " + error.message
            seterrors(err)
        } else {
            seterrors("")
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            })

        if (confirmError) {
            console.log(confirmError)
            seterrors(confirmError.message)
        }
        setSuccesfull("")
        console.log('payment intent', paymentIntent?.amount)
        if(paymentIntent){
            const amount = paymentIntent?.amount / 100;
            setSuccesfull(`Successfully Payment : ${amount}`)
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                "storedClass.availableSeats": (paymentClass?.storedClass?.availableSeats - 1),
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            axiosSecure.patch(`/classes/payments/${id}`, paymentInfo)
                .then(res => {
                    console.log(res.data)
                    // if (res.data.modifiedCount) {
                    // }
            })
        }
    };

    return (
        <div className='relative min-h-screen'>
            <p className='text-red-400 text-center absolute -top-14 right-0 left-0'>{errors && errors}</p>
            <p className='text-green-400 text-center absolute -top-14 right-0 left-0'>{successfull && successfull}</p>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 py-4 gap-10 justify-center bg-blue-300 px-10 rounded-xl payment-form'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#8b97eb',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='bg-primaryColor font-bold w-full hover:bg-[#7f9a9f] hover:text-white rounded-lg payment-btn' disabled={!stripe}>
                    Pay
                </button>
            </form>
            <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false)
                        navigate("/dashboard/myenrolled-classes")
                      }}
                    >
                      Show Enrolled Classes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false)
                        navigate("/dashboard/payment-history")
                      }}
                    >
                      Show  Payment History
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false)
                        navigate("/dashboard/myselected-classes")
                      }}
                    >
                      Show  Selected Classes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
        </div>
    );

};

export default PaymentForm;