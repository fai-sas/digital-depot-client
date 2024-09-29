'use client'

import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import FormController from '@/src/components/form/FormController'
import FormInput from '@/src/components/form/FormInput'
import registerValidationSchema from '@/src/schemas/register.schema'
import { useUserRegistration } from '@/src/hooks/auth.hook'
import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

const RegisterPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get('redirect')

  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    }

    handleUserRegistration(userData)
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/login')
      }
    }
  }, [isPending, isSuccess])

  if (isPending) {
    return <h1 className='p-12 text-4xl font-bold '>Loading...</h1>
  }

  return (
    <div className='flex h-[calc(100vh-100px)] flex-col items-center justify-center'>
      <h3 className='my-2 text-xl font-bold'>Digital DIY Depot </h3>
      <p className='mb-4'>Register</p>
      <div className='w-[35%]'>
        <FormController
          //! Only for development
          defaultValues={{
            name: '',
            email: '',
            mobileNumber: '',
            password: '',
          }}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className='py-3'>
            <FormInput label='Name' name='name' size='sm' />
          </div>
          <div className='py-3'>
            <FormInput label='Email' name='email' size='sm' />
          </div>
          <div className='py-3'>
            <FormInput label='Mobile Number' name='mobileNumber' size='sm' />
          </div>
          <div className='py-3'>
            <FormInput
              label='Password'
              name='password'
              size='sm'
              type='password'
            />
          </div>

          <Button
            className='w-full my-3 rounded-md bg-default-900 text-default'
            size='lg'
            type='submit'
          >
            Register
          </Button>
        </FormController>
        <div className='text-center'>
          Already have an account ? <Link href={'/login'}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
