import { useContext } from "react"
import { CameraContext } from "../context-providers/CameraProvider"

export const useCamera = () => {
  const { open } = useContext(CameraContext)

  return {
    open
  }
}