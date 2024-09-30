/* eslint-disable react/no-unescaped-entities */
'use client'

import { Card, Button, Input, Textarea } from '@nextui-org/react'
import Image from 'next/image'

export default function ContactPage() {
  return (
    <>
      <div className='container p-8 mx-auto'>
        {/* Hero Section */}
        <Card className='p-10 mb-12 text-center shadow-lg'>
          <h1 className='mb-4 text-4xl font-bold'>Get in Touch</h1>
          <p className='text-lg'>
            Have any questions or need help? We're here for you. Contact us
            using the form below or reach out via email.
          </p>
        </Card>

        {/* Section 2: Support Section */}
        <div className='mb-16'>
          <Card className='p-10 shadow-lg'>
            <h2 className='mb-4 text-3xl font-semibold text-center'>Support</h2>
            <div className='flex flex-col items-center justify-center gap-8 md:flex-row'>
              <div className='text-center md:w-1/3'>
                <Image
                  priority
                  alt='Support'
                  className='rounded-lg'
                  height={200}
                  src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  width={300}
                />
                <h3 className='mt-4 text-xl font-semibold'>
                  Technical Support
                </h3>
                <p className='mt-2 text-lg'>
                  Reach out to our support team for help with any issues or
                  questions.
                </p>
                <Button
                  as='a'
                  className='mt-4'
                  color='success'
                  href='mailto:support@techinsights.com'
                >
                  Email Support
                </Button>
              </div>

              <div className='text-center md:w-1/3'>
                <Image
                  priority
                  alt='FAQ'
                  className='rounded-lg'
                  height={200}
                  src='https://images.unsplash.com/photo-1457433575995-8407028a9970?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  width={300}
                />
                <h3 className='mt-4 text-xl font-semibold'>FAQs</h3>
                <p className='mt-2 text-lg'>
                  Find answers to common questions in our FAQ section.
                </p>
                <Button className='mt-4' color='primary'>
                  View FAQs
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Section 3: Location */}
        <div className='mb-16'>
          <Card className='p-10 shadow-lg'>
            <h2 className='mb-4 text-3xl font-semibold text-center'>
              Our Location
            </h2>
            <div className='flex flex-col items-center justify-center gap-8 md:flex-row'>
              <div className='text-center md:w-1/2'>
                <Image
                  priority
                  alt='Office Location'
                  className='rounded-lg'
                  height={300}
                  src='https://plus.unsplash.com/premium_photo-1681400699241-834781696dc6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  width={400}
                />
              </div>
              <div className='text-lg leading-relaxed md:w-1/2'>
                <h3 className='text-xl font-semibold'>Our Office</h3>
                <p>
                  123 Tech Street, Suite 456
                  <br />
                  San Francisco, CA, 94107
                </p>
                <p className='mt-4'>
                  Monday - Friday: 9 AM - 5 PM
                  <br />
                  Saturday - Sunday: Closed
                </p>
                <p className='mt-4'>
                  Phone: (123) 456-7890
                  <br />
                  Email: contact@techinsights.com
                </p>
              </div>
            </div>

            {/* Section 1: Contact Form */}
            <div className='mb-16'>
              <Card className='p-10 shadow-lg'>
                <h2 className='mb-4 text-3xl font-semibold text-center'>
                  Contact Us
                </h2>
                <form className='space-y-6'>
                  <div className='flex flex-col gap-4 md:flex-row'>
                    <Input fullWidth required className='w-full md:w-1/2' />
                    <Input
                      fullWidth
                      required
                      className='w-full md:w-1/2'
                      type='email'
                    />
                  </div>
                  <Textarea fullWidth required rows={6} />
                  <Button className='w-full' color='primary' type='submit'>
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
