import { Button } from '@nextui-org/button'
import { FieldValues, SubmitHandler } from 'react-hook-form'

import FormController from '@/src/components/form/FormController'
import FormInput from '@/src/components/form/FormInput'
import ModalController from '@/src/components/modals/ModalController'
import { useUpdateMyProfile } from '@/src/hooks/user.hook'
import { ImageUploaderSingle } from '@/src/components/ImageUploaderSingle'

const UpdateProfile = ({ userProfile }) => {
  const defaultValues = {
    userId: userProfile?._id,
    name: userProfile?.name,
    mobileNumber: userProfile?.mobileNumber,
    profilePhoto: userProfile?.profilePhoto,
  }

  const { mutate: handleUpdateProfile, isPending } = useUpdateMyProfile()

  const onSubmit: SubmitHandler<FieldValues> = (profileData) => {
    const userId = userProfile?._id // Get the userId

    handleUpdateProfile({ userId, profileData }) // Pass both userId and profileData
  }

  return (
    <ModalController
      buttonClassName='font-bold text-xl m-4'
      buttonText='Update Profile'
      title='Update Profile'
    >
      <FormController defaultValues={defaultValues} onSubmit={onSubmit}>
        <div className='py-3'>
          <FormInput label='Name' name='name' size='sm' />
        </div>
        <div className='py-3'>
          <FormInput label='Mobile Number' name='mobileNumber' size='sm' />
        </div>
        <div className='flex flex-wrap gap-2 py-2'>
          <div className='flex-1 min-w-fit'>
            <ImageUploaderSingle name='profilePhoto' />
          </div>
        </div>
        <Button
          className='w-full my-3 font-semibold rounded-md bg-default-900 text-default'
          disabled={isPending}
          size='lg'
          type='submit'
        >
          Update Profile
        </Button>
      </FormController>
    </ModalController>
  )
}

export default UpdateProfile
