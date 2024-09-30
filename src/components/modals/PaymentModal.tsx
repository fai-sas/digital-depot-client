import { Button } from '@nextui-org/button'
import { FieldValues, SubmitHandler } from 'react-hook-form'

import FormController from '../form/FormController'

import ModalController from './ModalController'

import { UseMakePaymentForPremiumUser } from '@/src/hooks/user.hook'
import { useUser } from '@/src/context/user.provider'
import { logout } from '@/src/services/Auth'

const PaymentModal = () => {
  const { user } = useUser()

  const { mutate: handleMakePayment, isPending } =
    UseMakePaymentForPremiumUser()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const paymentData = {
      user: {
        userId: user?._id,
        name: user?.name,
        phone: user?.mobileNumber,
        email: user?.email,
      },
      totalPrice: 20,
    }

    handleMakePayment(paymentData, {
      onSuccess: (res) => {
        logout()
        if (res?.success && res?.data?.payment_url) {
          window.location.href = res.data.payment_url
        } else {
          console.error('Order creation failed:', res?.message)
        }
      },
      onError: (error) => {
        console.error('Payment failed:', error)
      },
    })
  }

  return (
    <ModalController
      buttonClassName='flex-1 text-xl font-bold'
      buttonText='Unlock for $20'
      color='primary'
      title='Make Payment'
    >
      <FormController onSubmit={onSubmit}>
        <div className='space-y-2 '>
          <h1>Name: {user?.name}</h1>
          <h1>Email: {user?.email}</h1>
          <h1>Phone: {user?.mobileNumber}</h1>
          <h1>Amount: $ 20</h1>
        </div>

        <Button
          className='w-full my-3 font-semibold rounded-md bg-default-900 text-default'
          disabled={isPending}
          size='lg'
          type='submit'
        >
          Make Payment
        </Button>
      </FormController>
    </ModalController>
  )
}

export default PaymentModal
