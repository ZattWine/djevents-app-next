import { ToastContainer, toast } from 'react-toastify'
import { FaImage, FaTwitterSquare } from 'react-icons/fa'
import moment from 'moment'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import ImageUpload from '@/components/ImageUpload'
import Modal from '@/components/Modal'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import 'react-toastify/dist/ReactToastify.css'

export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  )

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const submitHandler = async (e) => {
    e.preventDefault()

    // validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields.')
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) toast.error('Something went wrong!')
    else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const imageUploadedHandler = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title='Edit Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>

      <ToastContainer />

      <form onSubmit={submitHandler} className={styles['form']}>
        <div className={styles['grid']}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={inputChangeHandler}
            />
          </div>

          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={inputChangeHandler}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={inputChangeHandler}
          ></textarea>
        </div>

        <input type='submit' value='Edit Event' className='btn' />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded.</p>
        </div>
      )}

      <div>
        <button
          className='btn-secondary'
          onClick={() => setShowModal(FaTwitterSquare)}
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploadedHandler} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ query: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  console.log(req.headers.cookie)

  return {
    props: { evt },
  }
}
