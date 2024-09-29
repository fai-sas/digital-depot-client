'use client'

import { Card, Button, Spacer, Divider } from '@nextui-org/react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className='max-w-5xl p-6 mx-auto'>
      {/* Hero Section */}
      <Card className='p-10 mb-10 text-center'>
        <h1 className='mb-4 text-4xl font-bold'>Welcome to DIY Depot</h1>
        <p className='text-lg'>
          Your one-stop destination for tech tips, tricks, and tutorials.
        </p>
      </Card>

      {/* Section 1: Who We Are */}
      <div className='flex flex-col items-center mb-16 md:flex-row'>
        <div className='w-full md:w-1/2'>
          <Image
            src='https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Tech Tips'
            width={500}
            height={350}
            className='rounded-lg'
            priority
          />
        </div>
        <div className='w-full mt-8 md:w-1/2 md:mt-0 md:pl-10'>
          <h2 className='mb-4 text-2xl font-semibold'>Who We Are</h2>
          <p className='text-lg'>
            We are a team of tech enthusiasts passionate about sharing the
            latest trends, tips, and tutorials in the world of technology. Our
            goal is to help developers and tech lovers enhance their skills and
            stay updated with the fast-paced tech landscape.
          </p>
        </div>
      </div>

      <Divider className='my-8' />

      {/* Section 2: What We Offer */}
      <div className='flex flex-col items-center mb-16 md:flex-row'>
        <div className='order-2 w-full mt-8 md:w-1/2 md:order-1 md:mt-0 md:pr-10'>
          <h2 className='mb-4 text-2xl font-semibold'>What We Offer</h2>
          <ul className='space-y-2 text-lg list-disc list-inside'>
            <li>
              In-depth tech tutorials on various programming languages and
              frameworks
            </li>
            <li>Tips and tricks to improve your productivity as a developer</li>
            <li>Latest news and updates in the tech industry</li>
            <li>Hands-on guides for solving real-world tech challenges</li>
          </ul>
        </div>
        <div className='order-1 w-full md:w-1/2 md:order-2'>
          <Image
            src='https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Tech Tutorials'
            width={500}
            height={350}
            className='rounded-lg'
            priority
          />
        </div>
      </div>

      <Divider className='my-8' />

      {/* Section 3: Get Involved */}
      <div className='flex flex-col items-center mb-16 md:flex-row'>
        <div className='w-full md:w-1/2'>
          <Image
            src='https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Get Involved'
            width={500}
            height={350}
            className='rounded-lg'
            priority
          />
        </div>
        <div className='w-full mt-8 md:w-1/2 md:mt-0 md:pl-10'>
          <h2 className='mb-4 text-2xl font-semibold'>Get Involved</h2>
          <p className='text-lg'>
            Join our community of tech enthusiasts and contribute to our growing
            collection of tutorials and articles. Whether you're a beginner or a
            seasoned professional, there's always something new to learn and
            share.
          </p>
          <Button className='mt-6' color='primary'>
            Join Us
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Card className='p-6 text-center'>
        <h4 className='mb-2 text-xl font-semibold'>
          Stay Updated with the Latest Tech Trends
        </h4>
        <p className='mb-4'>
          Subscribe to our newsletter for weekly tech insights delivered
          straight to your inbox!
        </p>
        <Button color='success'>Subscribe Now</Button>
      </Card>
    </div>
  )
}
