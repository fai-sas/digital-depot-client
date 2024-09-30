'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { useUser } from '../context/user.provider'

import PaymentModal from './modals/PaymentModal'

export default function CtaSection() {
  const { user } = useUser()

  // Show CTA section if no user or if the user is BASIC
  const shouldDisplayCta = !user || user?.userType === 'BASIC'

  const ctaContent = () => {
    if (user?.userType === 'BASIC') {
      return <PaymentModal />
    }
    if (!user) {
      return (
        <p className='text-lg font-bold text-center '>
          Unlock for $20/Month, <Link href={'/login'}>subscribe now</Link>
        </p>
      )
    }

    return null
  }

  if (!shouldDisplayCta) {
    return null
  }

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className='py-16'
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className='container flex flex-col items-center justify-between gap-8 px-8 mx-auto md:flex-row'>
        {/* Left Side: Promo Image */}
        <div className='flex-1'>
          <Image
            priority
            alt='Premium Content'
            className='rounded-lg shadow-lg'
            height={400}
            src='https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg'
            width={500}
          />
        </div>

        {/* Right Side: Text and CTA */}
        <div className='flex-1 text-center md:text-left'>
          <h2 className='mb-4 text-4xl font-bold'>Unlock Premium Content</h2>
          <p className='mb-6 text-lg leading-relaxed'>
            Gain access to exclusive tutorials, tips, and resources by becoming
            a premium member for $20/month. Share your knowledge with the
            community by contributing your own premium content.
          </p>

          {/* Conditional rendering for PaymentModal or simple text */}
          <div className='flex flex-col justify-center gap-4 sm:flex-row md:justify-start'>
            {ctaContent()}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
