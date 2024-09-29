import FormController from '@/src/components/form/FormController'
import FormInput from '@/src/components/form/FormInput'
import ModalController from '@/src/components/modals/ModalController'
import { useUser } from '@/src/context/user.provider'
import {
  useGetSingleComment,
  useUpdateComment,
} from '@/src/hooks/comments.hook'
import { useUpdateMyProfile } from '@/src/hooks/user.hook'
import { Button } from '@nextui-org/button'
import { EditIcon } from 'lucide-react'
import { FieldValues, SubmitHandler } from 'react-hook-form'

const UpdateProfile = ({ userProfile }) => {
  // const { user } = useUser()

  // const { data, isLoading } = useGetSingleComment(commentId)
  // const comment = data?.data

  // Default values for the form, initialized with the fetched comment data
  const defaultValues = {
    name: userProfile?.name,
    mobileNumber: userProfile?.mobileNumber,
  }

  const {
    mutate: handleUpdateProfile,
    isPending,
    isSuccess,
  } = useUpdateMyProfile()

  // Check if the comment data is still loading
  // if (isLoading) {
  //   return <p>Loading...</p>
  // }

  const onSubmit: SubmitHandler<FieldValues> = (profileData) => {
    console.log(profileData)

    handleUpdateProfile(profileData)
  }

  return (
    <>
      <ModalController
        buttonClassName=''
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
    </>
  )
}

export default UpdateProfile
