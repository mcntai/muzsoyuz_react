import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch } from "react-redux"
import { profileImageUploaded } from "../../redux/slice/general"
import s from "./ImageEasyCrop.module.css"
import confirm from "../../assets/img/confirm.svg"
import remove from "../../assets/img/remove.svg"

const ImageEasyCrop = ({ uploadImageCallback, base64, file }) => {
  const [uploadedImage, setUploadedImage] = useState()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [completedCrop, setCompletedCrop] = useState()

  const dispatch = useDispatch()
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCompletedCrop(croppedAreaPixels)
  }, [])


  useEffect(() => {
    setUploadedImage(base64)
  }, [base64, uploadedImage])

  const fileUploadHandler = () => {
    const fileType = 'jpeg'
    const { width, height, x, y } = completedCrop

    const formData = new FormData()
    formData.append('image', file)

    dispatch(uploadImageCallback({ formData, fileType, width, height, x, y }))
    dispatch(profileImageUploaded(false))
  }

  return (
    <>
      <div className="crop-container">
        <Cropper
          image={uploadedImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          classes={{ containerClassName: s.reactCrop }}
          cropShape='round'
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div className={s.avatarBtnsWrapper}>
          <img
            src={remove}
            className={s.removeAvatar}
            alt="removeAvatar"
            onClick={() => dispatch(profileImageUploaded(false))}
          />
          <img
            src={confirm}
            className={s.confirmAvatar}
            alt="confirmAvatar"
            onClick={fileUploadHandler}
          />
        </div>
      </div>
    </>
  )
}

export default ImageEasyCrop