'use client'

import Image from 'next/image'
import DOMPurify from 'dompurify'
import { User } from '@nextui-org/user'
import moment from 'moment'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'
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
import { Chip } from '@nextui-org/chip'

import Comments from './Comments'
import CommentBox from './CommentBox'

import { useFollowUser, useUnFollowUser } from '@/src/hooks/user.hook'
import { useUser } from '@/src/context/user.provider'

const SinglePost = ({ post }: any) => {
  const {
    _id,
    title,
    description,
    images,
    category,
    ratings,
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

        {user &&
          (!isFollowing ? (
            <Button
              color='secondary'
              disabled={followUserPending}
              onClick={handleFollow}
            >
              Follow
            </Button>
          ) : (
            <Button
              color='warning'
              disabled={UnFollowUserPending}
              variant='bordered'
              onClick={handleUnFollow}
            >
              Unfollow
            </Button>
          ))}
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
          <div className='py-4'>
            <Chip color='warning'>{category}</Chip>
          </div>
          <p className='py-4 '>{ratings}</p>
          <p className='py-4 text-xl font-bold'>{title}</p>

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
            <FacebookIcon round size={32} />
          </FacebookShareButton>
          <TwitterShareButton title={title} url={shareUrl}>
            <TwitterIcon round size={32} />
          </TwitterShareButton>
          <LinkedinShareButton
            summary={sanitizedDescription}
            title={title}
            url={shareUrl}
          >
            <LinkedinIcon round size={32} />
          </LinkedinShareButton>
          <WhatsappShareButton title={title} url={shareUrl}>
            <WhatsappIcon round size={32} />
          </WhatsappShareButton>
        </div>
      </article>
    </>
  )
}

export default SinglePost
