import React, { useState, useCallback, useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'
import s from "./ImageEasyCrop.module.css"
import { useDispatch } from "react-redux"
import { profileImageUploaded } from "../../slice/general"
import confirm from "../../assets/img/confirm.svg"
import remove from "../../assets/img/remove.svg"

const ImageEasyCrop = ({ uploadImageCallback, base64, file }) => {
  const [uploadedImage, setUploadedImage] = useState()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [completedCrop, setCompletedCrop] = useState()

  // const [imageBlob, setImageBlob] = useState()
  // const imgRef = useRef(null)
  // const canvasRef = useRef(null)

  const dispatch = useDispatch()
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCompletedCrop(croppedAreaPixels)
  }, [])


  useEffect(() => {
    setUploadedImage(base64)

  }, [base64, uploadedImage])

  // useEffect(() => {
  //   if (!completedCrop || !imgRef.current) return
  //
  //   const image = imgRef.current
  //   const canvas = canvasRef.current
  //   const crop = completedCrop
  //
  //   const scaleX = image.naturalWidth / image.width
  //   const scaleY = image.naturalHeight / image.height
  //   const pixelRatio = window.devicePixelRatio
  //   const ctx = canvas.getContext("2d")
  //
  //   canvas.width = crop.width * pixelRatio
  //   canvas.height = crop.height * pixelRatio
  //
  //   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  //   ctx.imageSmoothingQuality = "high"
  //
  //   ctx.drawImage(
  //     image,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width,
  //     crop.height
  //   )
  //
  //   canvas.toBlob(blob => setImageBlob(blob), "image/jpeg")
  //
  // }, [completedCrop])

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
      {/*<canvas*/}
      {/*  ref={canvasRef}*/}
      {/*  style={{ display: "none" }}*/}
      {/*/>*/}
    </>
  )
}

export default ImageEasyCrop