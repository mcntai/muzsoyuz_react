import React, { useState, useCallback, useRef, useEffect } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import s from './ImageCropUpload.module.css'
import { useDispatch } from "react-redux"
import remove from "../../assets/img/remove.svg"
import confirm from "../../assets/img/confirm.svg"


const CROP = {
  unit  : "%",
  width : 50,
  x     : 25,
  y     : 25,
  aspect: 1
}

const ImageCropUpload = ({ uploadImageCallback, children }) => {
  const [uploadedImage, setUploadedImage] = useState()
  const imgRef = useRef(null)
  const canvasRef = useRef(null)

  const [crop, setCrop] = useState(CROP)
  const [completedCrop, setCompletedCrop] = useState()

  const [imageBlob, setImageBlob] = useState('')
  const dispatch = useDispatch()

  const fileSelectedHandler = (e) => {
    if (e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener("load", () => setUploadedImage(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  const fileUploadHandler = () => {
    const fileType = 'png'

    const formData = new FormData()
    formData.append('image', imageBlob, "image.png")

    dispatch(uploadImageCallback({ formData, fileType }))
  }


  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = canvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext("2d")
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = "high"

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    canvas.toBlob(blob => setImageBlob(blob), "image/png")

  }, [completedCrop])

  return (
    <>
      <input type="file" accept="image/*" className={s.fileInput} onChange={fileSelectedHandler}/>
      <div className={s.imageCropUploadWrapper}>
        <ReactCrop
          src={uploadedImage}
          onImageLoaded={onLoad}
          circularCrop
          keepSelection
          locked
          crop={crop}
          className={s.reactCrop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        {/*<div className={s.avatarBtnsWrapper}>*/}
        {/*  <img src={remove} className={s.removeAvatar} alt="removeAvatar"/>*/}
        {/*  <img src={confirm} className={s.confirmAvatar} alt="confirmAvatar" onClick={fileUploadHandler}/>*/}
        {/*</div>*/}
      </div>
      <div>
        <canvas
          ref={canvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width       : Math.round(completedCrop?.width ?? 0),
            height      : Math.round(completedCrop?.height ?? 0),
            borderRadius: "50%",
            display     : "none"
          }}
        />
      </div>
    </>
  )
}

export default ImageCropUpload
