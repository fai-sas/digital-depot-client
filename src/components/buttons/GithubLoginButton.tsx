'use client'

import { Button } from '@nextui-org/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

const GithubLoginButton = () => {
  const searchParams = useSearchParams()

  const redirect = searchParams.get('redirect')

  return (
    <Button
      onClick={() => {
        signIn('github', { callbackUrl: redirect ? redirect : '/' })
      }}
    >
      Log In With Github
    </Button>
  )
}

export default GithubLoginButton
