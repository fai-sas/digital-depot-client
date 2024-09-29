'use client'

import Image from 'next/image'
import DOMPurify from 'dompurify'
import { User } from '@nextui-org/user'
import moment from 'moment'
import CommentBox from './CommentBox'
import { Divider } from '@nextui-org/divider'
import Comments from './Comments'
import { Button } from '@nextui-org/button'
import { useUser } from '@/src/context/user.provider'
import { useFollowUser, useUnFollowUser } from '@/src/hooks/user.hook'
import html2pdf from 'html2pdf.js'
import { useRef } from 'react'

// Importing react-share components
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share'

const SinglePost = ({ post }: any) => {
  const {
    _id,
    title,
    description,
    images,
    category,
    rating,
    comments,
    createdAt,
    postedBy,
  } = post || {}

  const sanitizedDescription = DOMPurify.sanitize(description)
  const postedByUser = postedBy?._id

  const { user } = useUser() // Get current logged-in user

  const { mutate: handleFollowUser, isPending: followUserPending } =
    useFollowUser()
  const { mutate: handleUnFollowUser, isPending: UnFollowUserPending } =
    useUnFollowUser()

  const followingList = user?.following || []
  const isFollowing = followingList.some(
    (userId: string) => userId === postedByUser
  )

  const postRef = useRef<HTMLDivElement>(null) // Create a reference for the post section

  const handleFollow = () => {
    if (postedByUser) {
      handleFollowUser(postedByUser)
    }
  }

  const handleUnFollow = () => {
    if (postedByUser) {
      handleUnFollowUser(postedByUser)
    }
  }

  const handleDownloadPDF = () => {
    const element = postRef.current
    if (element) {
      // Log the inner HTML of the element being captured
      console.log(element.innerHTML)

      const opt = {
        margin: 0.3,
        filename: `${title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }

      // Use setTimeout to allow the content to fully render
      setTimeout(() => {
        html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(() => {
            console.log('PDF Downloaded!') // Log success
          })
          .catch((error) => {
            console.error('Error generating PDF:', error) // Log any errors
          })
      }, 1000) // Delay for 1 second
    }
  }

  // Construct the share URL
  const shareUrl = window.location.href // Current post URL

  return (
    <>
      <section className='flex justify-between'>
        <User
          avatarProps={{
            src: `${post?.postedBy?.profilePhoto}`,
          }}
          isFocusable={true}
          name={post?.postedBy?.name}
        />

        {!isFollowing ? (
          <Button disabled={followUserPending} onClick={handleFollow}>
            Follow User
          </Button>
        ) : (
          <Button
            variant='bordered'
            disabled={UnFollowUserPending}
            onClick={handleUnFollow}
          >
            Unfollow User
          </Button>
        )}
      </section>

      <small className='py-2'>
        Published on {moment(createdAt).format('D MMMM YYYY')}
      </small>

      <article ref={postRef}>
        <div className='pb-4 border-b border-default-200'>
          <Image
            alt='Card background'
            className='object-cover my-2 rounded-xl'
            height={500}
            src={images?.[0]}
            width={1000}
          />
          <p className='py-4'>{category}</p>
          <p className='py-4'>{rating}</p>
          <p className='py-4'>{title}</p>

          <div
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }} // Render sanitized HTML
          />
        </div>

        <Divider />

        <Comments postId={_id} />
        <Divider />
        <CommentBox postId={_id} />
        <p className='py-4'>{comments}</p>

        {/* Button to download PDF */}
        <Button onClick={handleDownloadPDF}>Download as PDF</Button>

        {/* Social Media Share Buttons with Icons */}
        <div className='flex mt-4 space-x-4'>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            summary={sanitizedDescription}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </article>
    </>
  )
}

export default SinglePost
