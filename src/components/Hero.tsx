'use client'

import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className='relative flex items-center justify-center h-screen bg-gray-900 rounded-md'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          priority
          alt='Hero Background'
          className='rounded-md opacity-50'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          src='https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
      </div>

      {/* Hero Content */}
      <div className='relative z-10 max-w-4xl px-4 text-center'>
        <h1 className='mb-4 text-5xl font-bold leading-tight text-white md:text-6xl'>
          Elevate Your Tech Skills
        </h1>
        <p className='mb-8 text-lg text-gray-200 md:text-2xl'>
          Learn the latest tips, tricks, and tutorials in web development,
          programming, and more.
        </p>
        <Link href='/posts'>
          <Button className='px-8' color='primary' size='lg'>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
