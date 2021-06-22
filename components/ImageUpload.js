import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import 'react-toastify/dist/ReactToastify.css'

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null)

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0])
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) {
      toast.error('Something went wrong!')
    } else if (res.ok) {
      imageUploaded()
    } else {
    }
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <ToastContainer />
      <form onSubmit={submitHandler}>
        <div className={styles.file}>
          <input type='file' onChange={fileChangeHandler} />
        </div>
        <input type='submit' value='upload' className='btn' />
      </form>
    </div>
  )
}
