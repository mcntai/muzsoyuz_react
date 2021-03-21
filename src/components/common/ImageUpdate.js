import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './ImageUpdate.module.css'

const ImageUpdate = ({ uploadImageCallback, children }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [isFileSelected, setIsFileSelected] = useState(false)
  const submitButtonClass = isFileSelected ? s.showSubmitButton : s.hideSubmitButton
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedFile) {
      setIsFileSelected(true)
    }
  }, [selectedFile])

  const fileSelectedHandler = e => {
    setSelectedFile(e.target.files[0])
  }


  const fileUploadHandler = () => {
    const types = {
      'image/jpeg' : 'jpeg',
      'image/pjpeg': 'jpeg',
      'image/png'  : 'png',
    }

    let fileType = ''

    const formData = new FormData()
    formData.append('image', selectedFile)


    for (let type in types) {
      if (selectedFile.type === type) {
        fileType = types[type]
      }
    }

    dispatch(uploadImageCallback({ formData, fileType }))
  }

  return (
    <>
      <input
        type='file'
        name='image_update'
        className={s.fileInput}
        accept=".jpg, .jpeg, .png"
        onChange={fileSelectedHandler}
      />
      <button
        name='submit'
        className={submitButtonClass}
        onClick={fileUploadHandler}
      >OK
      </button>
      {children}
    </>
  )
}

export default ImageUpdate