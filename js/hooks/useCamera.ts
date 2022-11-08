import { useState } from 'react'
import { useNavigation } from './useNavigation'

export default function useCamera () {
  const [pictures, setPictures] = useState<any[]>([])
  const { openCamera } = useNavigation()

  const addPicture = (picture: any) => {
    setPictures([
      ...pictures,
      picture
    ])
  }

  const clearPictures = () => {
    setPictures([])
  }

  const open = () => {
    clearPictures()
    openCamera({
      addPicture
    })
  }

  return {
    open,
    pictures
  }
}