import { useState, useRef } from 'react'
import { useNavigation } from './useNavigation'

export default function useCamera () {
  const pictures = useRef<any[]>([])
  const { openCamera } = useNavigation()

  const addPicture = (picture: any) => {
    pictures.current = [
      ...pictures.current,
      picture
    ]
  }

  const clearPictures = () => {
    pictures.current = []
  }

  const open = (props?: any) => {
    clearPictures()
    openCamera({
      addPicture,
      ...props
    })
  }

  return {
    open,
    pictures
  }
}